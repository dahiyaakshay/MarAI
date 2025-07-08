import { Router } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { ApiResponse } from '../types';

const router = Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB default
  },
  fileFilter: (req, file, cb) => {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Ensure upload directory exists
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

router.post('/image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No image file provided'
      } as ApiResponse);
    }

    const fileId = uuidv4();
    const fileName = `${fileId}.webp`;
    const filePath = path.join(uploadDir, fileName);

    // Process and optimize image using Sharp
    await sharp(req.file.buffer)
      .resize(1200, 1200, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .webp({ quality: 80 })
      .toFile(filePath);

    const fileUrl = `/uploads/${fileName}`;

    res.json({
      success: true,
      data: {
        id: fileId,
        filename: fileName,
        url: fileUrl,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: 'image/webp'
      },
      message: 'Image uploaded successfully'
    } as ApiResponse);

  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to upload image'
    } as ApiResponse);
  }
});

router.post('/images', upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No image files provided'
      } as ApiResponse);
    }

    const uploadedFiles = [];

    for (const file of req.files) {
      const fileId = uuidv4();
      const fileName = `${fileId}.webp`;
      const filePath = path.join(uploadDir, fileName);

      await sharp(file.buffer)
        .resize(1200, 1200, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .webp({ quality: 80 })
        .toFile(filePath);

      uploadedFiles.push({
        id: fileId,
        filename: fileName,
        url: `/uploads/${fileName}`,
        originalName: file.originalname,
        size: file.size,
        mimetype: 'image/webp'
      });
    }

    res.json({
      success: true,
      data: uploadedFiles,
      message: `${uploadedFiles.length} images uploaded successfully`
    } as ApiResponse);

  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to upload images'
    } as ApiResponse);
  }
});

export default router;
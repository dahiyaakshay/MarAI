import { Router } from 'express';
import { UrlAnalyzer } from '../services/urlAnalyzer';
import { validateApiKeys, AuthenticatedRequest } from '../middleware/auth';
import { ApiResponse, AnalyzeUrlRequest } from '../types';

const router = Router();
const urlAnalyzer = new UrlAnalyzer();

router.post('/url', validateApiKeys, async (req: AuthenticatedRequest, res) => {
  try {
    const { url }: AnalyzeUrlRequest = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        error: 'URL is required'
      } as ApiResponse);
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Invalid URL format'
      } as ApiResponse);
    }

    const analysis = await urlAnalyzer.analyzeUrl(url);

    res.json({
      success: true,
      data: analysis,
      message: 'URL analyzed successfully'
    } as ApiResponse);

  } catch (error: any) {
    console.error('URL analysis error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to analyze URL'
    } as ApiResponse);
  }
});

export default router;
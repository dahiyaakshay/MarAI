import { Router } from 'express';
import { AIService } from '../services/aiService';
import { UrlAnalyzer } from '../services/urlAnalyzer';
import { validateApiKeys, AuthenticatedRequest } from '../middleware/auth';
import { ApiResponse, EmailGenerationRequest } from '../types';

const router = Router();
const aiService = new AIService();
const urlAnalyzer = new UrlAnalyzer();

router.post('/generate', validateApiKeys, async (req: AuthenticatedRequest, res) => {
  try {
    const { 
      prompt, 
      emailType, 
      brandInfo, 
      provider = 'openai',
      url 
    }: EmailGenerationRequest & { url?: string } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      } as ApiResponse);
    }

    if (!emailType) {
      return res.status(400).json({
        success: false,
        error: 'Email type is required'
      } as ApiResponse);
    }

    let urlAnalysis = null;
    if (url) {
      try {
        urlAnalysis = await urlAnalyzer.analyzeUrl(url);
      } catch (error) {
        console.warn('URL analysis failed, continuing without it:', error);
      }
    }

    const emailContent = await aiService.generateEmailContent(
      prompt,
      emailType,
      brandInfo || '',
      urlAnalysis,
      req.apiKeys,
      provider
    );

    res.json({
      success: true,
      data: {
        ...emailContent,
        emailType,
        urlAnalysis: urlAnalysis ? {
          title: urlAnalysis.title,
          description: urlAnalysis.description,
          brandColors: urlAnalysis.brandColors?.slice(0, 3)
        } : null
      },
      message: 'Email generated successfully'
    } as ApiResponse);

  } catch (error: any) {
    console.error('Email generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate email'
    } as ApiResponse);
  }
});

export default router;
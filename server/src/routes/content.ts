import { Router } from 'express';
import { AIService } from '../services/aiService';
import { UrlAnalyzer } from '../services/urlAnalyzer';
import { validateApiKeys, AuthenticatedRequest } from '../middleware/auth';
import { ApiResponse, ContentGenerationRequest } from '../types';

const router = Router();
const aiService = new AIService();
const urlAnalyzer = new UrlAnalyzer();

router.post('/generate', validateApiKeys, async (req: AuthenticatedRequest, res) => {
  try {
    const { 
      prompt, 
      contentType, 
      platform, 
      tone, 
      provider = 'openai',
      url 
    }: ContentGenerationRequest & { url?: string } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: 'Prompt is required'
      } as ApiResponse);
    }

    if (!contentType) {
      return res.status(400).json({
        success: false,
        error: 'Content type is required'
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

    const content = await aiService.generateMarketingContent(
      prompt,
      contentType,
      platform || 'general',
      urlAnalysis,
      req.apiKeys,
      provider
    );

    res.json({
      success: true,
      data: { 
        content,
        contentType,
        platform,
        urlAnalysis: urlAnalysis ? {
          title: urlAnalysis.title,
          description: urlAnalysis.description,
          keywords: urlAnalysis.keywords.slice(0, 5)
        } : null
      },
      message: 'Content generated successfully'
    } as ApiResponse);

  } catch (error: any) {
    console.error('Content generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate content'
    } as ApiResponse);
  }
});

export default router;
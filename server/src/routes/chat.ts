import { Router } from 'express';
import { AIService } from '../services/aiService';
import { validateApiKeys, AuthenticatedRequest } from '../middleware/auth';
import { ApiResponse, ChatRequest } from '../types';

const router = Router();
const aiService = new AIService();

router.post('/', validateApiKeys, async (req: AuthenticatedRequest, res) => {
  try {
    const { message, context, provider = 'openai' }: ChatRequest = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        error: 'Message is required'
      } as ApiResponse);
    }

    const response = await aiService.chatResponse(
      message,
      context || '',
      req.apiKeys,
      provider
    );

    res.json({
      success: true,
      data: { response },
      message: 'Chat response generated successfully'
    } as ApiResponse);

  } catch (error: any) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate chat response'
    } as ApiResponse);
  }
});

export default router;
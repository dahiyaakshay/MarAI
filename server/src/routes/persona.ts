import { Router } from 'express';
import { AIService } from '../services/aiService';
import { validateApiKeys, AuthenticatedRequest } from '../middleware/auth';
import { ApiResponse, PersonaGenerationRequest } from '../types';

const router = Router();
const aiService = new AIService();

router.post('/generate', validateApiKeys, async (req: AuthenticatedRequest, res) => {
  try {
    const { 
      description, 
      provider = 'openai' 
    }: PersonaGenerationRequest = req.body;

    if (!description) {
      return res.status(400).json({
        success: false,
        error: 'Description is required'
      } as ApiResponse);
    }

    const persona = await aiService.generatePersona(
      description,
      req.apiKeys,
      provider
    );

    res.json({
      success: true,
      data: persona,
      message: 'Persona generated successfully'
    } as ApiResponse);

  } catch (error: any) {
    console.error('Persona generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate persona'
    } as ApiResponse);
  }
});

export default router;
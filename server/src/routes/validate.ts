import { Router } from 'express';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { ApiResponse } from '../types';

const router = Router();

router.post('/openai', async (req, res) => {
  try {
    const { apiKey } = req.body;

    if (!apiKey) {
      return res.status(400).json({
        success: false,
        error: 'API key is required'
      } as ApiResponse);
    }

    const openai = new OpenAI({ apiKey });

    // Test the API key with a simple request
    await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello' }],
      max_tokens: 5
    });

    res.json({
      success: true,
      message: 'OpenAI API key is valid'
    } as ApiResponse);

  } catch (error: any) {
    console.error('OpenAI validation error:', error);
    
    let errorMessage = 'Invalid API key';
    if (error.status === 401) {
      errorMessage = 'Invalid API key or insufficient permissions';
    } else if (error.status === 429) {
      errorMessage = 'API key rate limit exceeded';
    } else if (error.status === 500) {
      errorMessage = 'OpenAI service temporarily unavailable';
    }

    res.status(400).json({
      success: false,
      error: errorMessage
    } as ApiResponse);
  }
});

router.post('/anthropic', async (req, res) => {
  try {
    const { apiKey } = req.body;

    if (!apiKey) {
      return res.status(400).json({
        success: false,
        error: 'API key is required'
      } as ApiResponse);
    }

    const anthropic = new Anthropic({ apiKey });

    // Test the API key with a simple request
    await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      max_tokens: 5,
      messages: [{ role: 'user', content: 'Hello' }]
    });

    res.json({
      success: true,
      message: 'Anthropic API key is valid'
    } as ApiResponse);

  } catch (error: any) {
    console.error('Anthropic validation error:', error);
    
    let errorMessage = 'Invalid API key';
    if (error.status === 401) {
      errorMessage = 'Invalid API key or insufficient permissions';
    } else if (error.status === 429) {
      errorMessage = 'API key rate limit exceeded';
    } else if (error.status === 500) {
      errorMessage = 'Anthropic service temporarily unavailable';
    }

    res.status(400).json({
      success: false,
      error: errorMessage
    } as ApiResponse);
  }
});

export default router;
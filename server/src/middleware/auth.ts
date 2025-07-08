import { Request, Response, NextFunction } from 'express';
import { ApiKeys } from '../types';

export interface AuthenticatedRequest extends Request {
  apiKeys: ApiKeys;
}

export const validateApiKeys = (req: Request, res: Response, next: NextFunction) => {
  const apiKeys = req.headers['x-api-keys'];
  
  if (!apiKeys) {
    return res.status(400).json({
      success: false,
      error: 'API keys are required'
    });
  }

  try {
    const parsedKeys: ApiKeys = JSON.parse(apiKeys as string);
    
    if (!parsedKeys.openai && !parsedKeys.anthropic) {
      return res.status(400).json({
        success: false,
        error: 'At least one API key (OpenAI or Anthropic) is required'
      });
    }

    (req as AuthenticatedRequest).apiKeys = parsedKeys;
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: 'Invalid API keys format'
    });
  }
};
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { ApiKeys } from '../types';

export class AIService {
  private getOpenAIClient(apiKey: string): OpenAI {
    return new OpenAI({
      apiKey: apiKey
    });
  }

  private getAnthropicClient(apiKey: string): Anthropic {
    return new Anthropic({
      apiKey: apiKey
    });
  }

  async generateContent(
    prompt: string,
    apiKeys: ApiKeys,
    provider: 'openai' | 'anthropic' = 'openai',
    systemPrompt?: string
  ): Promise<string> {
    try {
      if (provider === 'openai' && apiKeys.openai) {
        const openai = this.getOpenAIClient(apiKeys.openai);
        
        const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [];
        
        if (systemPrompt) {
          messages.push({ role: 'system', content: systemPrompt });
        }
        
        messages.push({ role: 'user', content: prompt });

        const completion = await openai.chat.completions.create({
          model: 'gpt-4-turbo-preview',
          messages: messages,
          max_tokens: 4000,
          temperature: 0.7
        });

        return completion.choices[0]?.message?.content || 'No response generated';
      } else if (provider === 'anthropic' && apiKeys.anthropic) {
        const anthropic = this.getAnthropicClient(apiKeys.anthropic);

        const message = await anthropic.messages.create({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 4000,
          temperature: 0.7,
          system: systemPrompt || 'You are a helpful AI assistant.',
          messages: [
            { role: 'user', content: prompt }
          ]
        });

        return message.content[0].type === 'text' ? message.content[0].text : 'No response generated';
      } else {
        throw new Error(`No valid API key found for provider: ${provider}`);
      }
    } catch (error: any) {
      console.error('AI Service Error:', error);
      throw new Error(`AI generation failed: ${error.message}`);
    }
  }

  async generateMarketingContent(
    prompt: string,
    contentType: string,
    platform: string,
    urlAnalysis: any,
    apiKeys: ApiKeys,
    provider: 'openai' | 'anthropic' = 'openai'
  ): Promise<string> {
    const systemPrompt = `You are an expert marketing content creator. Create compelling ${contentType} content for ${platform} based on the provided information. 

Guidelines:
- Make it engaging and platform-appropriate
- Include relevant hashtags if applicable
- Optimize for the target platform's best practices
- Keep the tone professional yet engaging
- Focus on value proposition and benefits

Content Type: ${contentType}
Platform: ${platform}`;

    const contextualPrompt = `
Create ${contentType} content for ${platform} based on this information:

URL Analysis: ${JSON.stringify(urlAnalysis, null, 2)}

User Request: ${prompt}

Please create engaging, platform-optimized content that captures the essence of the analyzed content while being tailored for ${platform}.
`;

    return this.generateContent(contextualPrompt, apiKeys, provider, systemPrompt);
  }

  async generateEmailContent(
    prompt: string,
    emailType: string,
    brandInfo: string,
    urlAnalysis: any,
    apiKeys: ApiKeys,
    provider: 'openai' | 'anthropic' = 'openai'
  ): Promise<{ subject: string; content: string; html: string }> {
    const systemPrompt = `You are an expert email marketing specialist. Create compelling email campaigns that drive engagement and conversions.

Guidelines:
- Create attention-grabbing subject lines
- Write engaging email content with clear CTAs
- Provide both plain text and HTML versions
- Optimize for mobile and desktop viewing
- Include proper email structure (header, body, footer)
- Make it conversion-focused

Email Type: ${emailType}`;

    const contextualPrompt = `
Create a ${emailType} email campaign based on this information:

Brand Information: ${brandInfo}
URL Analysis: ${JSON.stringify(urlAnalysis, null, 2)}

User Request: ${prompt}

Please provide the response in this exact JSON format:
{
  "subject": "Email subject line",
  "content": "Plain text email content",
  "html": "HTML email content with proper styling"
}
`;

    const response = await this.generateContent(contextualPrompt, apiKeys, provider, systemPrompt);
    
    try {
      const parsed = JSON.parse(response);
      return {
        subject: parsed.subject || 'Generated Email',
        content: parsed.content || response,
        html: parsed.html || `<div style="font-family: Arial, sans-serif;">${parsed.content || response}</div>`
      };
    } catch (error) {
      // Fallback if JSON parsing fails
      return {
        subject: 'Generated Email Campaign',
        content: response,
        html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">${response.replace(/\n/g, '<br>')}</div>`
      };
    }
  }

  async generatePersona(
    description: string,
    apiKeys: ApiKeys,
    provider: 'openai' | 'anthropic' = 'openai'
  ): Promise<any> {
    const systemPrompt = `You are an expert customer persona researcher. Create detailed, realistic customer personas based on the provided description.

Guidelines:
- Create comprehensive persona profiles
- Include demographics, psychographics, and behavioral traits
- Provide actionable insights for marketing
- Make personas realistic and relatable
- Include goals, pain points, and solutions
- Add unique characteristics and preferences`;

    const contextualPrompt = `
Create a detailed customer persona based on this description: ${description}

Please provide the response in this exact JSON format:
{
  "name": "Full name",
  "role": "Job title and company",
  "company": "Company name or type",
  "avatar": "Two letter initials",
  "age": "Age or age range",
  "location": "City, State/Country",
  "income": "Income range",
  "education": "Education level",
  "goals": ["Goal 1", "Goal 2", "Goal 3", "Goal 4"],
  "painPoints": ["Pain point 1", "Pain point 2", "Pain point 3", "Pain point 4"],
  "solutions": ["Solution 1", "Solution 2", "Solution 3", "Solution 4"],
  "characteristics": ["Characteristic 1", "Characteristic 2", "Characteristic 3", "Characteristic 4"],
  "techComfort": "Tech comfort level",
  "decisionMaking": "Decision making style",
  "communication": "Preferred communication methods",
  "workStyle": "Work style preference"
}
`;

    const response = await this.generateContent(contextualPrompt, apiKeys, provider, systemPrompt);
    
    try {
      return JSON.parse(response);
    } catch (error) {
      // Fallback persona if JSON parsing fails
      return {
        name: 'Generated Persona',
        role: 'Target Customer',
        company: 'Various Industries',
        avatar: 'GP',
        age: '25-45 years old',
        location: 'United States',
        income: '$50,000 - $100,000',
        education: 'College Graduate',
        goals: ['Achieve business growth', 'Improve efficiency', 'Stay competitive', 'Build strong relationships'],
        painPoints: ['Limited time', 'Budget constraints', 'Information overload', 'Keeping up with trends'],
        solutions: ['Automation tools', 'Cost-effective solutions', 'Simplified processes', 'Expert guidance'],
        characteristics: ['Tech-savvy', 'Results-oriented', 'Values quality', 'Seeks recommendations'],
        techComfort: 'High',
        decisionMaking: 'Research-based',
        communication: 'Email and video calls',
        workStyle: 'Collaborative'
      };
    }
  }

  async chatResponse(
    message: string,
    context: string,
    apiKeys: ApiKeys,
    provider: 'openai' | 'anthropic' = 'openai'
  ): Promise<string> {
    const systemPrompt = `You are a helpful AI marketing assistant. Provide clear, actionable advice and support for marketing-related questions and tasks.

Guidelines:
- Be helpful and professional
- Provide specific, actionable advice
- Ask clarifying questions when needed
- Stay focused on marketing topics
- Be encouraging and supportive`;

    const contextualPrompt = context ? 
      `Context: ${context}\n\nUser Message: ${message}` : 
      message;

    return this.generateContent(contextualPrompt, apiKeys, provider, systemPrompt);
  }
}
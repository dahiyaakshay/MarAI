import axios from 'axios';
import * as cheerio from 'cheerio';
import { UrlAnalysisResult } from '../types';

export class UrlAnalyzer {
  async analyzeUrl(url: string): Promise<UrlAnalysisResult> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 10000
      });

      const $ = cheerio.load(response.data);
      
      // Extract basic information
      const title = $('title').text().trim() || 
                   $('meta[property="og:title"]').attr('content') || 
                   $('h1').first().text().trim() || 
                   'Untitled';

      const description = $('meta[name="description"]').attr('content') || 
                         $('meta[property="og:description"]').attr('content') || 
                         $('p').first().text().trim().substring(0, 200) || 
                         '';

      // Extract main content
      const contentSelectors = [
        'article',
        '.content',
        '.post-content',
        '.entry-content',
        'main',
        '.main-content'
      ];

      let content = '';
      for (const selector of contentSelectors) {
        const element = $(selector);
        if (element.length > 0) {
          content = element.text().trim();
          break;
        }
      }

      if (!content) {
        content = $('body').text().trim();
      }

      // Clean up content
      content = content.replace(/\s+/g, ' ').substring(0, 5000);

      // Extract keywords from meta tags and content
      const metaKeywords = $('meta[name="keywords"]').attr('content') || '';
      const keywords = this.extractKeywords(content + ' ' + title + ' ' + description + ' ' + metaKeywords);

      // Extract brand colors from CSS
      const brandColors = this.extractBrandColors(response.data);

      // Extract images
      const images = this.extractImages($, url);

      // Extract metadata
      const author = $('meta[name="author"]').attr('content') || 
                    $('meta[property="article:author"]').attr('content') || 
                    $('.author').first().text().trim();

      const publishDate = $('meta[property="article:published_time"]').attr('content') || 
                         $('meta[name="date"]').attr('content') || 
                         $('time').attr('datetime');

      const wordCount = content.split(/\s+/).length;

      return {
        title,
        description,
        content,
        keywords,
        brandColors,
        images,
        metadata: {
          author,
          publishDate,
          wordCount
        }
      };
    } catch (error) {
      console.error('URL analysis error:', error);
      throw new Error('Failed to analyze URL. Please check if the URL is accessible.');
    }
  }

  private extractKeywords(text: string): string[] {
    // Simple keyword extraction
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .filter(word => !this.isStopWord(word));

    // Count word frequency
    const wordCount: { [key: string]: number } = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });

    // Return top keywords
    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 20)
      .map(([word]) => word);
  }

  private isStopWord(word: string): boolean {
    const stopWords = [
      'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
      'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before',
      'after', 'above', 'below', 'between', 'among', 'this', 'that', 'these',
      'those', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have',
      'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
      'may', 'might', 'must', 'can', 'shall'
    ];
    return stopWords.includes(word);
  }

  private extractBrandColors(html: string): string[] {
    const colors: string[] = [];
    
    // Extract colors from CSS
    const colorRegex = /#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})|rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)/g;
    const matches = html.match(colorRegex);
    
    if (matches) {
      matches.forEach(color => {
        if (!colors.includes(color)) {
          colors.push(color);
        }
      });
    }

    return colors.slice(0, 10); // Return top 10 colors
  }

  private extractImages($: cheerio.CheerioAPI, baseUrl: string): string[] {
    const images: string[] = [];
    
    $('img').each((_, element) => {
      const src = $(element).attr('src');
      if (src) {
        try {
          const imageUrl = new URL(src, baseUrl).href;
          images.push(imageUrl);
        } catch (error) {
          // Invalid URL, skip
        }
      }
    });

    return images.slice(0, 10); // Return top 10 images
  }
}
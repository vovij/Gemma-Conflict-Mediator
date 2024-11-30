import { Message } from '../types/models';

export class AIService {
  static async generateSummary(messages: Message[]): Promise<string> {
    // This would be replaced with actual AI service integration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Based on the discussion, I understand that both parties have valid concerns. 
          Party 1 emphasizes ${messages[0].content.slice(0, 50)}..., 
          while Party 2 focuses on ${messages[1].content.slice(0, 50)}... 
          A potential compromise could be...`);
      }, 1500);
    });
  }

  static async shouldGenerateSummary(messages: Message[]): Promise<boolean> {
    // Logic to determine if we should generate a new AI summary
    const userMessages = messages.filter(m => m.role !== 'ai');
    const lastTwoMessages = userMessages.slice(-2);
    
    return lastTwoMessages.length === 2 && 
           lastTwoMessages[0].role !== lastTwoMessages[1].role;
  }
}
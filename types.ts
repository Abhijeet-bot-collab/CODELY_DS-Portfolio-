export interface Project {
  title: string;
  description: string;
  link: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export enum GeminiModel {
  FLASH_LITE = 'gemini-2.5-flash-lite',
  FLASH_SEARCH = 'gemini-2.5-flash',
  PRO_THINKING = 'gemini-2.5-pro',
}

export interface GroundingChunk {
  web: {
    uri: string;
    title: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  groundingChunks?: GroundingChunk[];
  isLoading?: boolean;
}

import { PerspectiveType, DifficultyLevel, AiRoleType } from '../data';

export interface GenerateDebateParams {
  topic: string;
  userPosition?: string;
  aiRole?: AiRoleType;
  customAiRoleDescription?: string;
  theologyTradition?: PerspectiveType;
  difficulty?: DifficultyLevel;
  messages: { sender: 'user' | 'ai' | 'system'; content: string }[];
}

export interface DebateApiResponse {
  content: string; // Pure, natural markdown/text generated freely by AI
}

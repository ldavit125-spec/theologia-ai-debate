import { PerspectiveType, DifficultyLevel, AiRoleType } from '../data';
import { BibleReferenceItem, TheologicalSourceItem } from './references';

export interface GenerateDebateParams {
  topic: string;
  userPosition: string;
  aiRole: AiRoleType;
  customAiRoleDescription?: string;
  theologyTradition: PerspectiveType;
  difficulty: DifficultyLevel;
  messages: { sender: 'user' | 'ai' | 'system'; content: string }[];
}

export interface DebateApiResponse {
  content: string;
  citationVerses?: BibleReferenceItem[];
  doctrinalBasis?: string;
  theologicalSources?: TheologicalSourceItem[];
  counterArguments?: string[];
  perspectiveNotes?: string;
  detectedFallacy?: string; // 논리적 오류 감지 시 정중한 안내
}

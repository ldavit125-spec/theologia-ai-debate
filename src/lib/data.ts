export interface Topic {
  id: string;
  title: string;
  category: string;
  description: string;
  verses: string[];
  perspectives: string[];
  popularCount: number;
}

export type PerspectiveType = 
  | '초교파' 
  | '개혁주의' 
  | '루터교' 
  | '감리교' 
  | '침례교' 
  | '성공회'
  | '가톨릭' 
  | '동방정교회';

export type DifficultyLevel = '입문' | '일반' | '신학자';

export type AiRoleType = 
  | '반론' 
  | '지지' 
  | '중립' 
  | '소크라테스' 
  | '자유토론';

export interface AiRoleInfo {
  id: AiRoleType;
  name: string;
  description: string;
  badge: string;
}

export interface PerspectiveInfo {
  name: PerspectiveType;
  description: string;
  keyEmphasis: string;
}

export interface DifficultyInfo {
  level: DifficultyLevel;
  description: string;
  target: string;
}

export interface DebateMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  content: string; // Clean, natural, flexible Markdown/Text response
  timestamp: string;
}

export interface SavedDebateSession {
  id: string;
  topicTitle: string;
  userPosition: string;
  aiRole?: AiRoleType;
  perspective?: PerspectiveType;
  difficulty?: DifficultyLevel;
  date: string;
  createdAt: number;
  messageCount: number;
  lastSummary: string;
  messages: DebateMessage[];
  isFinished?: boolean;
}

export const AI_ROLES: AiRoleInfo[] = [
  { 
    id: '자유토론', 
    name: '자연스러운 대화/토론 (자유 모드)', 
    description: '질문의 성격에 따라 설명, 비교, 반론, 대화형 등을 AI가 스스로 판단하여 자유롭게 답합니다.',
    badge: '자유 모드'
  },
  { 
    id: '반론', 
    name: '비판적 반론 모드 (Opponent)', 
    description: '사용자 주장의 약점을 날카롭게 짚고 성경적·교리적 반증을 펼칩니다.',
    badge: '반론 중심'
  },
  { 
    id: '지지', 
    name: '지지 및 심화 모드 (Supporter)', 
    description: '사용자의 입장을 지지하며 논지를 풍성하게 발전시킵니다.',
    badge: '지지/심화'
  },
  { 
    id: '중립', 
    name: '다각도 비교 모드 (Comparative)', 
    description: '다양한 교파와 사상의 차이를 균형 있게 조망합니다.',
    badge: '다각도 비교'
  },
  { 
    id: '소크라테스', 
    name: '소크라테스식 문답 (Inquirer)', 
    description: '질문과 역설을 통해 사용자가 스스로 생각을 탐구하게 합니다.',
    badge: '심층 질문'
  },
];

export const PERSPECTIVES: PerspectiveInfo[] = [
  { name: '초교파', description: '특정 교파에 치우치지 않고 공통된 기독교 핵심 복음을 바탕으로 자유롭게 토론합니다.', keyEmphasis: '기독교 대강령 및 공통 복음' },
  { name: '개혁주의', description: '하나님의 절대적 주권과 은혜, 성경의 충족성을 최우선으로 강조합니다.', keyEmphasis: '하나님의 주권, 예정론, 오직 은혜' },
  { name: '루터교', description: '오직 믿음(Sola Fide)과 오직 은혜, 십자가 신학 및 율법과 복음의 구분을 핵심으로 합니다.', keyEmphasis: '오직 믿음, 십자가 신학, 성찬의 실제적 임재' },
  { name: '감리교', description: '인간의 책임 있는 응답과 예정 속의 예지선총, 전인적 성화와 은총의 역동성을 중요시합니다.', keyEmphasis: '선행은총, 자유의지와 성화, 사랑의 실천' },
  { name: '침례교', description: '성경의 최종 권위, 각 신자의 영적 자율성 및 회심자 침례와 교회-국가 분리를 강조합니다.', keyEmphasis: '신자의 침례, 각인의 양심 자유, 성경의 최고 권위' },
  { name: '성공회', description: '성경, 이성, 전통의 삼각 균형(Via Media, 중용)을 추구하며 포용적 신학 전통을 갖습니다.', keyEmphasis: '성경·이성·전통의 균형, 중용(Via Media)' },
  { name: '가톨릭', description: '성경과 거룩한 전통(성전), 교회의 가르침 직무 및 칠성사를 통한 은혜 전달을 중요시합니다.', keyEmphasis: '성전(전통), 교권 권위, 성사론적 은혜' },
  { name: '동방정교회', description: '고대 신조와 7차 신학 공의회, 삼위일체 신비와 신화(Theosis, 하나님과의 합일)를 중심에 둡니다.', keyEmphasis: '신화(Theosis), 삼위일체 신비, 고대 교부 전통' },
];

export const DIFFICULTIES: DifficultyInfo[] = [
  { level: '입문', description: '쉽고 명확한 설명 위주로 접근합니다.', target: '기본적인 개념과 직관적 이해' },
  { level: '일반', description: '신학적 맥락과 주요 학자/교파의 시각을 조화롭게 다룹니다.', target: '교리와 성경에 관심 있는 성도' },
  { level: '신학자', description: '원어 분석, 역사적 공의회 문서, 깊이 있는 학술 논쟁을 다룹니다.', target: '심층적 신학 연구와 검증' },
];

export const DEFAULT_TOPICS: Topic[] = [
  {
    id: 'free-will',
    title: '인간에게 자유의지가 있다면 하나님의 예정과 모순되는 것 아닌가?',
    category: '구원론 / 신론',
    description: '하나님의 영원한 작정과 섭리가 피조물의 인격적 선택 및 도덕적 책임과 어떻게 양립하며 긴장을 이루는가?',
    verses: ['로마서 9:15–18', '에베소서 1:4-5', '신명기 30:19', '빌립보서 2:12-13'],
    perspectives: ['개혁주의', '감리교', '가톨릭', '루터교', '성공회'],
    popularCount: 2120
  },
  {
    id: 'uchimura',
    title: '우치무라 간조의 무교회주의 사상 핵심이 뭐야?',
    category: '교회론 / 기독교 사상사',
    description: '제도적 교회와 교리를 넘어선 복음 자체와 십자가 신앙에 대한 탐구.',
    verses: ['요한복음 4:23-24', '갈라디아서 5:1'],
    perspectives: ['초교파', '개혁주의'],
    popularCount: 1750
  },
  {
    id: 'hell-biblical',
    title: '지옥이라는 개념은 성경적인가?',
    category: '종말론 / 심판론',
    description: '게헨나, 스올, 하데스의 성경적 원어 의미와 의식적 영원 형벌(ECT), 멸절설, 만유회복설 간의 성경 해석 차이.',
    verses: ['마태복음 25:46', '요한계시록 20:10', '유다서 1:7'],
    perspectives: ['초교파', '동방정교회', '개혁주의', '성공회'],
    popularCount: 1580
  },
  {
    id: 'evil-without-devil',
    title: '악마가 없어도 인간은 악을 행할 수 있는가?',
    category: '인간론 / 악론',
    description: '인간 본성의 부패와 정욕 자체만으로 악이 발생하는가, 아니면 초자연적 사탄과 악마의 유혹이 필수적 매개인가?',
    verses: ['야고보서 1:14-15', '마가복음 7:21-23', '에베소서 6:12'],
    perspectives: ['초교파', '개혁주의', '루터교', '성공회'],
    popularCount: 1420
  }
];

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
  | '직접지정';

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
  content: string;
  timestamp: string;
  citationVerses?: { reference: string; text: string }[];
  perspectiveNotes?: string;
  counterArguments?: string[];
  doctrinalBasis?: string;
}

export interface SavedDebateSession {
  id: string;
  topicTitle: string;
  userPosition: string;
  aiRole: AiRoleType;
  customAiRoleText?: string;
  perspective: PerspectiveType;
  difficulty: DifficultyLevel;
  date: string;
  createdAt: number;
  messageCount: number;
  lastSummary: string;
  messages: DebateMessage[];
  isFinished?: boolean;
}

export const AI_ROLES: AiRoleInfo[] = [
  { 
    id: '반론', 
    name: '반론 제시 (Opponent)', 
    description: '사용자의 논리적 빈틈과 반대 교리를 날카롭게 짚어내며 성경적 반증을 펼칩니다.',
    badge: '반론자'
  },
  { 
    id: '지지', 
    name: '사용자 주장 지지 (Supporter)', 
    description: '사용자의 입장을 함께 보강해주며 더 깊은 성경적·교회사적 근거를 덧붙여 논지를 발전시킵니다.',
    badge: '동반자'
  },
  { 
    id: '중립', 
    name: '중립적 검토 (Mediator)', 
    description: '어느 한쪽으로 기울지 않고 양측의 핵심 논점, 교파별 차이점, 성경 구절을 공정하게 비교·조율합니다.',
    badge: '조정자'
  },
  { 
    id: '소크라테스', 
    name: '소크라테스식 질문 (Inquirer)', 
    description: '직접적인 답을 주기보다 예리한 산파술식 질문과 성경적 역설을 던져 사용자가 스스로 논증을 점검하게 합니다.',
    badge: '질문자'
  },
  { 
    id: '직접지정', 
    name: '직접 지정 (Custom)', 
    description: 'AI의 토론 성향이나 구체적인 반론/토론 태도를 사용자가 직접 서술하여 정의합니다.',
    badge: '맞춤'
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
  { level: '입문', description: '쉽고 명확한 개념 설명 위주로 접근하며, 직관적인 비유와 기본적인 성경 구절을 바탕으로 이야기를 풀어갑니다.', target: '신학을 처음 접하거나 기본 명제를 쉽게 다루고 싶은 사용자' },
  { level: '일반', description: '신학적 용어와 교파별 대표 학자들의 견해, 성경 텍스트의 논리적 문맥을 조화롭게 다룹니다.', target: '기독교 기본 교리와 다양한 신학적 관점에 관심이 있는 성도' },
  { level: '신학자', description: '원어(히브리어/헬라어) 의미 분석, 역사적 신학 공의회 문서, 주요 신학자(아우구스티누스, 아퀴나스, 칼뱅, 바르트 등) 논쟁을 깊이 있게 검토합니다.', target: '깊이 있는 신학 논증과 치밀한 교리적 검증을 원하는 사용자' },
];

export const DEFAULT_TOPICS: Topic[] = [
  {
    id: 'free-will',
    title: '인간에게 자유의지가 있는가?',
    category: '구원론 / 인간론',
    description: '타락 이후 인간에게 스스로 하나님을 선택할 구원론적 자유의지가 잔재해 있는가, 아니면 완전히 부패되었는가?',
    verses: ['창세기 3:6', '로마서 3:10-12', '요한복음 8:36', '빌립보서 2:13'],
    perspectives: ['개혁주의', '감리교', '가톨릭', '루터교'],
    popularCount: 1420
  },
  {
    id: 'hell-biblical',
    title: '지옥이라는 개념은 성경적인가?',
    category: '종말론 / 심판론',
    description: '게헨나, 스올, 하데스의 성경적 원어 의미와 의식적 영원 형벌(ECT), 멸절설, 만유회복설 간의 성경 해석 차이를 논합니다.',
    verses: ['마태복음 25:46', '요한계시록 20:10', '유다서 1:7', '베드로전서 3:19'],
    perspectives: ['초교파', '동방정교회', '개혁주의', '성공회'],
    popularCount: 1280
  },
  {
    id: 'fall-and-freewill',
    title: '아담과 하와의 타락은 인간의 자유의지 때문인가?',
    category: '죄론 / 창조론',
    description: '에덴에서의 첫 범죄가 피조물의 온전한 자유의지에 기인한 선택이었는가, 아니면 하나님의 주권적 작정 안에 있었는가?',
    verses: ['창세기 3:1-19', '로마서 5:12', '전도서 7:29'],
    perspectives: ['개혁주의', '가톨릭', '감리교'],
    popularCount: 1540
  },
  {
    id: 'purgatory-basis',
    title: '연옥은 성경적으로 근거가 있는가?',
    category: '종말론 / 교회론',
    description: '사후 정화의 상태인 연옥(Purgatory) 교리가 성경적 근거와 외경(마카베오하), 교부 전통에 기초하는가 아니면 비성경적인가?',
    verses: ['마카베오하 12:46', '고린도전서 3:15', '마태복음 12:32'],
    perspectives: ['가톨릭', '개혁주의', '동방정교회', '루터교'],
    popularCount: 990
  },
  {
    id: 'evil-without-devil',
    title: '악마가 없어도 인간은 악을 행할 수 있는가?',
    category: '인간론 / 악론',
    description: '인간 본성의 부패와 정욕 자체만으로 악이 발생하는가, 아니면 초자연적 사탄과 악마의 유혹이 필수적 매개인가?',
    verses: ['야고보서 1:14-15', '마가복음 7:21-23', '에베소서 6:12'],
    perspectives: ['초교파', '개혁주의', '루터교', '성공회'],
    popularCount: 1120
  },
  {
    id: 'predestination',
    title: '예정론과 자유의지는 양립 가능한가?',
    category: '신론 / 구원론',
    description: '하나님의 영원한 작정과 창세 전 선택이 인간의 인격적 결정 및 도덕적 책임과 어떻게 긴장을 이루며 조화를 이루는가?',
    verses: ['에베소서 1:4-5', '로마서 9:18-21', '요한복음 3:16', '베드로후서 3:9'],
    perspectives: ['개혁주의', '감리교', '성공회'],
    popularCount: 1890
  }
];

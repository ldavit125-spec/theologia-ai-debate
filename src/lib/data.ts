export interface Topic {
  id: string;
  title: string;
  category: string;
  description: string;
  verses: string[];
  perspectives: string[];
  popularCount: number;
}

// Protestant Theological Traditions Only (Excluding Catholic & Eastern Orthodox from default list)
export type PerspectiveType = 
  | '초교파 복음주의' 
  | '개혁주의 / 장로교' 
  | '웨슬리안 / 감리교' 
  | '루터교' 
  | '침례교' 
  | '오순절 / 은사주의'
  | '성결교' 
  | '성공회 개신교 전통'
  | '무교회주의';

export type DifficultyLevel = '입문' | '일반' | '신학자';

export type AiRoleType = 
  | '자유토론'
  | '반론' 
  | '지지' 
  | '중립' 
  | '소크라테스';

export interface AiRoleInfo {
  id: AiRoleType;
  name: string;
  description: string;
  badge: string;
}

export interface PerspectiveInfo {
  name: PerspectiveType;
  shortName: string;
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
    description: '질문의 성격에 따라 개신교 신학적 설명, 비교, 반론, 대화형 등을 AI가 스스로 판단하여 유연하게 답합니다.',
    badge: '자유 모드'
  },
  { 
    id: '반론', 
    name: '비판적 반론 모드 (Opponent)', 
    description: '사용자 주장의 맹점을 날카롭게 짚고 성경적·개신교 정통 교리적 반증을 펼칩니다.',
    badge: '반론 중심'
  },
  { 
    id: '지지', 
    name: '지지 및 심화 모드 (Supporter)', 
    description: '사용자의 입장을 지지하며 개신교 신학적 논지를 풍성하게 발전시킵니다.',
    badge: '지지/심화'
  },
  { 
    id: '중립', 
    name: '개신교 전통 비교 모드 (Comparative)', 
    description: '개혁주의, 웨슬리안, 루터교, 침례교 등 개신교 내부의 다양한 시각을 균형 있게 조망합니다.',
    badge: '전통 비교'
  },
  { 
    id: '소크라테스', 
    name: '소크라테스식 문답 (Inquirer)', 
    description: '질문과 역설을 통해 사용자가 스스로 성경적 전제를 깊이 탐구하게 합니다.',
    badge: '심층 질문'
  },
];

// Major Protestant Theological Traditions
export const PERSPECTIVES: PerspectiveInfo[] = [
  { 
    name: '초교파 복음주의', 
    shortName: '복음주의',
    description: '오직 성경(Sola Scriptura)과 십자가 대속의 복음, 회심과 선교를 공통 신앙의 기초로 삼습니다.', 
    keyEmphasis: '성경의 무오성, 회심, 십자가 중심주의, 복음전도' 
  },
  { 
    name: '개혁주의 / 장로교', 
    shortName: '개혁주의',
    description: '하나님의 절대적 주권과 무조건적 은혜(Sola Gratia), 언약사상 및 성경의 충족성을 최우선으로 강조합니다.', 
    keyEmphasis: '하나님의 주권, 예정론, 오직 은혜, 언약신학' 
  },
  { 
    name: '웨슬리안 / 감리교', 
    shortName: '감리교',
    description: '선행은총(Prevenient Grace)에 기초한 인간의 책임적 응답, 전인적 성화와 사랑의 실천을 중요시합니다.', 
    keyEmphasis: '선행은총, 자유의지와 성화, 기독교인의 완전(사랑)' 
  },
  { 
    name: '루터교', 
    shortName: '루터교',
    description: '오직 믿음(Sola Fide)과 오직 은혜, 십자가 신학(Theologia Crucis) 및 율법과 복음의 구분을 핵심으로 합니다.', 
    keyEmphasis: '오직 믿음, 십자가 신학, 율법과 복음의 구분' 
  },
  { 
    name: '침례교', 
    shortName: '침례교',
    description: '성경의 최종 권위, 각 신자의 영적 자율성과 만인제사장직, 회심자 침례 및 교회와 국가의 분리를 강조합니다.', 
    keyEmphasis: '신자의 침례, 각인의 양심 자유, 성경의 최고 권위' 
  },
  { 
    name: '오순절 / 은사주의', 
    shortName: '오순절',
    description: '성령세례와 성령의 은사(방언, 신유 등), 살아계신 성령의 역동적 임재와 선교적 능력을 강조합니다.', 
    keyEmphasis: '성령세례, 은사의 연속성, 역동적 예배와 선교' 
  },
  { 
    name: '성결교', 
    shortName: '성결교',
    description: '사중복음(중생, 성결, 신유, 재림)을 중심으로 신자의 온전한 성결과 헌신된 삶을 추구합니다.', 
    keyEmphasis: '사중복음(중생·성결·신유·재림), 온전한 성화' 
  },
  { 
    name: '성공회 개신교 전통', 
    shortName: '성공회',
    description: '성경, 이성, 전통의 조화 속에서 종교개혁의 복음주의적 전통과 포용적 개신교 영성을 계승합니다.', 
    keyEmphasis: '성경·이성·전통의 균형, 복음주의적 전례' 
  },
  { 
    name: '무교회주의', 
    shortName: '무교회',
    description: '우치무라 간조, 김교신 등으로 대표되며, 제도와 교파주의를 넘어선 오직 성경과 십자가 신앙의 순수성을 추구합니다.', 
    keyEmphasis: '제도주의 탈피, 성경 중심, 신자의 영적 자율성' 
  }
];

export const DIFFICULTIES: DifficultyInfo[] = [
  { level: '입문', description: '쉽고 명확한 성경적 설명 위주로 접근합니다.', target: '기본적인 개념과 직관적 이해' },
  { level: '일반', description: '개신교 신학적 맥락과 대표 학자들의 시각을 조화롭게 다룹니다.', target: '교리와 성경에 관심 있는 성도' },
  { level: '신학자', description: '원어 분석, 역사적 개혁파/루터란 신조, 깊이 있는 학술 논쟁을 다룹니다.', target: '심층적 신학 연구와 검증' },
];

export const DEFAULT_TOPICS: Topic[] = [
  {
    id: 'free-will',
    title: '인간에게 자유의지가 있다면 하나님의 예정과 모순되는 것 아닌가?',
    category: '구원론 / 신론',
    description: '개혁주의의 무조건적 선택·주권 작정과 웨슬리안의 선행은총·인격적 응답 간의 개신교 내부 대화.',
    verses: ['로마서 9:15–18', '에베소서 1:4-5', '신명기 30:19', '빌립보서 2:12-13'],
    perspectives: ['개혁주의 / 장로교', '웨슬리안 / 감리교', '루터교', '침례교'],
    popularCount: 2320
  },
  {
    id: 'faith-alone',
    title: '오직 믿음(Sola Fide)으로 의롭다 함을 얻는다는 것은 행함을 배제하는가?',
    category: '구원론 / 성화론',
    description: '바울의 이신칭의와 야고보의 행함이 있는 믿음, 개혁주의와 루터교, 웨슬리안의 성화론 비교.',
    verses: ['로마서 3:28', '갈라디아서 2:16', '야고보서 2:24', '에베소서 2:8-10'],
    perspectives: ['루터교', '개혁주의 / 장로교', '웨슬리안 / 감리교', '성결교'],
    popularCount: 2150
  },
  {
    id: 'uchimura',
    title: '우치무라 간조의 무교회주의는 개신교 교회론과 어떻게 만나는가?',
    category: '교회론 / 개신교 사상사',
    description: '제도적 교회의 한계를 극복하려는 십자가 복음 중심주의와 정통 개신교의 공교회성 간의 대화.',
    verses: ['요한복음 4:23-24', '갈라디아서 5:1', '에베소서 4:11-13'],
    perspectives: ['무교회주의', '초교파 복음주의', '개혁주의 / 장로교'],
    popularCount: 1850
  },
  {
    id: 'holy-spirit-gifts',
    title: '성령의 초자연적 은사(방언, 신유)는 오늘날에도 계속되는가?',
    category: '성령론',
    description: '오순절/은사주의의 은사 지속론과 정통 개혁주의의 은사 중지론 간의 성경적 검토.',
    verses: ['고린도전서 12:7-11', '고린도전서 13:8-10', '사도행전 2:17-18'],
    perspectives: ['오순절 / 은사주의', '개혁주의 / 장로교', '침례교', '초교파 복음주의'],
    popularCount: 1980
  },
  {
    id: 'baptism-mode',
    title: '유아세례와 신자의 침례(신자의 결단) 중 성경적 원리는 무엇인가?',
    category: '교회론 / 성례론',
    description: '개혁주의/장로교·루터교의 언약적 유아세례와 침례교의 신자 침례(Believer\'s Baptism) 비교.',
    verses: ['창세기 17:7', '사도행전 2:38-39', '골로새서 2:11-12', '마가복음 16:16'],
    perspectives: ['개혁주의 / 장로교', '침례교', '루터교', '웨슬리안 / 감리교'],
    popularCount: 1640
  },
  {
    id: 'security-of-believer',
    title: '한번 구원받은 신자는 영원히 구원을 잃어버리지 않는가 (성도의 견인)?',
    category: '구원론',
    description: '칼빈주의 5대 강령의 성도의 견인(Eternal Security)과 알미니안/웨슬리안의 은혜로부터의 타락 가능성.',
    verses: ['요한복음 10:28-29', '로마서 8:38-39', '히브리서 6:4-6', '베드로후서 2:20-21'],
    perspectives: ['개혁주의 / 장로교', '웨슬리안 / 감리교', '침례교'],
    popularCount: 2450
  }
];

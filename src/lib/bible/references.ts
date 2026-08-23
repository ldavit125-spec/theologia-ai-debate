export interface BibleReferenceItem {
  reference: string;
  text?: string;
  contextExplanation: string;
  denominationalViews?: {
    tradition: string;
    interpretation: string;
  }[];
}

export interface TheologicalSourceItem {
  authorOrDocument: string;
  workTitle: string;
  summary: string;
}

export const VERIFIED_BIBLE_REFERENCES: Record<string, BibleReferenceItem[]> = {
  'free-will': [
    {
      reference: '로마서 9:15–18',
      text: '모세에게 이르시되 내가 긍휼히 여길 자를 긍휼히 여기고 불쌍히 여길 자를 불쌍히 여기리라 하셨으니...',
      contextExplanation: '하나님의 주권적 선택과 긍휼의 기준이 인간의 노력이나 의지에 의해 좌우되지 않음을 다루는 핵심 장절.',
      denominationalViews: [
        { tradition: '개혁주의', interpretation: '개인의 선택과 영원한 예정에 대한 결정적인 본문으로 해석.' },
        { tradition: '감리교/웨슬리안', interpretation: '이스라엘 민족의 구속사적 기능에 대한 논의로 보며, 개인의 응답 가능성과 선행은총을 함께 고려.' },
        { tradition: '가톨릭', interpretation: '은총의 절대적 우선성을 인정하면서도 은총에 협력하는 인간의 자유의지적 순종을 강조.' }
      ]
    },
    {
      reference: '신명기 30:19',
      text: '내가 오늘 하늘과 땅을 불러 너희에게 증거를 삼노라 내가 생명과 사망과 복과 저주를 네 앞에 두었은즉 너와 네 자손이 살기 위하여 생명을 택하고',
      contextExplanation: '인간에게 도덕적·인격적 선택의 책임이 분명히 부여되어 있음을 시사하는 언약적 권면.',
      denominationalViews: [
        { tradition: '감리교/알미니안', interpretation: '인간에게 주어진 인격적 선택권과 순종의 책임을 보여주는 명백한 증거로 인용.' },
        { tradition: '개혁주의', interpretation: '명령과 책임이 곧 인간의 자력 구원 능력을 증명하는 것은 아니며, 성령의 은혜가 먼저 필요하다고 봄.' }
      ]
    },
    {
      reference: '빌립보서 2:12–13',
      text: '항상 복종하여 두렵고 떨림으로 너희 구원을 이루라 너희 안에서 행하시는 이는 하나님이시니...',
      contextExplanation: '성도의 능동적 순종과 성도 안에서 일하시는 하나님의 주권적 역사가 공존하는 역설적 본문.',
      denominationalViews: [
        { tradition: '루터교/개혁주의', interpretation: '인간의 성화 노력조차 궁극적으로 하나님께서 주시는 은혜의 결과물임을 강조.' },
        { tradition: '동방정교회/성공회', interpretation: '하나님의 은총과 인간의 자유의지가 조화롭게 협력하는 신인협력(Synergia)의 전형적 본문으로 봄.' }
      ]
    }
  ],
  'faith-and-works': [
    {
      reference: '야고보서 2:14–26',
      text: '내 형제들아 만일 사람이 믿음이 있노라 하고 행함이 없으면 무슨 유익이 있으리요...',
      contextExplanation: '살아있는 참된 신앙은 반드시 인격적 순종과 사랑의 행위로 열매 맺어야 한다는 교훈.',
      denominationalViews: [
        { tradition: '개혁주의/루터교', interpretation: '행위는 구원의 원인이 아니라, 참된 칭의(이신칭의)를 입증하는 필연적 열매로 해석.' },
        { tradition: '가톨릭', interpretation: '믿음과 함께 사랑으로 역사하는 행위가 구원 은총의 유지와 증진에 실질적으로 관여한다고 해석.' }
      ]
    },
    {
      reference: '로마서 3:28',
      text: '그러므로 사람이 의롭다 하심을 얻는 것은 율법의 행위에 있지 않고 믿음으로 되는 줄 우리가 인정하노라',
      contextExplanation: '오직 예수 그리스도를 믿는 믿음으로 값없이 주어지는 칭의(Sola Fide)의 근본 구절.',
      denominationalViews: [
        { tradition: '개혁주의/루터교', interpretation: '종교개혁의 핵심 조항(Sola Fide)이자 구원의 단독적 은혜성을 나타냄.' },
        { tradition: '가톨릭', interpretation: '할례나 구약 의식법과 같은 율법의 행위로 의로워질 수 없음을 뜻하며, 성사적 은혜와 선행을 배제하는 것은 아님.' }
      ]
    }
  ],
  'problem-of-evil': [
    {
      reference: '창세기 50:20',
      text: '당신들은 나를 해하려 하였으나 하나님은 그것을 선으로 바꾸사...',
      contextExplanation: '인간의 악한 행위조차 하나님의 더 크고 선하신 구속 경륜 안에서 섭리적으로 사용됨을 보여주는 본문.'
    },
    {
      reference: '욥기 38:4–7',
      text: '내가 땅의 기초를 놓을 때에 네가 어디 있었느냐...',
      contextExplanation: '피조물이 창조주의 거대한 지혜와 우주적 섭리의 심비를 온전히 다 헤아릴 수 없음을 일깨우는 하나님의 음성.'
    },
    {
      reference: '에베소서 6:12',
      text: '우리의 씨름은 혈과 육을 상대하는 것이 아니요 통치자들과 권세들과 이 어둠의 세상 주관자들과 하늘에 있는 악의 영들을 상대함이라',
      contextExplanation: '인간 내면의 죄성뿐만 아니라 초자연적인 악의 영적 세력이 실재함을 경고하는 본문.'
    }
  ]
};

export const VERIFIED_THEOLOGY_SOURCES: Record<string, TheologicalSourceItem[]> = {
  'augustine': [
    {
      authorOrDocument: '아우구스티누스 (Aurelius Augustinus)',
      workTitle: '은총론 (De Gratia et Libero Arbitrio) & 교정론 (De Correptione et Gratia)',
      summary: '타락 이후 인간의 자유의지는 죄에 예속되었으며, 오직 하나님의 선행적 은총만이 인간을 진정한 자유로 회복시킨다고 논증.'
    }
  ],
  'luther': [
    {
      authorOrDocument: '마르틴 루터 (Martin Luther)',
      workTitle: '노예의지론 (De Servo Arbitrio, 1525)',
      summary: '에라스무스의 자유의지론에 반박하여, 구원에 있어 인간 의지는 하나님의 은혜 없이는 결코 스스로 하나님을 택할 수 없음을 선언.'
    }
  ],
  'calvin': [
    {
      authorOrDocument: '장 칼뱅 (Jean Calvin)',
      workTitle: '기독교 강요 (Institutio Christianae Religionis, 1559)',
      summary: '하나님의 절대 주권, 이중 예정, 그리고 성경의 최고 권위를 체계화하여 개혁주의 신학의 기틀을 정립.'
    }
  ],
  'confessions': [
    {
      authorOrDocument: '웨스트민스터 신앙고백서 (Westminster Confession of Faith, 1647)',
      workTitle: '제3장 하나님의 영원한 작정 & 제9장 자유의지',
      summary: '하나님의 불변하는 영원한 작정과 섭리 하에 인간의 2차적 원인 및 도덕적 자유와 책임이 보존됨을 정밀하게 규정.'
    },
    {
      authorOrDocument: '가톨릭 교회 교리서 (Catechism of the Catholic Church, CCC)',
      workTitle: 'CCC 1730–1748 (인간의 자유) & CCC 1996–2005 (은총과 의화)',
      summary: '하느님께서 인간에게 자유를 주셨으며, 구원은 하느님의 은총의 주도에 인간이 자유롭게 동의하고 협력함으로써 완성됨을 천명.'
    },
    {
      authorOrDocument: '도르트 신조 (Canons of Dort, 1619)',
      workTitle: '제3/4 헤드: 인간의 부패와 하나님께로의 회심 및 그 방식',
      summary: '전적 타락(Total Depravity)과 불가항력적 은혜(Irresistible Grace)에 대한 5대 개혁신학 강령 정의.'
    }
  ]
};

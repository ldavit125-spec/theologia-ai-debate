export interface BibleBookInfo {
  id: string;
  name: string;
  shortName: string;
  testament: 'OT' | 'NT';
  category: string; // e.g., '율법서', '역사서', '시가서', '대선지서', '소선지서', '복음서', '바울서신', '공동서신', '예언서'
  chaptersCount: number;
}

export interface VerseItem {
  testament: 'OT' | 'NT';
  book: string;
  chapter: number;
  verse: number;
  text: string;
  category?: string;
  theologicalNotes?: string;
}

export const BIBLE_BOOKS: BibleBookInfo[] = [
  // Old Testament (39 books)
  // 율법서 (모세오경)
  { id: 'gen', name: '창세기', shortName: '창', testament: 'OT', category: '율법서', chaptersCount: 50 },
  { id: 'exo', name: '출애굽기', shortName: '출', testament: 'OT', category: '율법서', chaptersCount: 40 },
  { id: 'lev', name: '레위기', shortName: '레', testament: 'OT', category: '율법서', chaptersCount: 27 },
  { id: 'num', name: '민수기', shortName: '민', testament: 'OT', category: '율법서', chaptersCount: 36 },
  { id: 'deu', name: '신명기', shortName: '신', testament: 'OT', category: '율법서', chaptersCount: 34 },
  
  // 역사서
  { id: 'jos', name: '여호수아', shortName: '수', testament: 'OT', category: '역사서', chaptersCount: 24 },
  { id: 'jdg', name: '사사기', shortName: '삿', testament: 'OT', category: '역사서', chaptersCount: 21 },
  { id: 'rut', name: '룻기', shortName: '룻', testament: 'OT', category: '역사서', chaptersCount: 4 },
  { id: '1sa', name: '사무엘상', shortName: '삼상', testament: 'OT', category: '역사서', chaptersCount: 31 },
  { id: '2sa', name: '사무엘하', shortName: '삼하', testament: 'OT', category: '역사서', chaptersCount: 24 },
  { id: '1ki', name: '열왕기상', shortName: '왕상', testament: 'OT', category: '역사서', chaptersCount: 22 },
  { id: '2ki', name: '열왕기하', shortName: '왕하', testament: 'OT', category: '역사서', chaptersCount: 25 },
  { id: '1ch', name: '역대상', shortName: '대상', testament: 'OT', category: '역사서', chaptersCount: 29 },
  { id: '2ch', name: '역대하', shortName: '대하', testament: 'OT', category: '역사서', chaptersCount: 36 },
  { id: 'ezr', name: '에스라', shortName: '스', testament: 'OT', category: '역사서', chaptersCount: 10 },
  { id: 'neh', name: '느헤미야', shortName: '느', testament: 'OT', category: '역사서', chaptersCount: 13 },
  { id: 'est', name: '에스더', shortName: '에', testament: 'OT', category: '역사서', chaptersCount: 10 },

  // 시가서
  { id: 'job', name: '욥기', shortName: '욥', testament: 'OT', category: '시가서', chaptersCount: 42 },
  { id: 'psa', name: '시편', shortName: '시', testament: 'OT', category: '시가서', chaptersCount: 150 },
  { id: 'pro', name: '잠언', shortName: '잠', testament: 'OT', category: '시가서', chaptersCount: 31 },
  { id: 'ecc', name: '전도서', shortName: '전', testament: 'OT', category: '시가서', chaptersCount: 12 },
  { id: 'sng', name: '아가', shortName: '아', testament: 'OT', category: '시가서', chaptersCount: 8 },

  // 대선지서
  { id: 'isa', name: '이사야', shortName: '사', testament: 'OT', category: '대선지서', chaptersCount: 66 },
  { id: 'jer', name: '예레미야', shortName: '렘', testament: 'OT', category: '대선지서', chaptersCount: 52 },
  { id: 'lam', name: '예레미야애가', shortName: '애', testament: 'OT', category: '대선지서', chaptersCount: 5 },
  { id: 'ezk', name: '에스겔', shortName: '겔', testament: 'OT', category: '대선지서', chaptersCount: 48 },
  { id: 'dan', name: '다니엘', shortName: '단', testament: 'OT', category: '대선지서', chaptersCount: 12 },

  // 소선지서
  { id: 'hos', name: '호세아', shortName: '호', testament: 'OT', category: '소선지서', chaptersCount: 14 },
  { id: 'jol', name: '요엘', shortName: '욜', testament: 'OT', category: '소선지서', chaptersCount: 3 },
  { id: 'amo', name: '아모스', shortName: '암', testament: 'OT', category: '소선지서', chaptersCount: 9 },
  { id: 'oba', name: '오바댜', shortName: '옵', testament: 'OT', category: '소선지서', chaptersCount: 1 },
  { id: 'jon', name: '요나', shortName: '욘', testament: 'OT', category: '소선지서', chaptersCount: 4 },
  { id: 'mic', name: '미가', shortName: '미', testament: 'OT', category: '소선지서', chaptersCount: 7 },
  { id: 'nam', name: '나훔', shortName: '나', testament: 'OT', category: '소선지서', chaptersCount: 3 },
  { id: 'hab', name: '하박국', shortName: '합', testament: 'OT', category: '소선지서', chaptersCount: 3 },
  { id: 'zep', name: '스바냐', shortName: '습', testament: 'OT', category: '소선지서', chaptersCount: 3 },
  { id: 'hag', name: '학개', shortName: '학', testament: 'OT', category: '소선지서', chaptersCount: 2 },
  { id: 'zec', name: '스가랴', shortName: '슥', testament: 'OT', category: '소선지서', chaptersCount: 14 },
  { id: 'mal', name: '말라기', shortName: '말', testament: 'OT', category: '소선지서', chaptersCount: 4 },

  // New Testament (27 books)
  // 복음서 & 역사서
  { id: 'mat', name: '마태복음', shortName: '마', testament: 'NT', category: '복음서', chaptersCount: 28 },
  { id: 'mrk', name: '마가복음', shortName: '막', testament: 'NT', category: '복음서', chaptersCount: 16 },
  { id: 'luk', name: '누가복음', shortName: '눅', testament: 'NT', category: '복음서', chaptersCount: 24 },
  { id: 'jhn', name: '요한복음', shortName: '요', testament: 'NT', category: '복음서', chaptersCount: 21 },
  { id: 'act', name: '사도행전', shortName: '행', testament: 'NT', category: '역사서', chaptersCount: 28 },

  // 바울서신
  { id: 'rom', name: '로마서', shortName: '롬', testament: 'NT', category: '바울서신', chaptersCount: 16 },
  { id: '1co', name: '고린도전서', shortName: '고전', testament: 'NT', category: '바울서신', chaptersCount: 16 },
  { id: '2co', name: '고린도후서', shortName: '고후', testament: 'NT', category: '바울서신', chaptersCount: 13 },
  { id: 'gal', name: '갈라디아서', shortName: '갈', testament: 'NT', category: '바울서신', chaptersCount: 6 },
  { id: 'eph', name: '에베소서', shortName: '엡', testament: 'NT', category: '바울서신', chaptersCount: 6 },
  { id: 'php', name: '빌립보서', shortName: '빌', testament: 'NT', category: '바울서신', chaptersCount: 4 },
  { id: 'col', name: '골로새서', shortName: '골', testament: 'NT', category: '바울서신', chaptersCount: 4 },
  { id: '1th', name: '데살로니가전서', shortName: '살전', testament: 'NT', category: '바울서신', chaptersCount: 5 },
  { id: '2th', name: '데살로니가후서', shortName: '살후', testament: 'NT', category: '바울서신', chaptersCount: 3 },
  { id: '1ti', name: '디모데전서', shortName: '딤전', testament: 'NT', category: '바울서신', chaptersCount: 6 },
  { id: '2ti', name: '디모데후서', shortName: '딤후', testament: 'NT', category: '바울서신', chaptersCount: 4 },
  { id: 'tit', name: '디도서', shortName: '딛', testament: 'NT', category: '바울서신', chaptersCount: 3 },
  { id: 'phm', name: '빌레몬서', shortName: '몬', testament: 'NT', category: '바울서신', chaptersCount: 1 },

  // 공동서신
  { id: 'heb', name: '히브리서', shortName: '히', testament: 'NT', category: '공동서신', chaptersCount: 13 },
  { id: 'jas', name: '야고보서', shortName: '약', testament: 'NT', category: '공동서신', chaptersCount: 5 },
  { id: '1pe', name: '베드로전서', shortName: '벧전', testament: 'NT', category: '공동서신', chaptersCount: 5 },
  { id: '2pe', name: '베드로후서', shortName: '벧후', testament: 'NT', category: '공동서신', chaptersCount: 3 },
  { id: '1jn', name: '요한일서', shortName: '요일', testament: 'NT', category: '공동서신', chaptersCount: 5 },
  { id: '2jn', name: '요한이서', shortName: '요이', testament: 'NT', category: '공동서신', chaptersCount: 1 },
  { id: '3jn', name: '요한삼서', shortName: '요삼', testament: 'NT', category: '공동서신', chaptersCount: 1 },
  { id: 'jud', name: '유다서', shortName: '유', testament: 'NT', category: '공동서신', chaptersCount: 1 },

  // 예언서
  { id: 'rev', name: '요한계시록', shortName: '계', testament: 'NT', category: '예언서', chaptersCount: 22 },
];

export const CATEGORIES_OT = ['율법서', '역사서', '시가서', '대선지서', '소선지서'];
export const CATEGORIES_NT = ['복음서', '역사서', '바울서신', '공동서신', '예언서'];

// Sample Verses Dataset with Extensive theological coverage
export const SAMPLE_VERSES_DB: VerseItem[] = [
  // 창세기
  { testament: 'OT', book: '창세기', chapter: 1, verse: 1, text: '태초에 하나님이 천지를 창조하시니라.', category: '창조론' },
  { testament: 'OT', book: '창세기', chapter: 1, verse: 26, text: '하나님이 이르시되 우리의 형상을 따라 우리의 모양대로 우리가 사람을 만들고 그들로 바다의 물고기와 하늘의 새와 가축과 온 땅과 땅에 기는 모든 것을 다스리게 하자 하시고', category: '인간론' },
  { testament: 'OT', book: '창세기', chapter: 1, verse: 27, text: '하나님이 자기 형상 곧 하나님의 형상대로 사람을 창조하시되 남자와 여자를 창조하시고', category: '하나님의 형상' },
  { testament: 'OT', book: '창세기', chapter: 2, verse: 7, text: '여호와 하나님이 땅의 흙으로 사람을 지으시고 생기를 그 코에 불어넣으시니 사람이 생령이 되니라', category: '창조론' },
  { testament: 'OT', book: '창세기', chapter: 3, verse: 6, text: '여자가 그 나무를 본즉 먹음직도 하고 보암직도 하고 지혜롭게 할 만큼 탐스럽기도 한 나무인지라 여자가 그 열매를 따먹고 자기와 함께 있는 남편에게도 주매 그도 먹은지라', category: '타락 / 죄론' },
  { testament: 'OT', book: '창세기', chapter: 3, verse: 15, text: '내가 너로 여자와 원수가 되게 하고 네 후손도 여자의 후손과 원수가 되게 하리니 여자의 후손은 네 머리를 상하게 할 것이요 너는 그의 발꿈치를 상하게 할 것이니라 하시고', category: '원시복음' },
  { testament: 'OT', book: '창세기', chapter: 12, verse: 1, text: '여호와께서 아브람에게 이르시되 너는 너의 고향과 친척과 아버지의 집을 떠나 내가 네게 보여 줄 땅으로 가라', category: '언약' },
  { testament: 'OT', book: '창세기', chapter: 15, verse: 6, text: '아브람이 여호와를 믿으니 여호와께서 이를 그의 의로 여기시고', category: '이신칭의' },
  { testament: 'OT', book: '창세기', chapter: 50, verse: 20, text: '당신들은 나를 해하려 하였으나 하나님은 그것을 선으로 바꾸사 오늘과 같이 많은 백성의 생명을 구원하게 하시려 하셨나니', category: '하나님의 섭리' },

  // 출애굽기
  { testament: 'OT', book: '출애굽기', chapter: 3, verse: 14, text: '하나님이 모세에게 이르시되 나는 스스로 있는 자이니라 또 이르시되 너는 이스라엘 자손에게 이같이 이르기를 스스로 있는 자가 나를 너희에게 보내셨다 하라', category: '신론' },
  { testament: 'OT', book: '출애굽기', chapter: 20, verse: 3, text: '너는 나 외에는 다른 신들을 네게 두지 말라', category: '십계명' },

  // 신명기
  { testament: 'OT', book: '신명기', chapter: 6, verse: 4, text: '이스라엘아 들으라 우리 하나님 여호와는 오직 유일한 여호와이시니', category: '유일신론' },
  { testament: 'OT', book: '신명기', chapter: 30, verse: 19, text: '내가 오늘 하늘과 땅을 불러 너희에게 증거를 삼노라 내가 생명과 사망과 복과 저주를 네 앞에 두었은즉 너와 네 자손이 살기 위하여 생명을 택하고', category: '자유의지와 선택' },

  // 시편
  { testament: 'OT', book: '시편', chapter: 1, verse: 1, text: '복 있는 사람은 악인들의 꾀를 따르지 아니하며 죄인들의 길에 서지 아니하며 오만한 자들의 자리에 앉지 아니하고', category: '의인과 악인' },
  { testament: 'OT', book: '시편', chapter: 23, verse: 1, text: '여호와는 나의 목자시니 내게 부족함이 없으리로다', category: '목자 신앙' },
  { testament: 'OT', book: '시편', chapter: 139, verse: 16, text: '내 형질이 이루어지기 전에 주의 눈이 보셨으며 나를 위하여 정한 날이 하루도 되기 전에 주의 책에 다 기록이 되었나이다', category: '예정과 섭리' },

  // 잠언 & 전도서
  { testament: 'OT', book: '잠언', chapter: 16, verse: 9, text: '사람이 마음으로 자기의 길을 계획할지라도 그의 걸음을 인도하시는 이는 여호와시니라', category: '주권과 인간' },
  { testament: 'OT', book: '전도서', chapter: 3, verse: 1, text: '범사에 기한이 있고 천하 만사가 다 때가 있나니', category: '섭리' },

  // 이사야 & 예레미야
  { testament: 'OT', book: '이사야', chapter: 9, verse: 6, text: '이는 한 아기가 우리에게 났고 한 아들을 우리에게 주신 바 되었는데 그의 어깨에는 정사를 메었고 그의 이름은 기묘자라, 모사라, 전능하신 하나님이라, 영존하시는 아버지라, 평강의 왕이라 할 것임이라', category: '메시아 예언' },
  { testament: 'OT', book: '이사야', chapter: 53, verse: 5, text: '그가 찔림은 우리의 허물 때문이요 그가 상함은 우리의 죄악 때문이라 그가 징계를 받으므로 우리는 평화를 누리고 그가 채찍에 맞으므로 우리는 나음을 받았도다', category: '대속 신앙' },
  { testament: 'OT', book: '예레미야', chapter: 31, verse: 33, text: '그러나 그 날 후에 내가 이스라엘 집과 맺을 언약은 이러하니 곧 내가 나의 법을 그들의 속에 두며 그들의 마음에 기록하여 나는 그들의 하나님이 되고 그들은 내 백성이 될 것이라 여호와의 말씀이니라', category: '새 언약' },

  // 마태복음
  { testament: 'NT', book: '마태복음', chapter: 5, verse: 3, text: '심령이 가난한 자는 복이 있나니 천국이 그들의 것임이요', category: '산상수훈' },
  { testament: 'NT', book: '마태복음', chapter: 16, verse: 16, text: '시몬 베드로가 대답하여 이르되 주는 그리스도시요 살아 계신 하나님의 아들이시니이다', category: '신앙고백' },
  { testament: 'NT', book: '마태복음', chapter: 25, verse: 46, text: '그들은 영벌에, 의인들은 영생에 들어가리라 하시니라', category: '최후 심판' },
  { testament: 'NT', book: '마태복음', chapter: 28, verse: 19, text: '그러므로 너희는 가서 모든 민족을 제자로 삼아 아버지와 아들과 성령의 이름으로 세례를 베풀고', category: '지상대명령' },

  // 요한복음
  { testament: 'NT', book: '요한복음', chapter: 1, verse: 1, text: '태초에 말씀이 계시니라 이 말씀이 하나님과 함께 계셨으니 이 말씀은 곧 하나님이시니라', category: '로고스 / 기독론' },
  { testament: 'NT', book: '요한복음', chapter: 1, verse: 14, text: '말씀이 육신이 되어 우리 가운데 거하시매 우리가 그의 영광을 보니 아버지의 독생자의 영광이요 은혜와 진리가 충만하더라', category: '성육신' },
  { testament: 'NT', book: '요한복음', chapter: 3, verse: 16, text: '하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라', category: '복음 / 사랑' },
  { testament: 'NT', book: '요한복음', chapter: 6, verse: 44, text: '나를 보내신 아버지께서 이끌지 아니하시면 아무도 내게 올 수 없으니 오는 그를 내가 마지막 날에 다시 살리리라', category: '은혜의 주권' },
  { testament: 'NT', book: '요한복음', chapter: 14, verse: 6, text: '예수께서 이르시되 내가 곧 길이요 진리요 생명이니 나로 말미암지 않고는 아버지께로 올 자가 없느니라', category: '오직 예수' },

  // 로마서
  { testament: 'NT', book: '로마서', chapter: 1, verse: 17, text: '복음에는 하나님의 의가 나타나서 믿음으로 믿음에 이르게 하나니 기록된 바 오직 의인은 믿음으로 말미암아 살리라 함과 같으니라', category: '이신칭의' },
  { testament: 'NT', book: '로마서', chapter: 3, verse: 23, text: '모든 사람이 죄를 범하였으매 하나님의 영광에 이르지 못하더니', category: '전적 타락' },
  { testament: 'NT', book: '로마서', chapter: 3, verse: 24, text: '그리스도 예수 안에 있는 속량으로 말미암아 하나님의 은혜로 값 없이 의롭다 하심을 얻은 자 되었느니라', category: '값없는 은혜' },
  { testament: 'NT', book: '로마서', chapter: 8, verse: 28, text: '우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라', category: '섭리와 부르심' },
  { testament: 'NT', book: '로마서', chapter: 8, verse: 29, text: '하나님이 미리 아신 자들을 또한 그 아들의 형상을 본받게 하기 위하여 미리 정하셨으니 이는 그로 많은 형제 중에서 맏아들이 되게 하려 하심이니라', category: '예정론' },
  { testament: 'NT', book: '로마서', chapter: 8, verse: 30, text: '또 미리 정하신 그들을 또한 부르시고 부르신 그들을 또한 의롭다 하시고 의롭다 하신 그들을 또한 영화롭게 하셨느니라', category: '구원의 서정' },
  { testament: 'NT', book: '로마서', chapter: 9, verse: 18, text: '그런즉 하나님께서 하고자 하시는 자를 긍휼히 여기시고 하고자 하시는 자를 완악하게 하시느니라', category: '하나님의 주권' },

  // 고린도전후서 & 갈라디아서
  { testament: 'NT', book: '고린도전서', chapter: 13, verse: 13, text: '그런즉 믿음, 소망, 사랑, 이 세 가지는 항상 있을 것인데 그 중의 제일은 사랑이라', category: '사랑의 찬가' },
  { testament: 'NT', book: '고린도후서', chapter: 5, verse: 17, text: '그런즉 누구든지 그리스도 안에 있으면 새로운 피조물이라 이전 것은 지나갔으니 보라 새 것이 되었도다', category: '새 피조물' },
  { testament: 'NT', book: '갈라디아서', chapter: 2, verse: 20, text: '내가 그리스도와 함께 십자가에 못 박혔나니 그런즉 이제는 내가 사는 것이 아니요 오직 내 안에 그리스도께서 사시는 것이라', category: '성화와 연합' },

  // 에베소서 & 빌립보서
  { testament: 'NT', book: '에베소서', chapter: 1, verse: 4, text: '곧 창세 전에 그리스도 안에서 우리를 택하사 우리로 사랑 안에서 그 앞에 거룩하고 흠이 없게 하시려고', category: '창세 전 선택' },
  { testament: 'NT', book: '에베소서', chapter: 2, verse: 8, text: '너희는 그 은혜에 의하여 믿음으로 말미암아 구원을 받았으니 이것은 너희에게서 난 것이 아니요 하나님의 선물이라', category: '선물인 구원' },
  { testament: 'NT', book: '에베소서', chapter: 2, verse: 9, text: '행위에서 난 것이 아니니 이는 누구든지 자랑하지 못하게 함이라', category: '행위 배제' },
  { testament: 'NT', book: '빌립보서', chapter: 2, verse: 12, text: '그러므로 나의 사랑하는 자들아 너희가 나 있을 때뿐 아니라 더욱 지금 나 없을 때에도 항상 복종하여 두렵고 떨림으로 너희 구원을 이루라', category: '성화의 책임' },
  { testament: 'NT', book: '빌립보서', chapter: 2, verse: 13, text: '너희 안에서 행하시는 이는 하나님이시니 자기의 기뻐하시는 뜻을 위하여 너희에게 소원을 두고 행하게 하시나니', category: '은혜의 역사' },

  // 야고보서 & 베드로전후서
  { testament: 'NT', book: '야고보서', chapter: 2, verse: 17, text: '이와 같이 행함이 없는 믿음은 그 자체가 죽은 것이라', category: '행함과 믿음' },
  { testament: 'NT', book: '야고보서', chapter: 2, verse: 24, text: '이로 보건대 사람이 행함으로 의롭다 하심을 받고 믿음으로만은 아니니라', category: '행위와 칭의' },
  { testament: 'NT', book: '베드로전서', chapter: 2, verse: 9, text: '그러나 너희는 택하신 족속이요 왕 같은 제사장들이요 거룩한 나라요 그의 소유가 된 백성이니', category: '만인제사장직' },
  { testament: 'NT', book: '베드로후서', chapter: 3, verse: 9, text: '주의 약속은 어떤 이들이 더디다고 생각하는 것 같이 더딘 것이 아니라 오직 주께서는 너희를 대하여 오래 참으사 아무도 멸망하지 아니하고 다 회개하기에 이르기를 원하시느니라', category: '하나님의 인내와 구원' },

  // 요한계시록
  { testament: 'NT', book: '요한계시록', chapter: 21, verse: 4, text: '모든 눈물을 그 눈에서 닦아 주시니 다시는 사망이 없고 애통하는 것이나 곡하는 것이나 아픈 것이 다시 있지 아니하리니 처음 것들이 다 지나갔음이러라', category: '새 하늘과 새 땅' },
  { testament: 'NT', book: '요한계시록', chapter: 22, verse: 20, text: '이것들을 증언하신 이가 이르시되 내가 진실로 속히 오리라 하시거늘 아멘 주 예수여 오시옵소서', category: '재림과 마라나타' }
];

export class BibleDataService {
  /**
   * Get dynamic verses for any book and chapter.
   * If a curated verse is in SAMPLE_VERSES_DB, return it; otherwise generate standard accurate placeholder verse structures.
   */
  static getVersesForChapter(bookName: string, chapter: number): VerseItem[] {
    const book = BIBLE_BOOKS.find(b => b.name === bookName || b.shortName === bookName);
    if (!book) return [];

    const existing = SAMPLE_VERSES_DB.filter(v => v.book === book.name && v.chapter === chapter);
    if (existing.length > 0) {
      return existing;
    }

    // Default 5 representative verse slots per chapter if specific DB item is not loaded
    const sampleCount = chapter === 1 ? 5 : 4;
    const generated: VerseItem[] = [];
    for (let i = 1; i <= sampleCount; i++) {
      generated.push({
        testament: book.testament,
        book: book.name,
        chapter,
        verse: i,
        text: `${book.name} ${chapter}장 ${i}절 본문 말씀입니다. (개역개정 성경 본문 조회)`
      });
    }
    return generated;
  }

  /**
   * Search by Reference (e.g. '창세기 1:1', '요한복음 3:16', '로마서 8') or by Keywords ('믿음', '은혜', '예정', '사랑')
   */
  static search(query: string): { matches: VerseItem[]; directNavigation?: { book: string; chapter: number; verse?: number } } {
    const q = query.trim();
    if (!q) return { matches: [] };

    // 1. Direct Reference Parser: "창세기 1:1", "창 1:1", "로마서 8:28", "요한복음 3"
    const refMatch = q.match(/^([가-힣]+)\s*(\d+)(?::(\d+))?$/);
    if (refMatch) {
      const inputBook = refMatch[1];
      const chapter = parseInt(refMatch[2], 10);
      const verse = refMatch[3] ? parseInt(refMatch[3], 10) : undefined;

      const foundBook = BIBLE_BOOKS.find(b => b.name === inputBook || b.shortName === inputBook || b.name.startsWith(inputBook));
      if (foundBook) {
        const chapterVerses = this.getVersesForChapter(foundBook.name, chapter);
        const filtered = verse ? chapterVerses.filter(v => v.verse === verse) : chapterVerses;
        return {
          matches: filtered.length > 0 ? filtered : [{
            testament: foundBook.testament,
            book: foundBook.name,
            chapter,
            verse: verse || 1,
            text: `${foundBook.name} ${chapter}장 ${verse || 1}절 본문 말씀`
          }],
          directNavigation: {
            book: foundBook.name,
            chapter,
            verse
          }
        };
      }
    }

    // 2. Keyword Search over Verses DB and Categories
    const keywordMatches = SAMPLE_VERSES_DB.filter(v => 
      v.text.includes(q) || 
      v.book.includes(q) || 
      (v.category && v.category.includes(q))
    );

    return { matches: keywordMatches };
  }
}

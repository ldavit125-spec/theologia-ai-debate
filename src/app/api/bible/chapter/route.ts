import { NextRequest, NextResponse } from 'next/server';
import { BIBLE_BOOKS } from '@/lib/bible/bibleData';

// Map book name to Bolls API standard book order number (1 to 66)
const BOOK_ORDER_MAP: Record<string, number> = {
  // OT (1-39)
  '창세기': 1, '출애굽기': 2, '레위기': 3, '민수기': 4, '신명기': 5,
  '여호수아': 6, '사사기': 7, '룻기': 8, '사무엘상': 9, '사무엘하': 10,
  '열왕기상': 11, '열왕기하': 12, '역대상': 13, '역대하': 14, '에스라': 15,
  '느헤미야': 16, '에스더': 17, '욥기': 18, '시편': 19, '잠언': 20,
  '전도서': 21, '아가': 22, '이사야': 23, '예레미야': 24, '예레미야애가': 25,
  '에스겔': 26, '다니엘': 27, '호세아': 28, '요엘': 29, '아모스': 30,
  '오바댜': 31, '요나': 32, '미가': 33, '나훔': 34, '하박국': 35,
  '스바냐': 36, '학개': 37, '스가랴': 38, '말라기': 39,
  // NT (40-66)
  '마태복음': 40, '마가복음': 41, '누가복음': 42, '요한복음': 43, '사도행전': 44,
  '로마서': 45, '고린도전서': 46, '고린도후서': 47, '갈라디아서': 48, '에베소서': 49,
  '빌립보서': 50, '골로새서': 51, '데살로니가전서': 52, '데살로니가후서': 53, '디모데전서': 54,
  '디모데후서': 55, '디도서': 56, '빌레몬서': 57, '히브리서': 58, '야고보서': 59,
  '베드로전서': 60, '베드로후서': 61, '요한일서': 62, '요한이서': 63, '요한삼서': 64,
  '유다서': 65, '요한계시록': 66
};

// In-memory server cache for fetched complete chapters to ensure lightning-fast responses
const CHAPTER_CACHE = new Map<string, Array<{ verse: number; text: string }>>();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const bookName = searchParams.get('book');
  const chapterStr = searchParams.get('chapter');

  if (!bookName || !chapterStr) {
    return NextResponse.json({ error: 'book and chapter parameters are required' }, { status: 400 });
  }

  const chapter = parseInt(chapterStr, 10);
  const bookObj = BIBLE_BOOKS.find(b => b.name === bookName || b.shortName === bookName);

  if (!bookObj || isNaN(chapter) || chapter < 1) {
    return NextResponse.json({ error: 'Invalid book or chapter' }, { status: 400 });
  }

  const bookId = BOOK_ORDER_MAP[bookObj.name];
  if (!bookId) {
    return NextResponse.json({ error: 'Book ID mapping not found' }, { status: 400 });
  }

  const cacheKey = `${bookId}-${chapter}`;
  if (CHAPTER_CACHE.has(cacheKey)) {
    return NextResponse.json({
      book: bookObj.name,
      testament: bookObj.testament,
      chapter,
      verses: CHAPTER_CACHE.get(cacheKey)!
    });
  }

  try {
    // Fetch full chapter from Public Domain Korean Bible API (KRV - 개역한글)
    const url = `https://bolls.life/get-chapter/KRV/${bookId}/${chapter}/`;
    const res = await fetch(url, {
      next: { revalidate: 86400 } // cache for 24 hours on Vercel edge/server
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        const fullVerses = data.map((item: { verse: number; text: string }) => ({
          verse: item.verse,
          text: item.text.replace(/<[^>]*>/g, '').trim()
        }));

        CHAPTER_CACHE.set(cacheKey, fullVerses);

        return NextResponse.json({
          book: bookObj.name,
          testament: bookObj.testament,
          chapter,
          verses: fullVerses
        });
      }
    }
  } catch (error) {
    console.error(`Failed to fetch Bible chapter ${bookName} ${chapter}:`, error);
  }

  // Graceful fallback for offline or network exceptions
  return NextResponse.json({
    book: bookObj.name,
    testament: bookObj.testament,
    chapter,
    verses: [
      { verse: 1, text: `${bookObj.name} ${chapter}장 본문을 불러오는 중 네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.` }
    ]
  });
}

'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { 
  BIBLE_BOOKS, 
  CATEGORIES_OT, 
  CATEGORIES_NT, 
  BibleDataService, 
  VerseItem, 
  BibleBookInfo 
} from '@/lib/bible/bibleData';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  ScrollText, 
  ArrowRight, 
  Bookmark, 
  MessageSquare,
  Flame,
  Layers,
  BookMarked,
  Loader2
} from 'lucide-react';

export default function BiblePage() {
  // 1. Navigation & Filter State
  const [selectedTestament, setSelectedTestament] = useState<'OT' | 'NT'>('OT');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  // 2. Active Selection: Book & Chapter (Defaults to Genesis 1)
  const [selectedBook, setSelectedBook] = useState<BibleBookInfo>(
    BIBLE_BOOKS.find(b => b.name === '창세기') || BIBLE_BOOKS[0]
  );
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [selectedVerse, setSelectedVerse] = useState<VerseItem | null>(null);

  // 3. Complete Chapter Verses State
  const [chapterVerses, setChapterVerses] = useState<VerseItem[]>([]);
  const [isLoadingChapter, setIsLoadingChapter] = useState(false);

  // 4. Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<VerseItem[] | null>(null);
  const [activeTab, setActiveTab] = useState<'reader' | 'doctrine'>('reader');

  // Curated Doctrinal Highlights (Separated from Bible Reader)
  const doctrineVerses = [
    { reference: '로마서 8:28', text: '우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라', topic: '하나님의 주권과 섭리', book: '로마서', chapter: 8, verse: 28 },
    { reference: '에베소서 2:8-9', text: '너희는 그 은혜에 의하여 믿음으로 말미암아 구원을 받았으니 이것은 너희에게서 난 것이 아니요 하나님의 선물이라', topic: '이신칭의와 은혜', book: '에베소서', chapter: 2, verse: 8 },
    { reference: '요한복음 3:16', text: '하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라', topic: '복음과 사랑', book: '요한복음', chapter: 3, verse: 16 },
    { reference: '창세기 1:1', text: '태초에 하나님이 천지를 창조하시니라', topic: '창조론', book: '창세기', chapter: 1, verse: 1 },
    { reference: '신명기 30:19', text: '내가 오늘 하늘과 땅을 불러 너희에게 증거를 삼노라 내가 생명과 사망과 복과 저주를 네 앞에 두었은즉 너와 네 자손이 살기 위하여 생명을 택하고', topic: '자유의지와 선택', book: '신명기', chapter: 30, verse: 19 },
    { reference: '빌립보서 2:13', text: '너희 안에서 행하시는 이는 하나님이시니 자기의 기뻐하시는 뜻을 위하여 너희에게 소원을 두고 행하게 하시나니', topic: '은혜의 역사', book: '빌립보서', chapter: 2, verse: 13 },
  ];

  // Filtered Books List
  const filteredBooks = useMemo(() => {
    return BIBLE_BOOKS.filter(b => {
      if (b.testament !== selectedTestament) return false;
      if (selectedCategory !== '전체' && b.category !== selectedCategory) return false;
      return true;
    });
  }, [selectedTestament, selectedCategory]);

  // Fetch 100% COMPLETE verses for the selected chapter without any slice or limit
  useEffect(() => {
    let isMounted = true;
    setIsLoadingChapter(true);

    async function loadChapterVerses() {
      try {
        const res = await fetch(`/api/bible/chapter?book=${encodeURIComponent(selectedBook.name)}&chapter=${selectedChapter}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.verses && Array.isArray(data.verses)) {
            const formatted: VerseItem[] = data.verses.map((v: { verse: number; text: string }) => ({
              testament: selectedBook.testament,
              book: selectedBook.name,
              chapter: selectedChapter,
              verse: v.verse,
              text: v.text
            }));
            setChapterVerses(formatted);
            return;
          }
        }
      } catch (err) {
        console.error('Failed to fetch full chapter verses:', err);
      } finally {
        if (isMounted) setIsLoadingChapter(false);
      }
    }

    loadChapterVerses();

    return () => {
      isMounted = false;
    };
  }, [selectedBook, selectedChapter]);

  // Handle Search Execution
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults(null);
      return;
    }

    const { matches, directNavigation } = BibleDataService.search(searchQuery);
    setSearchResults(matches);

    if (directNavigation) {
      const foundBook = BIBLE_BOOKS.find(b => b.name === directNavigation.book);
      if (foundBook) {
        setSelectedBook(foundBook);
        setSelectedTestament(foundBook.testament);
        setSelectedChapter(directNavigation.chapter);
      }
    }
  };

  const handleSelectBook = (book: BibleBookInfo) => {
    setSelectedBook(book);
    setSelectedChapter(1);
    setSelectedVerse(null);
    setSearchResults(null);
  };

  const handleSelectDoctrinal = (d: typeof doctrineVerses[0]) => {
    const bookObj = BIBLE_BOOKS.find(b => b.name === d.book);
    if (bookObj) {
      setSelectedBook(bookObj);
      setSelectedTestament(bookObj.testament);
      setSelectedChapter(d.chapter);
      setSelectedVerse({
        testament: bookObj.testament,
        book: d.book,
        chapter: d.chapter,
        verse: d.verse,
        text: d.text,
        category: d.topic
      });
      setActiveTab('reader');
      document.getElementById('bible-reading-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Header Title */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7A1C2C]/10 border border-[#7A1C2C]/20 text-[#7A1C2C] text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Complete 66 Books Scripture Explorer</span>
          </div>
          <h1 className="font-serif-kr text-3xl sm:text-4xl font-bold text-[#2C2A29]">
            성경 66권 전체 본문 탐구
          </h1>
          <p className="text-[#57534E] text-sm sm:text-base leading-relaxed">
            창세기 1장부터 요한계시록 22장까지, 선택한 성경책과 장의 <strong>모든 절(1절부터 마지막 절까지)을 빠짐없이 온전히 열람</strong>하고 AI 토론에 연동합니다.
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="max-w-3xl">
          <form onSubmit={handleSearch} className="relative flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-[#78716C] absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="성경 장절(예: 창세기 1:1, 로마서 8:28) 또는 주제 키워드(예: 은혜, 믿음, 예정, 자유의지)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#F7F3EB] border border-[#E8E2D5] focus:outline-none focus:border-[#7A1C2C] text-xs sm:text-sm text-[#2C2A29] placeholder-[#A8A29E] shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 rounded-2xl bg-[#7A1C2C] text-[#FDFBF7] font-bold text-xs hover:bg-[#9B2C3E] transition-colors border border-[#58121E] shadow-xs"
            >
              검색
            </button>
          </form>

          {/* Quick Jump Keyword Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2.5 text-[11px] text-[#78716C]">
            <span className="font-medium flex items-center gap-1">
              <Flame className="w-3 h-3 text-[#7A1C2C]" /> 빠른 이동:
            </span>
            {['창세기 1장', '시편 23편', '로마서 8장', '요한복음 1장', '요한계시록 22장'].map((kw) => (
              <button
                key={kw}
                type="button"
                onClick={() => {
                  const { directNavigation } = BibleDataService.search(kw.replace('편', '장').replace('장', ' 1'));
                  if (directNavigation) {
                    const b = BIBLE_BOOKS.find(book => book.name === directNavigation.book);
                    if (b) {
                      setSelectedBook(b);
                      setSelectedTestament(b.testament);
                      setSelectedChapter(directNavigation.chapter);
                      setSearchResults(null);
                    }
                  }
                }}
                className="px-2.5 py-1 rounded-lg bg-[#F7F3EB] hover:bg-[#E8E2D5] border border-[#E8E2D5] text-[#57534E] hover:text-[#2C2A29] transition-all"
              >
                {kw}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results Display (if any) */}
        {searchResults && (
          <div className="bg-[#F7F3EB] p-6 rounded-3xl border border-[#E8E2D5] space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-3">
              <h3 className="font-serif-kr font-bold text-base text-[#2C2A29] flex items-center gap-2">
                <Search className="w-4 h-4 text-[#7A1C2C]" />
                검색 결과 ({searchResults.length}건)
              </h3>
              <button
                onClick={() => setSearchResults(null)}
                className="text-xs text-[#78716C] hover:text-[#2C2A29]"
              >
                검색 닫기 ✕
              </button>
            </div>

            {searchResults.length === 0 ? (
              <p className="text-xs text-[#78716C] py-4 text-center">
                일치하는 검색 결과가 없습니다.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.map((v, idx) => (
                  <div key={idx} className="bg-[#FDFBF7] p-4 rounded-2xl border border-[#E8E2D5] space-y-2 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs text-[#7A1C2C] font-bold">
                        <span>{v.book} {v.chapter}:{v.verse}</span>
                        {v.category && (
                          <span className="bg-[#7A1C2C]/10 px-2 py-0.5 rounded text-[10px]">
                            {v.category}
                          </span>
                        )}
                      </div>
                      <p className="font-serif-kr text-xs sm:text-sm text-[#2C2A29] leading-relaxed">
                        "{v.text}"
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E8E2D5] flex items-center justify-between text-xs">
                      <button
                        onClick={() => {
                          const b = BIBLE_BOOKS.find(book => book.name === v.book);
                          if (b) {
                            setSelectedBook(b);
                            setSelectedTestament(b.testament);
                            setSelectedChapter(v.chapter);
                            setSelectedVerse(v);
                            setSearchResults(null);
                            document.getElementById('bible-reading-section')?.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="text-[#57534E] hover:text-[#2C2A29] font-medium"
                      >
                        이 장 전체 읽기 ➔
                      </button>

                      <Link
                        href={`/debate?topic=${encodeURIComponent(`${v.book} ${v.chapter}:${v.verse} 말씀에 관한 신학적 탐구`)}`}
                        className="text-[#7A1C2C] font-bold hover:underline flex items-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3" />
                        토론에 활용
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Feature Separation Tabs */}
        <div className="flex border-b border-[#E8E2D5] gap-4">
          <button
            onClick={() => setActiveTab('reader')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'reader'
                ? 'border-[#7A1C2C] text-[#7A1C2C]'
                : 'border-transparent text-[#78716C] hover:text-[#2C2A29]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            성경 66권 전체 본문 읽기
          </button>

          <button
            onClick={() => setActiveTab('doctrine')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'doctrine'
                ? 'border-[#7A1C2C] text-[#7A1C2C]'
                : 'border-transparent text-[#78716C] hover:text-[#2C2A29]'
            }`}
          >
            <ScrollText className="w-4 h-4" />
            주요 교리별 추천 구절
          </button>
        </div>

        {/* TAB 1: 성경 66권 전체 본문 읽기 (Complete Chapter Verses Reader) */}
        {activeTab === 'reader' && (
          <div id="bible-reading-section" className="bg-[#F7F3EB] rounded-3xl border border-[#E8E2D5] p-6 sm:p-8 space-y-8 animate-fadeIn">
            
            {/* 1. Testament & Category Filter */}
            <div className="border-b border-[#E8E2D5] pb-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-serif-kr text-xl font-bold text-[#2C2A29]">
                    성경책 선택
                  </span>
                  <span className="text-xs text-[#78716C]">
                    (선택: {selectedBook.name} {selectedChapter}장)
                  </span>
                </div>

                {/* Testament Switch */}
                <div className="flex bg-[#E8E2D5] p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTestament('OT');
                      setSelectedCategory('전체');
                      const firstOt = BIBLE_BOOKS.find(b => b.testament === 'OT')!;
                      setSelectedBook(firstOt);
                      setSelectedChapter(1);
                    }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedTestament === 'OT'
                        ? 'bg-[#7A1C2C] text-white shadow-xs'
                        : 'text-[#57534E] hover:text-[#2C2A29]'
                    }`}
                  >
                    구약 39권
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedTestament('NT');
                      setSelectedCategory('전체');
                      const firstNt = BIBLE_BOOKS.find(b => b.testament === 'NT')!;
                      setSelectedBook(firstNt);
                      setSelectedChapter(1);
                    }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedTestament === 'NT'
                        ? 'bg-[#7A1C2C] text-white shadow-xs'
                        : 'text-[#57534E] hover:text-[#2C2A29]'
                    }`}
                  >
                    신약 27권
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('전체')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === '전체'
                      ? 'bg-[#2C2A29] text-white'
                      : 'bg-[#FDFBF7] text-[#57534E] border border-[#D9D2C5]'
                  }`}
                >
                  전체
                </button>
                {(selectedTestament === 'OT' ? CATEGORIES_OT : CATEGORIES_NT).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#7A1C2C] text-white shadow-xs'
                        : 'bg-[#FDFBF7] text-[#57534E] border border-[#D9D2C5] hover:border-[#7A1C2C]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Book Selector Matrix */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {filteredBooks.map((book) => (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => handleSelectBook(book)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    selectedBook.id === book.id
                      ? 'bg-[#7A1C2C] text-white border-[#58121E] font-bold shadow-sm scale-102'
                      : 'bg-[#FDFBF7] text-[#2C2A29] border-[#E8E2D5] hover:border-[#7A1C2C]'
                  }`}
                >
                  <span className="text-xs sm:text-sm block truncate">{book.name}</span>
                  <span className={`text-[10px] block mt-0.5 ${
                    selectedBook.id === book.id ? 'text-white/80' : 'text-[#78716C]'
                  }`}>
                    {book.chaptersCount}장
                  </span>
                </button>
              ))}
            </div>

            {/* 3. Chapter Selector Numbers */}
            <div className="space-y-2 pt-2 border-t border-[#E8E2D5]">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#78716C]">
                  {selectedBook.name} 장(Chapter) 선택 (총 {selectedBook.chaptersCount}장):
                </label>
                <span className="text-xs font-bold text-[#7A1C2C]">
                  현재 {selectedBook.name} {selectedChapter}장 열람 중
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-1">
                {Array.from({ length: selectedBook.chaptersCount }, (_, i) => i + 1).map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    onClick={() => {
                      setSelectedChapter(ch);
                      setSelectedVerse(null);
                    }}
                    className={`w-9 h-9 rounded-xl text-xs font-bold border flex items-center justify-center transition-all ${
                      selectedChapter === ch
                        ? 'bg-[#7A1C2C] text-white border-[#58121E] shadow-sm'
                        : 'bg-[#FDFBF7] text-[#44403C] border-[#E8E2D5] hover:border-[#7A1C2C]'
                    }`}
                  >
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Complete Chapter Verses Feed (1절부터 마지막 절까지 빠짐없이 렌더링) */}
            <div className="space-y-4 pt-4 border-t border-[#E8E2D5]">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-kr text-xl font-bold text-[#2C2A29] flex items-center gap-2">
                  <ScrollText className="w-5 h-5 text-[#7A1C2C]" />
                  {selectedBook.name} {selectedChapter}장 (총 {chapterVerses.length}절 전체 본문)
                </h3>
                <span className="text-xs text-[#78716C]">개역한글 공인 성경 전문</span>
              </div>

              {isLoadingChapter ? (
                <div className="py-16 flex flex-col items-center justify-center space-y-3 text-[#78716C]">
                  <Loader2 className="w-8 h-8 animate-spin text-[#7A1C2C]" />
                  <p className="text-xs font-medium">
                    {selectedBook.name} {selectedChapter}장의 모든 절을 불러오는 중입니다...
                  </p>
                </div>
              ) : (
                <div className="space-y-3 bg-[#FDFBF7] p-5 sm:p-7 rounded-2xl border border-[#E8E2D5] shadow-xs">
                  {/* Complete Verses Mapping without slice or filter */}
                  {chapterVerses.map((v) => (
                    <div
                      key={`${v.book}-${v.chapter}-${v.verse}`}
                      onClick={() => setSelectedVerse(v)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex gap-3 ${
                        selectedVerse?.verse === v.verse
                          ? 'bg-[#F7F3EB] border-[#7A1C2C] shadow-xs'
                          : 'border-transparent hover:bg-[#F7F3EB]/70'
                      }`}
                    >
                      <span className="font-bold text-xs text-[#7A1C2C] w-7 flex-shrink-0 pt-0.5 select-none">
                        {v.verse}절
                      </span>
                      <p className="font-serif-kr text-xs sm:text-sm text-[#2C2A29] leading-relaxed flex-1">
                        {v.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Selected Verse Detail Banner & AI Debate Action */}
              {selectedVerse && (
                <div className="bg-[#2C2A29] text-[#FDFBF7] p-5 sm:p-6 rounded-2xl shadow-md space-y-3 animate-fadeIn">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#7A1C2C] text-white">
                        선택된 구절
                      </span>
                      <h4 className="font-serif-kr font-bold text-base text-white">
                        {selectedVerse.book} {selectedVerse.chapter}:{selectedVerse.verse}
                      </h4>
                    </div>

                    <Link
                      href={`/debate?topic=${encodeURIComponent(`${selectedVerse.book} ${selectedVerse.chapter}:${selectedVerse.verse} ("${selectedVerse.text.slice(0, 35)}...")에 관한 신학적 의미와 교파별 해석`)}`}
                      className="px-4 py-2 rounded-xl bg-[#7A1C2C] text-white font-bold text-xs hover:bg-[#9B2C3E] transition-all flex items-center gap-1.5 border border-[#58121E] shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      이 구절로 AI 토론 시작하기
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <p className="font-serif-kr text-sm text-[#D6D3D1] italic pl-3 border-l-2 border-[#7A1C2C]">
                    "{selectedVerse.text}"
                  </p>
                </div>
              )}

            </div>

          </div>
        )}

        {/* TAB 2: 주요 교리별 추천 구절 (Separate Curated Section) */}
        {activeTab === 'doctrine' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="font-serif-kr text-xl font-bold text-[#2C2A29]">
                주요 신학 교리별 핵심 구절
              </h2>
              <span className="text-xs text-[#78716C]">카드를 클릭하면 해당 장 전체 본문으로 이동합니다.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctrineVerses.map((v, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleSelectDoctrinal(v)}
                  className="bg-[#F7F3EB] p-6 rounded-2xl border border-[#E8E2D5] space-y-3 flex flex-col justify-between hover:border-[#7A1C2C]/60 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#7A1C2C] font-bold mb-2">
                      <span className="flex items-center gap-1">
                        <Bookmark className="w-3.5 h-3.5" /> {v.reference}
                      </span>
                      <span className="bg-[#7A1C2C]/10 px-2 py-0.5 rounded text-[10px]">
                        {v.topic}
                      </span>
                    </div>
                    <p className="font-serif-kr text-xs sm:text-sm text-[#2C2A29] leading-relaxed italic border-l-2 border-[#7A1C2C] pl-3 py-1 group-hover:text-[#7A1C2C] transition-colors">
                      "{v.text}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E8E2D5] flex items-center justify-between text-xs">
                    <span className="text-[#78716C] group-hover:text-[#2C2A29]">해당 장 전체 읽기 ➔</span>
                    <Link
                      href={`/debate?topic=${encodeURIComponent(`${v.reference} (${v.topic}) 말씀 토론`)}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#7A1C2C] font-bold hover:underline flex items-center gap-1"
                    >
                      토론에 활용 <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <footer className="py-8 bg-[#FDFBF7] text-center text-xs text-[#78716C] border-t border-[#E8E2D5]">
        <p>© 2026 THEOLOGIA. All rights reserved. 성경 66권 전체 본문 탐구 시스템.</p>
      </footer>
    </div>
  );
}

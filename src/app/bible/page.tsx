import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { BookOpen, Search, Sparkles, ScrollText, ArrowRight } from 'lucide-react';

export default function BiblePage() {
  const bibleVerses = [
    { reference: '로마서 8:28', text: '우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라', topic: '하나님의 주권과 고난' },
    { reference: '에베소서 2:8-9', text: '너희는 그 은혜에 의하여 믿음으로 말미암아 구원을 받았으니 이것은 너희에게서 난 것이 아니요 하나님의 선물이라 행위에서 난 것이 아니니 이는 누구든지 자랑하지 못하게 함이라', topic: '이신칭의' },
    { reference: '요한복음 1:1', text: '태초에 말씀이 계시니라 이 말씀이 하나님과 함께 계셨으니 이 말씀은 곧 하나님이시니라', topic: '기독론 / 삼위일체' },
    { reference: '창세기 1:1', text: '태초에 하나님이 천지를 창조하시니라', topic: '창조론' },
    { reference: '야고보서 2:17', text: '이와 같이 행함이 없는 믿음은 그 자체가 죽은 것이라', topic: '행함과 믿음' },
    { reference: '빌립보서 2:13', text: '너희 안에서 행하시는 이는 하나님이시니 자기의 기뻐하시는 뜻을 위하여 너희에게 소원을 두고 행하게 하시나니', topic: '자유의지와 은혜' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7A1C2C]/10 border border-[#7A1C2C]/20 text-[#7A1C2C] text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Exegesis & Scripture Explorer</span>
          </div>
          <h1 className="font-serif-kr text-3xl sm:text-4xl font-bold text-[#2C2A29]">
            성경 탐구 및 교리 구절
          </h1>
          <p className="text-[#57534E] text-base leading-relaxed">
            AI 토론 시 엄밀하게 인용되는 주요 성경 구절과 신학적 원어 배경을 탐구합니다. 자의적인 환각 없이 원문 텍스트 맥락을 지킵니다.
          </p>
        </div>

        {/* Search Bar Placeholder */}
        <div className="mb-10 max-w-2xl">
          <div className="relative">
            <Search className="w-5 h-5 text-[#78716C] absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="성경 장절 또는 신학 키워드 검색 (예: 로마서, 은혜, 예정)..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-[#F7F3EB] border border-[#E8E2D5] focus:outline-none focus:border-[#7A1C2C] text-sm text-[#2C2A29]"
            />
          </div>
        </div>

        {/* Grid of Key Verses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bibleVerses.map((v, idx) => (
            <div key={idx} className="bg-[#F7F3EB] p-6 rounded-2xl border border-[#E8E2D5] space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-[#7A1C2C] font-semibold mb-2">
                  <span className="flex items-center gap-1">
                    <ScrollText className="w-3.5 h-3.5" /> {v.reference}
                  </span>
                  <span className="bg-[#7A1C2C]/10 px-2 py-0.5 rounded text-[10px]">
                    {v.topic}
                  </span>
                </div>
                <p className="font-serif-kr text-sm text-[#2C2A29] leading-relaxed italic border-l-2 border-[#7A1C2C] pl-3 py-1">
                  "{v.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between text-xs">
                <span className="text-[#78716C]">개역개정 / 원문 대조 가능</span>
                <Link
                  href={`/debate?topic=${encodeURIComponent(`${v.reference} 관련 성경 구절 토론`)}`}
                  className="text-[#7A1C2C] font-semibold hover:underline flex items-center gap-1"
                >
                  토론에 활용 <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-8 bg-[#FDFBF7] text-center text-xs text-[#78716C] border-t border-[#E8E2D5]">
        <p>© 2026 THEOLOGIA. All rights reserved.</p>
      </footer>
    </div>
  );
}

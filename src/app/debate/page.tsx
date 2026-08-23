'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { 
  PERSPECTIVES, 
  DIFFICULTIES, 
  DEFAULT_TOPICS, 
  AI_ROLES,
  PerspectiveType, 
  DifficultyLevel, 
  AiRoleType,
  DebateMessage,
  SavedDebateSession 
} from '@/lib/data';
import { BibleReferenceItem, TheologicalSourceItem } from '@/lib/bible/references';
import { DebateApiResponse } from '@/lib/debateService';
import { 
  Send, 
  RotateCcw, 
  BookOpen, 
  Settings, 
  Sparkles, 
  User, 
  Bot, 
  Check, 
  BookMarked,
  Edit3,
  Flame,
  Scale,
  ShieldCheck,
  Layers,
  StopCircle,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Library
} from 'lucide-react';

interface ExtendedDebateMessage extends Omit<DebateMessage, 'citationVerses'> {
  citationVerses?: BibleReferenceItem[];
  theologicalSources?: TheologicalSourceItem[];
  detectedFallacy?: string;
}

const CURRENT_DEBATE_STORAGE_KEY = 'theologia_active_debate';
const HISTORY_DEBATES_STORAGE_KEY = 'theologia_debates';

function DebateContent() {
  const searchParams = useSearchParams();
  const initialTopicQuery = searchParams.get('topic');

  // 1. Topic State
  const [topicInput, setTopicInput] = useState(
    initialTopicQuery || '인간에게 자유의지가 있는가?'
  );

  // 2. User Position
  const [userPosition, setUserPosition] = useState(
    '인간에게는 복음을 받아들이거나 거부할 수 있는 인격적 자유의지가 부여되어 있다'
  );

  // 3. AI Role
  const [aiRole, setAiRole] = useState<AiRoleType>('반론');
  const [customAiRoleText, setCustomAiRoleText] = useState(
    '역사적 신학 공의회의 정통 문헌을 인용하며 사용자 주장의 전제를 집요하게 파고들어 질문하라'
  );

  // 4. Theological Perspective & Difficulty
  const [perspective, setPerspective] = useState<PerspectiveType>('개혁주의');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('일반');

  // Debate State
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(true);

  // 5. Debate Messages
  const [messages, setMessages] = useState<ExtendedDebateMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveBannerVisible, setSaveBannerVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load ongoing debate or restore from localStorage on refresh
  useEffect(() => {
    try {
      if (initialTopicQuery) {
        setTopicInput(initialTopicQuery);
        const historyRaw = localStorage.getItem(HISTORY_DEBATES_STORAGE_KEY);
        if (historyRaw) {
          const histories: SavedDebateSession[] = JSON.parse(historyRaw);
          const matched = histories.find(h => h.topicTitle === initialTopicQuery);
          if (matched && matched.messages.length > 0) {
            setTopicInput(matched.topicTitle);
            setUserPosition(matched.userPosition);
            setAiRole(matched.aiRole);
            if (matched.customAiRoleText) setCustomAiRoleText(matched.customAiRoleText);
            setPerspective(matched.perspective);
            setDifficulty(matched.difficulty);
            setMessages(matched.messages as ExtendedDebateMessage[]);
            setIsStarted(true);
            setIsFinished(matched.isFinished || false);
            setIsConfigOpen(false);
            return;
          }
        }
      }

      const savedActiveRaw = localStorage.getItem(CURRENT_DEBATE_STORAGE_KEY);
      if (savedActiveRaw) {
        const saved: SavedDebateSession = JSON.parse(savedActiveRaw);
        if (saved && saved.messages && saved.messages.length > 0) {
          setTopicInput(saved.topicTitle);
          setUserPosition(saved.userPosition);
          setAiRole(saved.aiRole);
          if (saved.customAiRoleText) setCustomAiRoleText(saved.customAiRoleText);
          setPerspective(saved.perspective);
          setDifficulty(saved.difficulty);
          setMessages(saved.messages as ExtendedDebateMessage[]);
          setIsStarted(true);
          setIsFinished(saved.isFinished || false);
          setIsConfigOpen(false);
        }
      }
    } catch (e) {
      console.error('Failed to load cached active debate:', e);
    }
  }, [initialTopicQuery]);

  // Sync to localStorage
  useEffect(() => {
    if (isStarted && messages.length > 0) {
      const activeSession: SavedDebateSession = {
        id: `debate-${topicInput.replace(/\s+/g, '-').slice(0, 30)}`,
        topicTitle: topicInput,
        userPosition,
        aiRole,
        customAiRoleText: aiRole === '직접지정' ? customAiRoleText : undefined,
        perspective,
        difficulty,
        date: new Date().toLocaleDateString('ko-KR'),
        createdAt: Date.now(),
        messageCount: messages.length,
        lastSummary: messages.filter(m => m.sender === 'ai').slice(-1)[0]?.content.slice(0, 90) + '...',
        messages: messages as any,
        isFinished
      };

      try {
        localStorage.setItem(CURRENT_DEBATE_STORAGE_KEY, JSON.stringify(activeSession));
        const historyRaw = localStorage.getItem(HISTORY_DEBATES_STORAGE_KEY);
        const histories: SavedDebateSession[] = historyRaw ? JSON.parse(historyRaw) : [];
        const existingIndex = histories.findIndex(h => h.topicTitle === topicInput);

        if (existingIndex >= 0) {
          histories[existingIndex] = activeSession;
        } else {
          histories.unshift(activeSession);
        }
        localStorage.setItem(HISTORY_DEBATES_STORAGE_KEY, JSON.stringify(histories));
      } catch (e) {
        console.error('Failed to auto-save to localStorage:', e);
      }
    }
  }, [messages, isStarted, isFinished, topicInput, userPosition, aiRole, customAiRoleText, perspective, difficulty]);

  const handleSelectRecommendation = (t: typeof DEFAULT_TOPICS[0]) => {
    setTopicInput(t.title);
    setUserPosition(`${t.title}에 대해 긍정적인 근거를 바탕으로 입론합니다`);
  };

  const handleStartDebate = async () => {
    setIsStarted(true);
    setIsFinished(false);
    setIsConfigOpen(false);
    setIsGenerating(true);

    try {
      const res = await fetch('/api/debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicInput,
          userPosition,
          aiRole,
          customAiRoleDescription: aiRole === '직접지정' ? customAiRoleText : undefined,
          theologyTradition: perspective,
          difficulty,
          messages: [
            { sender: 'user', content: `[토론 개시] 사용자 기본 입장: ${userPosition}. 토론을 시작해주십시오.` }
          ]
        })
      });

      if (!res.ok) throw new Error('토론 API 호출 실패');
      const data: DebateApiResponse = await res.json();

      const initialAiMsg: ExtendedDebateMessage = {
        id: Date.now().toString(),
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: data.content,
        detectedFallacy: data.detectedFallacy,
        perspectiveNotes: data.perspectiveNotes || `${perspective} | AI 역할: ${aiRole} | 난이도: ${difficulty}`,
        citationVerses: data.citationVerses,
        theologicalSources: data.theologicalSources,
        doctrinalBasis: data.doctrinalBasis,
        counterArguments: data.counterArguments
      };

      setMessages([initialAiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isGenerating || isFinished) return;

    const userMsg: ExtendedDebateMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputMessage('');
    setIsGenerating(true);

    try {
      const res = await fetch('/api/debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicInput,
          userPosition,
          aiRole,
          customAiRoleDescription: aiRole === '직접지정' ? customAiRoleText : undefined,
          theologyTradition: perspective,
          difficulty,
          messages: newMessages.map(m => ({
            sender: m.sender,
            content: m.content
          }))
        })
      });

      if (!res.ok) throw new Error('토론 API 호출 실패');
      const data: DebateApiResponse = await res.json();

      const aiMsg: ExtendedDebateMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: data.content,
        detectedFallacy: data.detectedFallacy,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citationVerses: data.citationVerses,
        theologicalSources: data.theologicalSources,
        perspectiveNotes: data.perspectiveNotes || `${perspective} 관점 | AI 역할: ${aiRole} | ${difficulty}`,
        doctrinalBasis: data.doctrinalBasis,
        counterArguments: data.counterArguments
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFinishDebate = () => {
    setIsFinished(true);
    setSaveBannerVisible(true);
    setTimeout(() => setSaveBannerVisible(false), 4000);
  };

  const handleStartNewDebate = () => {
    localStorage.removeItem(CURRENT_DEBATE_STORAGE_KEY);
    setMessages([]);
    setIsStarted(false);
    setIsFinished(false);
    setIsConfigOpen(true);
    setTopicInput('인간에게 자유의지가 있는가?');
    setUserPosition('인간에게는 복음을 받아들이거나 거부할 수 있는 인격적 자유의지가 부여되어 있다');
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
      
      {/* Left Side: Debate Configuration Settings */}
      <div className={`w-full md:w-80 lg:w-[380px] flex-shrink-0 space-y-6 ${isConfigOpen ? 'block' : 'hidden md:block'}`}>
        <div className="bg-[#F7F3EB] rounded-2xl p-5 border border-[#E8E2D5] shadow-sm space-y-5">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-3">
            <h2 className="font-serif-kr font-bold text-lg text-[#2C2A29] flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#7A1C2C]" />
              AI 토론 조건 설정
            </h2>
            <button
              onClick={handleStartNewDebate}
              className="text-[11px] bg-[#E8E2D5] hover:bg-[#D9D2C5] text-[#2C2A29] px-2.5 py-1 rounded-md font-semibold transition-colors flex items-center gap-1"
              title="조건 초기화"
            >
              <RotateCcw className="w-3 h-3" />
              새 토론
            </button>
          </div>

          {/* 1. Free Topic Direct Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#2C2A29] flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-[#7A1C2C]" />
                토론 주제 직접 입력
              </label>
              <span className="text-[10px] text-[#7A1C2C] font-semibold">자유 입력</span>
            </div>
            
            <textarea
              rows={2}
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="예: 지옥이라는 개념은 성경적인가? 아담과 하와의 타락 원인은?..."
              className="w-full text-xs p-3 rounded-xl bg-[#FDFBF7] border border-[#D9D2C5] focus:outline-none focus:border-[#7A1C2C] text-[#2C2A29] font-medium leading-relaxed resize-none shadow-inner"
            />

            {/* Quick Recommendation Chips */}
            <div className="space-y-1 pt-1">
              <span className="text-[11px] text-[#78716C] font-medium flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#7A1C2C]" /> 추천 주제 (클릭 시 자동 적용):
              </span>
              <div className="flex flex-wrap gap-1">
                {DEFAULT_TOPICS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleSelectRecommendation(t)}
                    className={`text-[10px] px-2 py-1 rounded-md border text-left transition-all line-clamp-1 ${
                      topicInput === t.title
                        ? 'bg-[#7A1C2C] text-white border-[#58121E] font-medium'
                        : 'bg-[#FDFBF7] text-[#57534E] border-[#D9D2C5] hover:border-[#7A1C2C]'
                    }`}
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. User Position Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#2C2A29] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#7A1C2C]" />
              사용자 입장 입력
            </label>
            <textarea
              rows={2}
              value={userPosition}
              onChange={(e) => setUserPosition(e.target.value)}
              className="w-full text-xs p-3 rounded-xl bg-[#FDFBF7] border border-[#D9D2C5] focus:outline-none focus:border-[#7A1C2C] text-[#2C2A29] resize-none leading-relaxed"
              placeholder="자신의 신학적 주장과 전제 논지를 구체적으로 입력하세요"
            />
          </div>

          {/* 3. AI Role Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#2C2A29] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-[#7A1C2C]" />
                AI 역할 선택
              </span>
              <span className="text-[10px] text-[#78716C]">5가지 모드</span>
            </label>

            <div className="grid grid-cols-1 gap-1.5">
              {AI_ROLES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setAiRole(r.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    aiRole === r.id
                      ? 'bg-[#7A1C2C] text-[#FDFBF7] border-[#58121E] shadow-sm'
                      : 'bg-[#FDFBF7] text-[#44403C] border-[#D9D2C5] hover:border-[#7A1C2C]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{r.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      aiRole === r.id ? 'bg-white/20 text-white' : 'bg-[#E8E2D5] text-[#57534E]'
                    }`}>
                      {r.badge}
                    </span>
                  </div>
                  <p className={`text-[11px] mt-1 line-clamp-2 leading-tight ${
                    aiRole === r.id ? 'text-[#FDFBF7]/90' : 'text-[#78716C]'
                  }`}>
                    {r.description}
                  </p>
                </button>
              ))}
            </div>

            {aiRole === '직접지정' && (
              <div className="pt-2 space-y-1">
                <label className="text-[11px] font-semibold text-[#7A1C2C]">
                  직접 지정할 AI 프롬프트/역할:
                </label>
                <textarea
                  rows={2}
                  value={customAiRoleText}
                  onChange={(e) => setCustomAiRoleText(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg bg-[#FDFBF7] border border-[#7A1C2C] text-[#2C2A29] focus:outline-none"
                  placeholder="예: 초대 교부 문헌을 집중 인용하며 칼빈주의 관점에서 반론하라"
                />
              </div>
            )}
          </div>

          {/* 4. Theological Perspective Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#2C2A29] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7A1C2C]" />
                신학적 관점 선택
              </span>
              <span className="text-[10px] text-[#78716C]">8대 교파 전통</span>
            </label>

            <div className="grid grid-cols-2 gap-1.5">
              {PERSPECTIVES.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setPerspective(p.name)}
                  className={`px-2.5 py-2 text-xs rounded-lg border text-left transition-all flex items-center justify-between ${
                    perspective === p.name
                      ? 'bg-[#7A1C2C] text-[#FDFBF7] border-[#58121E] font-medium shadow-sm'
                      : 'bg-[#FDFBF7] text-[#44403C] border-[#D9D2C5] hover:border-[#7A1C2C]'
                  }`}
                >
                  <span>{p.name}</span>
                  {perspective === p.name && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-[#78716C] pt-1 leading-tight">
              💡 {PERSPECTIVES.find(p => p.name === perspective)?.description}
            </p>
          </div>

          {/* 5. Difficulty Level Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#2C2A29] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#7A1C2C]" />
                토론 난이도
              </span>
              <span className="text-[10px] text-[#78716C]">3단계 수준</span>
            </label>

            <div className="grid grid-cols-3 gap-1.5">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.level}
                  type="button"
                  onClick={() => setDifficulty(d.level)}
                  className={`py-2 text-xs text-center rounded-lg border transition-all ${
                    difficulty === d.level
                      ? 'bg-[#7A1C2C] text-[#FDFBF7] border-[#58121E] font-bold shadow-sm'
                      : 'bg-[#FDFBF7] text-[#44403C] border-[#D9D2C5] hover:border-[#7A1C2C]'
                  }`}
                >
                  {d.level}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-[#78716C] leading-tight">
              {DIFFICULTIES.find(d => d.level === difficulty)?.description}
            </p>
          </div>

          {/* Start Debate CTA */}
          <button
            onClick={handleStartDebate}
            disabled={isGenerating}
            className="w-full py-3.5 rounded-xl bg-[#7A1C2C] text-[#FDFBF7] font-bold text-sm hover:bg-[#9B2C3E] disabled:opacity-50 transition-all shadow-md hover:shadow-lg border border-[#58121E] flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            이 조건으로 AI 토론 시작하기
          </button>
        </div>
      </div>

      {/* Right Side: Main Debate Room */}
      <div className="flex-1 flex flex-col bg-[#FDFBF7] rounded-2xl border border-[#E8E2D5] shadow-sm overflow-hidden min-h-[650px]">
        
        {/* 1. Header Information Bar */}
        <div className="bg-[#F7F3EB] px-6 py-4 border-b border-[#E8E2D5] space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#7A1C2C] text-white shadow-xs">
                {perspective} 관점
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-[#2C2A29] text-white">
                역할: {AI_ROLES.find(r => r.id === aiRole)?.name}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#E8E2D5] text-[#44403C]">
                난이도: {difficulty}
              </span>
              {isFinished && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-800 text-white">
                  토론 종료됨
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleStartNewDebate}
                className="px-3 py-1.5 rounded-lg bg-[#FDFBF7] hover:bg-[#E8E2D5] border border-[#D9D2C5] text-[#2C2A29] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                title="현재 토론을 종료하고 새로운 조건으로 시작"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#7A1C2C]" />
                <span>새 토론</span>
              </button>
              <button
                onClick={() => setIsConfigOpen(!isConfigOpen)}
                className="md:hidden px-3 py-1.5 rounded-lg bg-[#E8E2D5] text-[#2C2A29] text-xs font-semibold"
              >
                설정
              </button>
            </div>
          </div>

          <h1 className="font-serif-kr font-bold text-xl sm:text-2xl text-[#2C2A29] tracking-tight">
            {topicInput || '자유 신학 토론 주제'}
          </h1>

          <div className="pt-2 border-t border-[#E8E2D5]/70 flex items-center gap-2 text-xs text-[#57534E]">
            <span className="font-bold text-[#2C2A29] bg-[#E8E2D5] px-2 py-0.5 rounded">사용자 입장:</span>
            <span className="font-medium text-[#2C2A29] truncate">{userPosition}</span>
          </div>
        </div>

        {/* Save Banner Toast */}
        {saveBannerVisible && (
          <div className="bg-[#7A1C2C] text-[#FDFBF7] px-4 py-2 text-xs text-center flex items-center justify-center gap-1.5 animate-fadeIn font-medium">
            <CheckCircle2 className="w-4 h-4" />
            토론이 안전하게 브라우저 저장소에 기록되었습니다. (언제든지 내 토론 기록에서 확인 가능)
          </div>
        )}

        {/* 2. Messages Feed with Steel-manning, Fallacy Feedback, & Rich Scripture Cards */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[500px]">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#F7F3EB] flex items-center justify-center text-[#7A1C2C] border border-[#E8E2D5] shadow-inner">
                <BookMarked className="w-7 h-7" />
              </div>
              <div className="space-y-1.5 max-w-md">
                <h3 className="font-serif-kr font-bold text-lg text-[#2C2A29]">
                  지적 토론실이 준비되었습니다
                </h3>
                <p className="text-xs text-[#78716C] leading-relaxed">
                  주제: <span className="font-bold text-[#2C2A29]">"{topicInput}"</span><br />
                  AI가 사용자의 논증을 엄밀히 분석하여 핵심 인정, 성경적·교리적 반론, 정중한 질문으로 지적 토론을 전개합니다.
                </p>
              </div>
              <button
                onClick={handleStartDebate}
                className="px-6 py-3 rounded-xl bg-[#7A1C2C] text-[#FDFBF7] font-bold text-xs hover:bg-[#9B2C3E] transition-all shadow border border-[#58121E]"
              >
                토론 개시 및 첫 질문 받기
              </button>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#2C2A29] text-white'
                    : 'bg-[#7A1C2C] text-[#FDFBF7] border border-[#58121E]'
                }`}>
                  {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>

                {/* Bubble Container */}
                <div className={`max-w-[90%] sm:max-w-[82%] space-y-2.5 ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}>
                  {/* Header Info */}
                  <div className="flex items-center gap-2 text-[11px] text-[#78716C]">
                    <span className="font-bold text-[#2C2A29]">
                      {msg.sender === 'user' ? '사용자 (입론)' : `THEOLOGIA AI (${perspective} / ${AI_ROLES.find(r => r.id === aiRole)?.name})`}
                    </span>
                    <span>• {msg.timestamp}</span>
                  </div>

                  {/* Detected Logical Fallacy Box (if any) */}
                  {msg.detectedFallacy && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2 shadow-xs">
                      <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="font-bold text-[11px] block">논리적 점검 제안:</span>
                        <span className="text-[11px] leading-relaxed">{msg.detectedFallacy}</span>
                      </div>
                    </div>
                  )}

                  {/* Content Box */}
                  <div className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line border shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#7A1C2C] text-[#FDFBF7] border-[#58121E] rounded-tr-none'
                      : 'bg-[#F7F3EB] text-[#2C2A29] border-[#E8E2D5] rounded-tl-none font-serif-kr'
                  }`}>
                    {msg.content}
                  </div>

                  {/* Rich Scripture Reference Cards, Denominational Views & Sources */}
                  {msg.sender === 'ai' && (msg.citationVerses || msg.theologicalSources || msg.counterArguments || msg.doctrinalBasis) && (
                    <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E8E2D5] space-y-3.5 text-xs text-[#44403C] shadow-sm">
                      
                      {/* 1. Scripture Groundings with Denominational Perspective Breakdown */}
                      {msg.citationVerses && msg.citationVerses.length > 0 && (
                        <div className="space-y-2.5">
                          <div className="font-bold text-[#7A1C2C] flex items-center gap-1.5 text-xs border-b border-[#E8E2D5] pb-1.5">
                            <BookOpen className="w-4 h-4 text-[#7A1C2C]" />
                            <span>성경 근거 및 장절 위치</span>
                          </div>

                          <div className="space-y-2">
                            {msg.citationVerses.map((v, i) => (
                              <div key={i} className="p-3 rounded-xl bg-[#F7F3EB]/80 border border-[#E8E2D5] space-y-1.5">
                                
                                {/* Badge: Scripture Location */}
                                <div className="flex items-center justify-between">
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#7A1C2C]/10 text-[#7A1C2C] font-bold text-xs border border-[#7A1C2C]/20">
                                    📖 {v.reference}
                                  </span>
                                </div>

                                {/* Text if verified */}
                                {v.text && (
                                  <p className="font-serif-kr text-[11px] text-[#2C2A29] italic bg-[#FDFBF7] p-2 rounded-lg border border-[#E8E2D5]">
                                    "{v.text}"
                                  </p>
                                )}

                                {/* Context Relation */}
                                {v.contextExplanation && (
                                  <p className="text-[11px] text-[#57534E] leading-relaxed pt-0.5">
                                    <span className="font-semibold text-[#2C2A29]">📌 논쟁 관계:</span> {v.contextExplanation}
                                  </p>
                                )}

                                {/* Denominational Multi-Interpretation Views */}
                                {v.denominationalViews && v.denominationalViews.length > 0 && (
                                  <div className="pt-2 border-t border-[#E8E2D5] space-y-1">
                                    <span className="text-[10px] font-bold text-[#78716C] block uppercase tracking-wider">
                                      교파별 해석 차이:
                                    </span>
                                    <div className="grid grid-cols-1 gap-1">
                                      {v.denominationalViews.map((d, dIdx) => (
                                        <div key={dIdx} className="text-[11px] pl-2 border-l-2 border-[#7A1C2C]/40 text-[#44403C]">
                                          <span className="font-bold text-[#7A1C2C]">[{d.tradition}]</span> {d.interpretation}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 2. Scholarly Sources & Historic Confessions */}
                      {msg.theologicalSources && msg.theologicalSources.length > 0 && (
                        <div className="space-y-2 pt-1 border-t border-[#E8E2D5]">
                          <div className="font-bold text-[#2C2A29] flex items-center gap-1.5 text-xs">
                            <Library className="w-3.5 h-3.5 text-[#7A1C2C]" />
                            <span>출처 및 교회사적 문헌</span>
                          </div>
                          <div className="space-y-1.5">
                            {msg.theologicalSources.map((s, sIdx) => (
                              <div key={sIdx} className="text-[11px] bg-[#F7F3EB] p-2.5 rounded-lg border border-[#E8E2D5] space-y-0.5">
                                <div className="font-bold text-[#7A1C2C]">
                                  • {s.authorOrDocument} — <span className="italic text-[#2C2A29]">{s.workTitle}</span>
                                </div>
                                <div className="text-[#57534E] text-[11px] leading-relaxed">
                                  {s.summary}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 3. Doctrinal Basis & Key Counters */}
                      {msg.doctrinalBasis && (
                        <div className="text-[11px] font-semibold text-[#78716C] flex items-center gap-1 pt-1 border-t border-[#E8E2D5]">
                          <Scale className="w-3.5 h-3.5 text-[#7A1C2C]" />
                          교리적 토대: <span className="text-[#2C2A29] font-medium">{msg.doctrinalBasis}</span>
                        </div>
                      )}

                    </div>
                  )}

                </div>
              </div>
            ))
          )}

          {isGenerating && (
            <div className="flex items-center gap-3 text-xs text-[#78716C] italic font-serif-kr bg-[#F7F3EB] p-3 rounded-xl border border-[#E8E2D5] w-fit">
              <Bot className="w-4 h-4 text-[#7A1C2C] animate-pulse" />
              AI가 사용자의 논증을 분석하여 성경적·논리적 반론을 구성하고 있습니다...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 3. Bottom Controls */}
        <div className="p-4 bg-[#F7F3EB] border-t border-[#E8E2D5] space-y-3">
          {isFinished ? (
            <div className="p-4 rounded-xl bg-[#FDFBF7] border border-[#E8E2D5] text-center space-y-2">
              <p className="text-xs font-semibold text-[#2C2A29]">
                🎉 본 토론이 종료되었습니다. 브라우저 기록에 자동 보관되었습니다.
              </p>
              <div className="flex justify-center gap-3 pt-1">
                <button
                  onClick={() => setIsFinished(false)}
                  className="px-4 py-2 rounded-lg bg-[#E8E2D5] text-[#2C2A29] text-xs font-semibold hover:bg-[#D9D2C5] transition-colors"
                >
                  토론 계속 이어하기
                </button>
                <button
                  onClick={handleStartNewDebate}
                  className="px-4 py-2 rounded-lg bg-[#7A1C2C] text-[#FDFBF7] text-xs font-semibold hover:bg-[#9B2C3E] transition-colors flex items-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  새 토론 시작하기
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`[${perspective} / ${AI_ROLES.find(r => r.id === aiRole)?.name}] 논리적 반론이나 성경적 근거를 입력하세요...`}
                  className="flex-1 px-4 py-3.5 rounded-xl bg-[#FDFBF7] border border-[#D9D2C5] focus:outline-none focus:border-[#7A1C2C] text-xs sm:text-sm text-[#2C2A29] placeholder-[#A8A29E]"
                />
                <button
                  type="submit"
                  disabled={isGenerating || !inputMessage.trim()}
                  className="px-6 py-3.5 rounded-xl bg-[#7A1C2C] text-[#FDFBF7] hover:bg-[#9B2C3E] disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-[#58121E] flex items-center justify-center font-bold text-xs gap-1.5 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  전송
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#78716C] pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#7A1C2C]" />
                  주장 분석 • 논리적 반론 • 지적 토론 프로토콜
                </span>
                
                {messages.length > 0 && (
                  <button
                    type="button"
                    onClick={handleFinishDebate}
                    className="text-[#7A1C2C] hover:text-[#9B2C3E] font-semibold flex items-center gap-1 hover:underline"
                  >
                    <StopCircle className="w-3.5 h-3.5" />
                    토론 종료
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

export default function DebatePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      <Navbar />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center text-sm text-[#78716C]">
          토론실을 구성하는 중입니다...
        </div>
      }>
        <DebateContent />
      </Suspense>
    </div>
  );
}

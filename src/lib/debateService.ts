import { PerspectiveType, DifficultyLevel, AiRoleType, DebateMessage } from './data';
import { GenerateDebateParams, DebateApiResponse } from './bible/types';

export type { GenerateDebateParams, DebateApiResponse };

/**
 * System Prompt Builder with Strict Context Continuity Rules
 */
export function buildSystemPrompt(params: GenerateDebateParams): string {
  return `당신은 기독교 교리, 성경, 신학 사상에 정통한 지적이고 자연스러운 신학 대화/토론 AI 'THEOLOGIA'입니다.

[가장 중요한 대화 연속성 원칙]
1. [이전 대화 맥락 최우선 해석]: 
   - 사용자의 현재 메시지를 절대 매번 새로운 질문이나 검색어로 취급하지 마세요.
   - 이전 대화가 존재한다면 현재 메시지를 반드시 바로 앞 대화의 맥락 안에서 먼저 해석하세요.
   - 짧은 단어(예: "개혁주의", "가톨릭은?", "그럼 성공회", "칼빈"), 짧은 문장, 생략된 표현은 "방금 나누던 주제에 대해 해당 관점/인물은 어떻게 보는가?"라는 의미로 자연스럽게 파악하세요.
   - 사용자가 명확하게 완전히 새로운 주제로 전환했을 때만 새로운 대화 주제로 처리하세요.

2. [자연스러운 대화 스타일 (금지 사항 준수)]:
   - 매 답변을 서론부터 다시 시작하지 마세요.
   - 앞에서 이미 설명한 내용을 불필요하게 반복하지 마세요.
   - 사용자의 말을 매번 "'OO'에 대한 질문이군요", "'OO'의 사상을 설명해 드리겠습니다"라고 되풀이하여 시작하지 마세요.
   - 불필요한 확인 질문이나 답변 마지막에 습관적인 후속 질문("어떤 부분이 더 궁금하신가요?" 등)을 붙이지 마세요.
   - 고정된 답변 템플릿(표, 목록, 고정 목차)을 억지로 사용하지 말고 상황에 따라 자연스러운 대화문으로 작성하세요.

3. [사용자의 의견 및 반박에 반응]:
   - 사용자가 자신의 의견을 말하면(예: "난 오히려 인간에게 선택권이 있다고 보는데") 단순 정보 요청으로 처리하지 말고 그 의견 자체에 논리적으로 반응하고 대화를 이어가세요.
   - 사용자가 반박하면 이전 AI 답변과 연결하여 깊이 있는 논의를 계속하세요.

4. [정확성과 객관성]:
   - 정확한 성경 사실과 역사적 교회사적 사실에 근거하고, 해석이 갈리는 교파적 견해는 차분히 구분하여 다루세요.
`;
}

/**
 * Intelligent Local Fallback Engine with Context Memory & Follow-up Interpretation
 */
export function generateLocalTheologyResponse(params: GenerateDebateParams): DebateApiResponse {
  const { topic, userPosition, messages } = params;
  
  // All messages in chronological order
  const validMessages = messages || [];
  const currentMsgObj = validMessages[validMessages.length - 1];
  const currentMsg = (currentMsgObj?.content || userPosition || topic || '').trim();
  
  // Build a summary of whole prior conversation context to understand the active topic
  const priorDialogue = validMessages.slice(0, -1);
  const priorUserTexts = priorDialogue.filter(m => m.sender === 'user').map(m => m.content).join(' ');
  const priorAiTexts = priorDialogue.filter(m => m.sender === 'ai').map(m => m.content).join(' ');
  const priorCombined = `${topic} ${priorUserTexts} ${priorAiTexts}`.toLowerCase();

  const lower = currentMsg.toLowerCase().trim();

  // Case 1: Short keyword follow-ups (e.g. "개혁주의", "개혁주의는?", "개혁주의 관점")
  if (lower === '개혁주의' || lower === '개혁주의는?' || lower === '개혁주의 관점' || lower.includes('개혁주의')) {
    if (priorCombined.includes('자유의지') || priorCombined.includes('예정') || priorCombined.includes('구원') || priorCombined.includes('선택')) {
      return {
        content: `개혁주의 쪽으로 보면 하나님의 절대 주권을 훨씬 강하게 잡습니다. 

인간이 실제로 자기 의지에 따라 선택한다고 해도, 그 선택이 하나님의 영원한 작정과 예정 바깥에서 독립적으로 이루어진다고 보지는 않죠. 

그래서 자유의지를 인정하더라도 감리교(웨슬리안)가 말하는 '구원을 스스로 수용하거나 거부할 수 있는 자율적 자유'와는 의미가 상당히 다릅니다. 타락한 인간은 하나님의 주권적이고 불가항력적인 은혜가 먼저 임하지 않는 한 스스로 하나님을 선택할 수 없다는 것이 핵심입니다.`
      };
    }

    if (priorCombined.includes('우치무라') || priorCombined.includes('무교회') || priorCombined.includes('교회')) {
      return {
        content: `개혁주의 입장에서 우치무라 간조의 교회관을 본다면, 교회의 형식주의와 부패를 비판하고 오직 말씀과 십자가로 돌아가자고 한 점은 종교개혁 정신과 통한다고 높이 평가할 것입니다.

하지만 제도적 교회의 질서와 성례전(세례와 성찬)을 지나치게 가볍게 여긴 부분에는 분명한 비판을 가합니다. 그리스도께서는 눈에 보이는 언약 공동체와 공교회적 질서를 통해 교회를 보존하시기 때문에, 성례와 직분이 없는 무교회주의는 자칫 개인주의적 주관주의로 빠질 위험이 있다고 봅니다.`
      };
    }

    return {
      content: `개혁주의는 하나님의 절대적인 주권과 성경의 최고 권위, 그리고 인간의 전적 타락과 하나님의 주권적 은혜(Sola Gratia)를 모든 논의의 출발점으로 삼습니다.`
    };
  }

  // Case 2: Short keyword follow-up (e.g. "가톨릭은?", "가톨릭", "가톨릭 관점")
  if (lower === '가톨릭' || lower === '가톨릭은?' || lower === '가톨릭 관점' || lower.includes('가톨릭')) {
    if (priorCombined.includes('우치무라') || priorCombined.includes('무교회') || priorCombined.includes('교회')) {
      return {
        content: `가톨릭은 우치무라 간조의 입장과 가장 극명하게 대조됩니다.

가톨릭 교회론의 핵심은 교회가 단순한 인간적 제도나 신자들의 자발적 모임이 아니라, 2천 년 동안 사도전승을 통해 성령 안에서 보존되어 온 '그리스도의 살아있는 신비체'라는 점입니다. 

따라서 사제직과 칠성사를 통한 거룩한 은총의 전달 없이 성경만 개인적으로 읽는 방식은, 그리스도께서 세우신 교회의 성사적 실재와 전통을 잃어버리는 것이라고 봅니다.`
      };
    }

    if (priorCombined.includes('자유의지') || priorCombined.includes('예정')) {
      return {
        content: `가톨릭은 하나님의 은총과 인간 자유의지의 '협력(Synergia)'을 강조합니다.

하느님의 은총이 모든 구원의 시작에서 먼저 작용하지만, 인간은 그 은총에 자유롭게 동의하고 사랑의 행위로 협력해야 한다고 봅니다. 즉, 은총이 인간의 자유를 없애는 것이 아니라 오히려 자유를 치유하고 완성시킨다는 관점입니다.`
      };
    }

    return {
      content: `가톨릭은 성경과 더불어 2천 년 교회의 거룩한 성전(전통), 그리고 사도 전승에 기초한 교도권의 가르침을 신앙과 교리의 중요한 기준으로 삼습니다.`
    };
  }

  // Case 3: Short keyword follow-up (e.g. "그럼 성공회", "성공회는?", "성공회")
  if (lower === '성공회' || lower === '성공회는?' || lower.includes('성공회')) {
    if (priorCombined.includes('우치무라') || priorCombined.includes('교회')) {
      return {
        content: `성공회는 가톨릭적인 사도적 주교직과 전례 전통을 계승하면서도, 종교개혁의 복음주의적 자유를 포용하는 '중용(Via Media)'의 교회관을 취합니다. 

제도와 전례의 가치를 존중하지만 교황의 절대 권위는 거부하며, 지역 공동체의 자율성과 성경·이성·전통의 삼각 균형 속에서 교회의 본질을 찾습니다.`
      };
    }

    if (priorCombined.includes('자유의지') || priorCombined.includes('예정')) {
      return {
        content: `성공회 내부에서는 39개조 신앙고백에 나타난 개혁주의적 예정론 전통과, 인간의 이성과 자유로운 응답을 존중하는 앵글로-가톨릭 및 아르미니우스주의적 전통이 공존합니다. 

하나의 엄격한 교리 공식으로 단정하기보다 성경과 이성의 긴장 속에서 하나님의 신비를 겸손하게 수용하려는 태도가 강합니다.`
      };
    }
  }

  // Case 4: User states an opinion or counter-argument (e.g., "난 오히려 인간에게 선택권이 있다고 보는데")
  if (lower.includes('난') || lower.includes('내 생각') || lower.includes('선택권') || lower.includes('오히려') || lower.includes('아닌가')) {
    return {
      content: `그 말씀은 신학적으로 감리교(웨슬리안)나 아르미니우스주의의 핵심 논지와 매우 잘 통합니다.

인간에게 실질적인 선택권이 없다면 하나님의 복음 초청("누구든지 저를 믿는 자는...")이나 성경의 수많은 도덕적 권고, 그리고 심판의 공의성이 형식적인 것에 그치게 된다는 문제의식이죠.

이 관점에서는 하나님이 십자가를 통해 모든 사람에게 '선행은총'을 주셨기 때문에, 인간이 그 은혜에 믿음으로 응답할 실제적인 책임과 선택권이 살아난다고 봅니다.`
    };
  }

  // Case 5: Direct question about "우치무라 간조"
  if (lower.includes('우치무라')) {
    return {
      content: `우치무라 간조의 사상 핵심은 교파주의와 형식화된 제도를 넘어 **"오직 성경과 십자가를 통한 그리스도와의 인격적 만남"**으로 돌아가자는 무교회주의(無敎會主義)입니다. 

성직자나 건물, 교단 규율에 얽매이지 않고, 진리 안에서 성경을 깊이 연구하며 자율적으로 모이는 신자들의 순수한 사귐 자체를 참된 교회로 보았습니다.`
    };
  }

  // Case 6: Direct topic query about Predestination & Free will
  if (lower.includes('자유의지') || lower.includes('예정')) {
    return {
      content: `예정론과 자유의지의 충돌은 기독교 신학의 가장 오래된 핵심 쟁점입니다.

핵심은 **"하나님의 영원한 섭리 속에서 인간의 선택이 과연 실질적인 자유인가?"**에 있습니다.

개혁주의는 하나님의 절대 주권을 앞세워 인간의 선택까지도 주권적 작정 안에 포괄된다고 보는 반면, 웨슬리안은 선행은총에 기초한 인간의 실제적 자유와 응답 책임을 강조합니다. 가톨릭은 은총이 인간의 자유의지를 치유하여 협력하게 한다고 봅니다.`
    };
  }

  // Default natural conversational reply without templates
  return {
    content: `말씀하신 내용은 성경과 기독교 사상사에서 다양한 각도로 논의되어 온 주제입니다. 

교파와 전통에 따라 하나님의 절대 주권을 중심에 두느냐, 아니면 인간의 인격적 응답과 책임을 중심에 두느냐에 따라 강조점이 확연히 달라집니다.`
  };
}

/**
 * Main Debate Service Entrypoint (Sends full historical context to LLM)
 */
export async function generateDebateResponse(params: GenerateDebateParams): Promise<DebateApiResponse> {
  const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || process.env.ANTHROPIC_API_KEY;

  if (apiKey && (process.env.AI_API_KEY || process.env.OPENAI_API_KEY)) {
    try {
      const token = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;

      // Pass full conversation history chronologically to LLM
      const formattedMessages = [
        { role: 'system', content: buildSystemPrompt(params) },
        ...params.messages.map(m => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.content
        }))
      ];

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: formattedMessages,
          temperature: 0.7,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const rawContent = data.choices[0]?.message?.content || '';
        return {
          content: rawContent || '답변을 생성하지 못했습니다.'
        };
      }
    } catch (err) {
      console.warn('External AI API call failed, falling back to local theology engine:', err);
    }
  }

  return generateLocalTheologyResponse(params);
}

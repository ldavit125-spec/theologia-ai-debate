import { NextRequest, NextResponse } from 'next/server';
import { generateDebateResponse, GenerateDebateParams } from '@/lib/debateService';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateDebateParams;

    if (!body.topic || !body.theologyTradition || !body.aiRole) {
      return NextResponse.json(
        { error: '필수 토론 파라미터(topic, theologyTradition, aiRole)가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const response = await generateDebateResponse(body);
    return NextResponse.json(response);
  } catch (error) {
    console.error('Debate API Error:', error);
    return NextResponse.json(
      { error: 'AI 토론 응답을 생성하는 도중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

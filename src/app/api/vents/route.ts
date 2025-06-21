import {supabase} from '@/lib/supabase';
import {NextRequest, NextResponse} from 'next/server';

// GET: Fetch all vents
export async function GET() {
  const { data, error } = await supabase
    .from('vents')
    .select('*')
    .order('created_at', { ascending: false });

  if(!data) {
    console.info("data could not be fetched for vents");
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// POST: Create a new vent
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { content, category, duration } = body;

  if (!content || !category || !duration) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('vents')
    .insert([{ content, category, duration }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
} 
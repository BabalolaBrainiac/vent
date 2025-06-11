import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch all comments for a vent
export async function GET(req: NextRequest, { params }: { params: { vent_id: string } }) {
  const { vent_id } = params;
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('vent_id', vent_id)
    .order('created_at', { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
} 
import { supabase } from '@/lib/supabase'

interface GetLastNotesParams {
  userId: string
}

export async function getLastNotes({ userId }: GetLastNotesParams) {
  const { data } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(5)

  return data
}

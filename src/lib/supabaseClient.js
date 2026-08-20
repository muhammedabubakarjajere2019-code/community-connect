import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ozjveppzfcbrapycwlag.supabase.co'
const supabaseAnonKey = 'sb_publishable_eyhc9tBQuFrwsdEbL1OmBQ_EpdBzNcp'

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    }
  }
)
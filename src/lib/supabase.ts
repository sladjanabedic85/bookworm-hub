import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

// User's own Supabase project (publishable key is safe in browser code).
const SUPABASE_URL = "https://hxbbrqaaimewtvpekbhb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_F38yuJIkQQGJz0Zzx4Pfhw_ppqpYkys";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  },
});

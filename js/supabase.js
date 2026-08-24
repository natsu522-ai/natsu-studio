import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

export const SUPABASE_URL='https://gbtdymoadpcxuxpezzmo.supabase.co';

export const SUPABASE_PUBLISHABLE_KEY='sb_publishable_daoLBriXMvXxFDTbvolHPg_hOQ-vza4';

export const supabase=createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth:{
      persistSession:true,
      autoRefreshToken:true,
      detectSessionInUrl:true
    }
  }
);

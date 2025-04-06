import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mmusqtxfdzznxuygimpv.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tdXNxdHhmZHp6bnh1eWdpbXB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4MDc1NzksImV4cCI6MjA1OTM4MzU3OX0._mXLXyUIiRAjlC8BrCNUS02zeRJKveYh6vprgR-KvRw';

export const supabase = createClient(supabaseUrl, supabaseKey);

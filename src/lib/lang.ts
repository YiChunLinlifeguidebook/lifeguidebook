export type SiteLang = 'zh-TW' | 'en';

export const DEFAULT_LANG: SiteLang = 'zh-TW';
export const LANG_COOKIE = 'lang';

export function normalizeLang(input: string | undefined | null): SiteLang {
  const v = (input ?? '').toLowerCase();
  if (v === 'en' || v === 'en-us') return 'en';
  if (v === 'zh' || v === 'zh-tw' || v === 'zh-hant') return 'zh-TW';
  return DEFAULT_LANG;
}

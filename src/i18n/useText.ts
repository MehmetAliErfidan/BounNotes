import { useLang } from "./index";

export type LangObject = {
  tr: string;
  en: string;
};

export function useText(obj: LangObject): string {
  const { lang } = useLang();
  return obj[lang];
}

import { useState, useEffect } from "react";
import { translationNav } from "../Translations/navbarDict";

export default function useTranslate(text, lang) {
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    if (translationNav[lang] && translationNav[lang][text]) {
      setTranslated(translationNav[lang][text]);
    } else {
      setTranslated(text);
    }
  }, [text, lang]);

  return translated;
}

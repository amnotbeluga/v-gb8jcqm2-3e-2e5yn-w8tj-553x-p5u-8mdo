import { useState, useEffect } from "react";
import { translationLanding } from "../Translations/landingDict";

export default function useTranslate(text, lang) {
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    if (translationLanding[lang] && translationLanding[lang][text]) {
      setTranslated(translationLanding[lang][text]);
    } else {
      setTranslated(text);
    }
  }, [text, lang]);

  return translated;
}

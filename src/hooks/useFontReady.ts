import { useEffect, useState } from "react";

export function useFontReady(): boolean {
  const [fontReady, setFontReady] = useState(false);
  useEffect(() => {
    document.fonts.ready.then(() => setFontReady(true));
  }, []);
  return fontReady;
}

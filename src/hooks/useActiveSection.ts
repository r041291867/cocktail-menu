import { useEffect, useRef, useState } from "react";

export function useActiveSection(selector: string, deps: readonly unknown[]) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = document.querySelectorAll(`${selector}[id]`);
    const observer = new IntersectionObserver(
      (entries) => {
        const [topmost] = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (topmost) setActiveSection(topmost.target.id);
      },
      { rootMargin: "-10% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    if (sections.length > 0) setActiveSection(sections[0].id);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (!activeSection || !navRef.current) return;
    navRef.current
      .querySelector(`[data-nav-id="${activeSection}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [activeSection]);

  return { activeSection, navRef };
}

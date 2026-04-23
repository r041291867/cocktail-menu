import "./styles.scss";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const MIN_MOVEMENT = 80;

interface Props {
  children: ReactNode;
  onClose?: () => void;
  height?: string | number;
}

export default function Drawer({
  children,
  onClose = () => {},
  height,
}: Props) {
  const [closing, setClosing] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  function handleClose() {
    setClosing(true);
  }

  function handleAnimationEnd() {
    if (closing) onClose();
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartY.current = e.touches[0].clientY;
    if (drawerRef.current) {
      drawerRef.current.style.transition = "none";
    }
  }

  function handleTouchMove(e: React.TouchEvent) {
    if (touchStartY.current === null || !drawerRef.current) return;
    const delta = Math.max(0, e.touches[0].clientY - touchStartY.current);
    drawerRef.current.style.transform = `translateY(${delta}px)`;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartY.current === null || !drawerRef.current) return;
    const delta = e.changedTouches[0].clientY - touchStartY.current;
    drawerRef.current.style.transition = "";
    drawerRef.current.style.transform = "";
    if (delta > MIN_MOVEMENT) {
      handleClose();
    }
    touchStartY.current = null;
  }

  return (
    <div className="drawer-frame">
      <div
        className={`drawer-mask${closing ? " drawer-mask--closing" : ""}`}
        onClick={handleClose}
      />
      <div
        ref={drawerRef}
        className={`drawer-main${closing ? " drawer-main--closing" : ""}`}
        style={height !== undefined ? { height, maxHeight: height } : undefined}
        onAnimationEnd={handleAnimationEnd}
      >
        <div
          className="drawer-handle"
          onClick={handleClose}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
        {children}
      </div>
    </div>
  );
}

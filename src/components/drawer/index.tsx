import "./styles.scss";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const MIN_MOVEMENT = 60;
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
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartY.current === null) return;
    const delta = e.changedTouches[0].clientY - touchStartY.current;
    if (delta > MIN_MOVEMENT) handleClose();
    touchStartY.current = null;
  }

  return (
    <div className="drawer-frame">
      <div
        className={`drawer-mask${closing ? " drawer-mask--closing" : ""}`}
        onClick={handleClose}
      />
      <div
        className={`drawer-main${closing ? " drawer-main--closing" : ""}`}
        style={height !== undefined ? { height, maxHeight: height } : undefined}
        onAnimationEnd={handleAnimationEnd}
      >
        <div
          className="drawer-handle"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />
        {children}
      </div>
    </div>
  );
}

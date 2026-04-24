import "./styles.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { useBodyOverflowLock } from "@/hooks/useBodyOverflowLock";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClose?: () => void;
  height?: string | number;
}

const MIN_MOVEMENT = 80;

const lockDrag = (el: HTMLDivElement) => {
  el.style.transition = "none";
  el.style.animation = "none";
};

const applyDrag = (el: HTMLDivElement, startY: number, currentY: number) => {
  el.style.transform = `translateY(${Math.max(0, currentY - startY)}px)`;
};

const clearDrag = (el: HTMLDivElement) => {
  el.style.transition = "";
  el.style.transform = "";
  el.style.animation = "";
};

const toClassName = (...parts: (string | false)[]) =>
  parts.filter(Boolean).join(" ");

export default function Drawer({ children, onClose, height }: Props) {
  const [closing, setClosing] = useState(false);
  const touchStartY = useRef<number | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  useBodyOverflowLock();

  const handleClose = useCallback(() => setClosing(true), []);

  const handleAnimationEnd = useCallback(() => {
    if (closing) onClose?.();
  }, [closing, onClose]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    if (drawerRef.current) lockDrag(drawerRef.current);
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartY.current === null || !drawerRef.current) return;
      const delta = e.changedTouches[0].clientY - touchStartY.current;
      clearDrag(drawerRef.current);
      if (delta > MIN_MOVEMENT) handleClose();
      touchStartY.current = null;
    },
    [handleClose]
  );

  // 用 native listener + passive:false 讓 iOS 不攔截 touchmove
  useEffect(() => {
    const el = handleRef.current;
    if (!el) return;
    const onMove = (e: TouchEvent) => {
      if (touchStartY.current === null || !drawerRef.current) return;
      e.preventDefault();
      applyDrag(drawerRef.current, touchStartY.current, e.touches[0].clientY);
    };
    el.addEventListener("touchmove", onMove, { passive: false });
    return () => el.removeEventListener("touchmove", onMove);
  }, []);

  return (
    <div className="drawer-frame">
      <div
        className={toClassName("drawer-mask", closing && "drawer-mask--closing")}
        onClick={handleClose}
      />
      <div
        ref={drawerRef}
        className={toClassName("drawer-main", closing && "drawer-main--closing")}
        style={height !== undefined ? { height, maxHeight: height } : undefined}
        onAnimationEnd={handleAnimationEnd}
      >
        <div
          ref={handleRef}
          className="drawer-handle"
          onClick={handleClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        />
        {children}
      </div>
    </div>
  );
}

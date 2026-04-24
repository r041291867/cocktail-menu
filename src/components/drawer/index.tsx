import "./styles.scss";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useBodyOverflowLock } from "@/hooks/useBodyOverflowLock";
import type { ReactNode, RefObject } from "react";

interface Props {
  children: ReactNode;
  onClose?: () => void;
  height?: string | number;
}

const MIN_MOVEMENT = 80;

type StylePatch = { transition?: string; transform?: string; animation?: string };

const DRAG_LOCK: StylePatch = { transition: "none", animation: "none" };
const DRAG_CLEAR: StylePatch = { transition: "", transform: "", animation: "" };

const dragOffset = (startY: number, currentY: number): StylePatch => ({
  transform: `translateY(${Math.max(0, currentY - startY)}px)`,
});

const patchStyle = (el: HTMLElement, patch: StylePatch) =>
  Object.assign(el.style, patch);

const cx = (...parts: (string | false | undefined)[]) =>
  parts.filter(Boolean).join(" ");

function useDragToClose(
  drawerRef: RefObject<HTMLDivElement | null>,
  handleRef: RefObject<HTMLDivElement | null>,
  onClose: () => void
) {
  const startY = useRef<number | null>(null);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      startY.current = e.touches[0].clientY;
      if (drawerRef.current) patchStyle(drawerRef.current, DRAG_LOCK);
    },
    [drawerRef]
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (startY.current === null || !drawerRef.current) return;
      e.preventDefault();
      const delta = e.changedTouches[0].clientY - startY.current;
      patchStyle(drawerRef.current, DRAG_CLEAR);
      if (delta > MIN_MOVEMENT) onClose();
      startY.current = null;
    },
    [drawerRef, onClose]
  );

  // native listener + passive:false 讓 iOS 不攔截 touchmove
  useEffect(() => {
    const el = handleRef.current;
    if (!el) return;
    const onMove = (e: TouchEvent) => {
      if (startY.current === null || !drawerRef.current) return;
      e.preventDefault();
      patchStyle(drawerRef.current, dragOffset(startY.current, e.touches[0].clientY));
    };
    el.addEventListener("touchmove", onMove, { passive: false });
    return () => el.removeEventListener("touchmove", onMove);
  }, [drawerRef, handleRef]);

  return { onTouchStart, onTouchEnd };
}

export default function Drawer({ children, onClose, height }: Props) {
  const [closing, setClosing] = useState(false);
  const [opening, setOpening] = useState(true);
  const drawerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  useBodyOverflowLock();

  const handleClose = useCallback(() => setClosing(true), []);
  const handleMaskAnimationEnd = useCallback(() => setOpening(false), []);
  const handleMainAnimationEnd = useCallback(() => {
    if (closing) onClose?.();
  }, [closing, onClose]);

  const { onTouchStart, onTouchEnd } = useDragToClose(drawerRef, handleRef, handleClose);

  const heightStyle = useMemo(
    () => (height !== undefined ? { height, maxHeight: height } : undefined),
    [height]
  );

  return (
    <div className="drawer-frame">
      <div
        className={cx("drawer-mask", opening && "drawer-mask--opening", closing && "drawer-mask--closing")}
        onClick={handleClose}
        onAnimationEnd={handleMaskAnimationEnd}
      />
      <div
        ref={drawerRef}
        className={cx("drawer-main", opening && "drawer-main--opening", closing && "drawer-main--closing")}
        style={heightStyle}
        onAnimationEnd={handleMainAnimationEnd}
      >
        <div
          ref={handleRef}
          className="drawer-handle"
          onClick={handleClose}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
        {children}
      </div>
    </div>
  );
}

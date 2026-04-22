import "./styles.scss";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClose?: () => void;
  height?: string | number;
}

export default function Drawer({ children, onClose = () => {}, height }: Props) {
  const [closing, setClosing] = useState(false);

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
        <div className="drawer-handle" />
        {children}
      </div>
    </div>
  );
}

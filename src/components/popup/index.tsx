import "./styles.scss";
import { useEffect } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onCloseClick?: () => void;
  width?: string | number;
  height?: string | number;
}

export default function Popup({ children, onCloseClick = () => {}, width, height }: Props) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="popup-frame">
      <div className="popup-mask" onClick={onCloseClick}></div>
      <div className="popup-main" style={{ width, height }}>{children}</div>
    </div>
  );
}

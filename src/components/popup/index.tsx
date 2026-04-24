import "./styles.scss";
import type { ReactNode } from "react";
import { useBodyOverflowLock } from "@/hooks/useBodyOverflowLock";

interface Props {
  children: ReactNode;
  onCloseClick?: () => void;
  width?: string | number;
  height?: string | number;
}

export default function Popup({ children, onCloseClick = () => {}, width, height }: Props) {
  useBodyOverflowLock();

  return (
    <div className="popup-frame">
      <div className="popup-mask" onClick={onCloseClick}></div>
      <div className="popup-main" style={{ width, height }}>{children}</div>
    </div>
  );
}

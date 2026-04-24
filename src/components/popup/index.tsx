import "./styles.scss";
import type { ReactNode } from "react";
import { useBodyOverflowLock } from "@/hooks/useBodyOverflowLock";

interface Props {
  children: ReactNode;
  onCloseClick?: () => void;
  showClose?: boolean;
  width?: string | number;
  height?: string | number;
}

export default function Popup({
  children,
  onCloseClick = () => {},
  showClose = true,
  width,
  height,
}: Props) {
  useBodyOverflowLock();

  return (
    <div className="popup-frame">
      <div className="popup-mask" onClick={onCloseClick}></div>
      <div className="popup-container" style={{ width }}>
        {showClose && (
          <div className="popup-close close-btn" onClick={onCloseClick}>+</div>
        )}
        <div className="popup-main" style={{ height }}>
          {children}
        </div>
      </div>
    </div>
  );
}

import "./styles.scss";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  onCloseClick?: () => void;
}

export default function Popup({ children, onCloseClick = () => {} }: Props) {
  return (
    <div className="popup-frame">
      <div className="popup-mask" onClick={onCloseClick}></div>
      <div className="popup-main">{children}</div>
    </div>
  );
}

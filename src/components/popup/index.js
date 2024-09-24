import "./styles.css";

export default function Popup({ children, onCloseClick = () => {} }) {
  return (
    <div className="popup-frame">
      <div className="popup-mask" onClick={onCloseClick}></div>
      <div className="popup-main">
        {children}
      </div>
    </div>
  );
}

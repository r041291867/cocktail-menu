import "./styles.css";

export default function Popup({ onCloseClick = () => {} }) {
  return (
    <div className="popup__frame">
      <div className="popup__mask"></div>
      <div className="popup__main">
        <div
          className="popup__close"
          onClick={onCloseClick}
        ></div>

        <div className="popup__title">
          喜歡酸或甜?
        </div>

        <div className="popup__options">

        </div>
      </div>
    </div>
  );
}

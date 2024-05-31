import "./styles.css";

export default function ShotIcon({ width = 16, status = 1 }) {
  return (
    <div className="shot-icon__frame" style={{ width, height: width }}>
      <div className={`shot-icon status-${status}`}></div>
    </div>
  );
}

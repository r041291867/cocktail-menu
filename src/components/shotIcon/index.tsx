import "./styles.scss";

interface Props {
  width?: number;
  status?: "filled" | "half" | "empty";
}

export default function ShotIcon({ width = 16, status = "filled" }: Props) {
  return (
    <div className="shot-icon__frame" style={{ width, height: width }}>
      <div className={`shot-icon status-${status}`}></div>
    </div>
  );
}

import "./styles.css";

export default function Loading() {
  return (
    <div className="loading__frame">
      <div className="loading__mask"></div>
      <div className="loading__main"></div>
    </div>
  );
}

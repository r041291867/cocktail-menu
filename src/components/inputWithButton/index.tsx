interface Props {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export default function InputWithButton({ label, value, placeholder, onChange, onSubmit }: Props) {
  return (
    <div className="filter-input-frame">
      <div className="handwrite-ch">{label}</div>
      <input
        className="filter-input handwrite-ch"
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
      />
      <div
        style={{ fontWeight: "bold", userSelect: "none", cursor: "pointer" }}
        onClick={onSubmit}
      >
        +
      </div>
    </div>
  );
}

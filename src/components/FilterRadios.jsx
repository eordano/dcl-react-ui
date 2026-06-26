import "./filterradios.css";

export default function FilterRadios({ name, value, onChange, options = [] }) {
  return (
    <div className="filter-radios">
      {options.map((o) => (
        <label key={o.id} className="filter-radios__radio">
          <input
            type="radio"
            name={name}
            checked={value === o.id}
            onChange={() => onChange?.(o.id)}
          />
          <span className="filter-radios__mark" aria-hidden="true" />
          {o.label}
        </label>
      ))}
    </div>
  );
}

import { useMemo, useState } from "react";
import "./governanceform.css";

const charCounter = (current, limit) => `(${current} out of ${limit} characters)`;

const toOption = (o) => (typeof o === "object" && o !== null ? o : { value: o, label: o });

const isGroup = (e) => e && Array.isArray(e.fields) && !e.type;

const BackGlyph = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 3 5 8l5 5" />
  </svg>
);
const CaretGlyph = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 6l4 4 4-4" />
  </svg>
);
const CloseGlyph = ({ size = 14 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="none" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);
const SearchGlyph = () => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <circle cx="6.5" cy="6.5" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 10l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const PlusGlyph = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const CheckGlyph = ({ size = 12 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="none" aria-hidden="true">
    <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const OkBadge = () => (
  <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
    <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ErrorMark = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M8 4.6v4.2M8 11.2h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
const MdMark = ({ d, fill }) => (
  <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
    <path d={d} fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const MD_TOOLBAR = [
  { k: "bold", d: "M5 3h4.2a2.4 2.4 0 0 1 0 4.8H5zM5 7.8h4.8a2.6 2.6 0 0 1 0 5.2H5z" },
  { k: "italic", d: "M7 3h5M4 13h5M10 3 6 13" },
  { k: "link", d: "M6.5 9.5 9.5 6.5M7 11l-1.5 1.5a2.5 2.5 0 0 1-3.5-3.5L3.5 7.5M9 5l1.5-1.5a2.5 2.5 0 0 1 3.5 3.5L12.5 8.5" },
  { k: "list", d: "M6 4.5h7M6 8h7M6 11.5h7M3 4.5h.01M3 8h.01M3 11.5h.01" },
  { k: "quote", d: "M4 5h3v4H4zM9 5h3v4H9zM4 9c0 2-1 2.5-2 3M9 9c0 2-1 2.5-2 3" },
  { k: "code", d: "M6 4 2.5 8 6 12M10 4l3.5 4-3.5 4" },
];

function FieldLabel({ field }) {
  if (!field.label) return null;
  return (
    <span className="gvf__labelrow">
      <label className="gvf__label" htmlFor={field.id}>{field.label}</label>
      {field.markdown ? (
        <sup className="gvf__notice" title="You can format your proposal using markdown! Toggle the preview switch to see how your post will be displayed.">(markdown)</sup>
      ) : null}
      {field.optional ? <sup className="gvf__optional">(optional)</sup> : null}
    </span>
  );
}

function FieldMessage({ error, current, limit }) {
  if (!error && typeof limit !== "number") return null;
  return (
    <p className={"gvf__message" + (error ? " is-error" : "")}>
      {error ? <span className="gvf__msgerror">{error} </span> : null}
      {typeof limit === "number" ? charCounter(current, limit) : null}
    </p>
  );
}

function MarkdownField({ field, value, onChange, disabled }) {
  const [mode, setMode] = useState("edit");
  const showBarCounter = field.counterInBar && typeof field.maxLength === "number";
  return (
    <div className={"gvf__md" + (disabled ? " is-disabled" : "") + (field.tall ? " gvf__md--tall" : "")}>
      <div className="gvf__mdtoolbar" role="toolbar" aria-label="Markdown commands">
        <div className="gvf__mdcmds">
          {MD_TOOLBAR.map((c) => (
            <button key={c.k} type="button" className="gvf__mdcmd" aria-label={c.k} tabIndex={-1} disabled={disabled}>
              <MdMark d={c.d} fill={c.k === "bold"} />
            </button>
          ))}
        </div>
        <div className="gvf__mdright">
          {showBarCounter ? (
            <span className="gvf__mdcount">{charCounter((value || "").length, field.maxLength)}</span>
          ) : null}
          <button
            type="button"
            className="gvf__mdtoggle"
            onClick={() => setMode((m) => (m === "edit" ? "preview" : "edit"))}
            disabled={disabled}
            tabIndex={-1}
          >
            {mode === "edit" ? "Preview" : "Edit"}
          </button>
        </div>
      </div>
      {mode === "edit" ? (
        <textarea
          id={field.id}
          className="gvf__mdarea"
          value={value}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      ) : (
        <div className="gvf__mdpreview">{value || field.placeholder}</div>
      )}
    </div>
  );
}

function SelectField({ field, value, onChange, disabled }) {
  const options = (field.options || []).map(toOption);
  const ro = field.readOnly;
  return (
    <div className={"gvf__selectwrap" + (ro ? " is-disabled" : "")}>
      <select
        id={field.id}
        className="gvf__select"
        value={value}
        disabled={disabled || ro}
        aria-readonly={ro || undefined}
        onChange={(e) => onChange(e.target.value)}
      >
        {field.placeholder ? (
          <option value="" disabled>{field.placeholder}</option>
        ) : null}
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <span className="gvf__selectcaret"><CaretGlyph /></span>
    </div>
  );
}

function DropdownField({ field, value, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  const options = (field.options || []).map(toOption);
  const selected = options.find((o) => o.value === value);
  return (
    <div className="gvf__ddwrap">
      <button
        type="button"
        className={"gvf__dropdown" + (open ? " is-open" : "")}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={"gvf__ddtext" + (selected ? "" : " is-placeholder")}>
          {selected ? selected.label : field.placeholder || "Select"}
        </span>
        <span className="gvf__ddicon"><CaretGlyph /></span>
      </button>
      {open ? (
        <ul className="gvf__menu" role="listbox">
          {options.length === 0 ? (
            <li className="gvf__menuempty">{field.emptyText || "No options"}</li>
          ) : (
            options.map((o) => (
              <li key={o.value}>
                <button
                  type="button"
                  className={"gvf__option" + (o.value === value ? " is-selected" : "")}
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                >
                  {typeof o.hue === "number" ? (
                    <span className="u-avatar" style={{ "--sz": "22px", "--hue": o.hue }} aria-hidden="true" />
                  ) : null}
                  {o.label}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}

function RadioGroup({ field, value, onChange, disabled }) {
  const options = (field.options || []).map(toOption);
  return (
    <div className={"gvf__radios" + (field.inline ? " gvf__radios--inline" : "")}>
      {options.map((o) => (
        <label key={o.value} className="gvf__radio">
          <input
            type="radio"
            name={field.name}
            checked={value === o.value}
            disabled={disabled}
            onChange={() => onChange(o.value)}
          />
          <span className="gvf__radiomark" aria-hidden="true" />
          {o.label}
        </label>
      ))}
    </div>
  );
}

function PillsField({ field, value, onChange, disabled }) {
  const options = (field.options || []).map(toOption);
  return (
    <div className="gvf__pills">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={"gvf__pill" + (value === o.value ? " is-selected gvf__pill--" + o.value : "")}
          disabled={disabled}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function CheckboxField({ field, value, onChange, disabled }) {
  const options = field.options ? field.options.map(toOption) : null;
  if (options) {
    const set = new Set(Array.isArray(value) ? value : []);
    const toggle = (v) => {
      const next = new Set(set);
      next.has(v) ? next.delete(v) : next.add(v);
      onChange([...next]);
    };
    return (
      <div className="gvf__checks">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="checkbox"
            aria-checked={set.has(o.value)}
            className={"gvf__check" + (set.has(o.value) ? " is-checked" : "")}
            disabled={disabled}
            onClick={() => toggle(o.value)}
          >
            <span className="gvf__checkbox">{set.has(o.value) ? <CheckGlyph /> : null}</span>
            <span className="gvf__checktext">{o.label}</span>
          </button>
        ))}
      </div>
    );
  }
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={!!value}
      className={"gvf__check" + (value ? " is-checked" : "")}
      disabled={disabled}
      onClick={() => onChange(!value)}
    >
      <span className="gvf__checkbox">{value ? <CheckGlyph /> : null}</span>
      <span className="gvf__checktext">{field.checkboxLabel || field.label}</span>
    </button>
  );
}

function AddressField({ field, value, onChange, disabled }) {
  const chips = Array.isArray(value) ? value : [];
  return (
    <div className="gvf__addrfield">
      <div className={"gvf__addrselect" + (disabled ? " is-disabled" : "")}>
        {chips.map((c, i) => (
          <span className="gvf__coauthor" key={i}>
            {typeof c.hue === "number" ? (
              <span className="u-avatar" style={{ "--sz": "20px", "--hue": c.hue }} aria-hidden="true" />
            ) : null}
            {c.addr || c.name || c}
            <button
              type="button"
              className="gvf__coremove"
              aria-label="Remove address"
              disabled={disabled}
              onClick={() => onChange(chips.filter((_, idx) => idx !== i))}
            >
              <CloseGlyph size={12} />
            </button>
          </span>
        ))}
        {field.search ? <span className="gvf__addricon"><SearchGlyph /></span> : null}
        <input
          className="gvf__addrinput"
          type="text"
          placeholder={chips.length ? "" : field.placeholder}
          aria-label={field.label || "Address"}
          disabled={disabled}
        />
      </div>
      {field.note ? <p className="gvf__addrmsg">{field.note}</p> : null}
    </div>
  );
}

function ListField({ field, value, onChange, disabled }) {
  const rows = Array.isArray(value) && value.length ? value : [""];
  const max = field.max;
  const setRow = (i, v) => onChange(rows.map((r, idx) => (idx === i ? v : r)));
  const addRow = () => {
    if (max != null && rows.length >= max) return;
    onChange([...rows, ""]);
  };
  const removeRow = (i) => {
    const next = rows.filter((_, idx) => idx !== i);
    onChange(next.length ? next : [""]);
  };
  const canAdd = max == null || rows.length < max;
  return (
    <div className="gvf__list">
      {rows.map((r, i) => (
        <div key={i} className="gvf__listrow">
          <input
            className="gvf__input"
            type="text"
            placeholder={field.placeholder}
            value={r}
            disabled={disabled}
            onChange={(e) => setRow(i, e.target.value)}
          />
          <button
            type="button"
            className="gvf__listremove"
            aria-label="Remove"
            disabled={disabled}
            onClick={() => removeRow(i)}
          >
            <CloseGlyph size={13} />
          </button>
        </div>
      ))}
      {canAdd ? (
        <button type="button" className="gvf__listadd" disabled={disabled} onClick={addRow}>
          {field.addLabel || "Add another"}
        </button>
      ) : null}
    </div>
  );
}

function CoordsField({ field, value, onChange, disabled }) {
  const subs = field.fields || [
    { name: "x", placeholder: "-150 through 150" },
    { name: "y", placeholder: "-150 through 150" },
  ];
  const v = value || {};
  return (
    <div className="gvf__coords">
      {subs.map((s) => (
        <input
          key={s.name}
          className="gvf__coordinput"
          type="number"
          inputMode="numeric"
          min={s.min}
          max={s.max}
          placeholder={s.placeholder}
          aria-label={s.label || s.name}
          value={v[s.name] ?? ""}
          disabled={disabled}
          onChange={(e) => onChange({ ...v, [s.name]: e.target.value })}
        />
      ))}
      {field.error ? <div className="gvf__coorderror">{field.error}</div> : null}
    </div>
  );
}

function CoAuthorsField({ field, value, onChange, disabled }) {
  const chips = value || [];
  const max = field.max ?? 5;
  const addCoAuthor = () => {
    if (chips.length >= max) return;
    onChange([
      ...chips,
      {
        addr: "0x" + Math.random().toString(16).slice(2, 6) + "…" + Math.random().toString(16).slice(2, 6),
        hue: Math.floor(Math.random() * 360),
      },
    ]);
  };
  const removeCoAuthor = (i) => onChange(chips.filter((_, idx) => idx !== i));
  return (
    <div className="gvf__coauthors">
      {chips.map((c, i) => (
        <span className="gvf__coauthor" key={i}>
          <span className="u-avatar" style={{ "--sz": "22px", "--hue": c.hue }} aria-hidden="true" />
          {c.addr}
          <button type="button" className="gvf__coremove" aria-label="Remove co-author" disabled={disabled} onClick={() => removeCoAuthor(i)}>
            <CloseGlyph size={12} />
          </button>
        </span>
      ))}
      {chips.length < max ? (
        <button type="button" className="gvf__coadd" disabled={disabled} onClick={addCoAuthor}>
          {chips.length === 0 ? (field.placeholder || "Add co-authors") : "+ Add co-author"}
        </button>
      ) : null}
    </div>
  );
}

function FormField({ field, value, onChange, disabled }) {
  const fieldDisabled = disabled || field.disabled;
  const control = (() => {
    switch (field.type) {
      case "text":
      case "email":
        return (
          <input
            id={field.id}
            className="gvf__input"
            type={field.type === "email" ? "email" : "text"}
            placeholder={field.placeholder}
            value={value ?? ""}
            maxLength={field.maxLength}
            disabled={fieldDisabled}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case "number":
        if (field.stepper) {
          const num = Number(value || 0);
          const min = field.min ?? 0;
          const max = field.max ?? Infinity;
          return (
            <div className="gvf__stepper">
              <button
                type="button"
                className="gvf__stepbtn"
                aria-label="Decrease"
                disabled={fieldDisabled || num <= min}
                onClick={() => onChange(Math.max(min, num - 1))}
              >
                −
              </button>
              <span className="gvf__stepval">{num}{field.unitLabel ? " " + field.unitLabel : ""}</span>
              <button
                type="button"
                className="gvf__stepbtn"
                aria-label="Increase"
                disabled={fieldDisabled || num >= max}
                onClick={() => onChange(Math.min(max, num + 1))}
              >
                +
              </button>
            </div>
          );
        }
        return (
          <div className="gvf__numwrap">
            {field.unit ? <span className="gvf__numunit">{field.unit}</span> : null}
            <input
              id={field.id}
              className={"gvf__input" + (field.unit ? " gvf__input--unit" : "")}
              type="number"
              inputMode="numeric"
              placeholder={field.placeholder}
              value={value ?? ""}
              min={field.min}
              max={field.max}
              disabled={fieldDisabled}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        );
      case "textarea":
        return (
          <textarea
            id={field.id}
            className="gvf__textarea"
            placeholder={field.placeholder}
            value={value ?? ""}
            maxLength={field.maxLength}
            rows={field.rows || 5}
            disabled={fieldDisabled}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      case "markdown":
        return <MarkdownField field={field} value={value ?? ""} onChange={onChange} disabled={fieldDisabled} />;
      case "select":
      case "date":
        return <SelectField field={field} value={value ?? ""} onChange={onChange} disabled={fieldDisabled} />;
      case "dropdown":
        return <DropdownField field={field} value={value ?? ""} onChange={onChange} disabled={fieldDisabled} />;
      case "radio":
      case "token":
        return <RadioGroup field={field} value={value} onChange={onChange} disabled={fieldDisabled} />;
      case "pills":
        return <PillsField field={field} value={value} onChange={onChange} disabled={fieldDisabled} />;
      case "checkbox":
        return <CheckboxField field={field} value={value} onChange={onChange} disabled={fieldDisabled} />;
      case "address":
        return <AddressField field={field} value={value} onChange={onChange} disabled={fieldDisabled} />;
      case "list":
        return <ListField field={field} value={value} onChange={onChange} disabled={fieldDisabled} />;
      case "coords":
        return <CoordsField field={field} value={value} onChange={onChange} disabled={fieldDisabled} />;
      case "coauthors":
        return <CoAuthorsField field={field} value={value} onChange={onChange} disabled={fieldDisabled} />;
      case "status":
        return (
          <div className="gvf__status">
            {(field.lines || []).map((l, i) => (
              <span key={i} className={"gvf__statusline" + (l.error ? " is-error" : " is-ok")}>
                <span className="gvf__statusmark"><OkBadge /></span>
                {typeof l === "string" ? l : l.text}
              </span>
            ))}
          </div>
        );
      case "custom":
        return field.render ? field.render({ value, onChange, disabled: fieldDisabled, field }) : null;
      default:
        return null;
    }
  })();

  const stringLen = typeof value === "string" ? value.length : 0;
  const wantsCounter =
    field.counter !== false &&
    !field.counterInBar &&
    typeof field.maxLength === "number" &&
    (field.type === "text" || field.type === "email" || field.type === "textarea" || field.type === "markdown");

  const tooShort =
    typeof field.minLength === "number" &&
    typeof value === "string" &&
    value.length > 0 &&
    value.length < field.minLength;
  const error = field.error || (tooShort ? field.shortError || "This field is too short." : undefined);

  return (
    <section className={"gvf__section" + (fieldDisabled ? " is-disabled" : "") + (field.className ? " " + field.className : "")}>
      <FieldLabel field={field} />
      {field.sublabel ? <p className="gvf__sublabel">{field.sublabel}</p> : null}
      {control}
      {field.postlabel ? <p className="gvf__postlabel">{field.postlabel}</p> : null}
      {field.help ? <p className="gvf__help">{field.help}</p> : null}
      <FieldMessage
        error={error}
        current={stringLen}
        limit={wantsCounter ? field.maxLength : undefined}
      />
    </section>
  );
}

function SectionHeader({ number, title, isNew, validated }) {
  return (
    <div className="gvf__grouphead">
      <span className="gvf__groupicon" aria-hidden="true">
        {validated ? <span className="gvf__grouptick"><OkBadge /></span> : null}
        <span className="gvf__groupnum">{number}</span>
      </span>
      <span className="gvf__grouptitle">
        {title}
        {isNew ? <span className="gvf__newbadge">New</span> : null}
      </span>
      <span className="gvf__grouprule" aria-hidden="true" />
    </div>
  );
}

function defaultValue(field) {
  if ("value" in field) return field.value;
  switch (field.type) {
    case "coauthors":
    case "address":
      return [];
    case "list":
      return [""];
    case "coords":
      return {};
    case "checkbox":
      return field.options ? [] : false;
    case "number":
      return field.stepper ? field.min ?? 0 : "";
    case "radio":
    case "token":
    case "pills":
      return field.options?.length ? toOption(field.options[0]).value : "";
    default:
      return "";
  }
}

export default function SubmitProposalForm({
  title,
  subtitle,
  description,
  sections = [],
  numbered = false,
  backHref,
  onBack,
  showBack,
  submitLabel = "Submit proposal",
  secondaryLabel,
  onSecondary,
  submitDisabled = false,
  onSubmit,
  disabled = false,
  vpNotice,
  error,
  errorLabel = "There was an error.",
  errorCollapsible = false,
  values: controlledValues,
  onChange,
  className,
}) {
  const [errorOpen, setErrorOpen] = useState(false);

  const { groups, allFields } = useMemo(() => {
    let auto = 0;
    let idx = 0;
    const prep = (f) => {
      const name = f.name ?? "field_" + idx;
      const out = { ...f, name, id: f.id ?? "gvf-" + name };
      idx += 1;
      return out;
    };
    const gs = [];
    const flat = [];
    sections.forEach((entry) => {
      if (isGroup(entry)) {
        const fields = entry.fields.map(prep);
        flat.push(...fields);
        auto += 1;
        gs.push({ ...entry, number: entry.number ?? auto, fields });
      } else {
        const field = prep(entry);
        flat.push(field);
        gs.push({ field });
      }
    });
    return { groups: gs, allFields: flat };
  }, [sections]);

  const [localValues, setLocalValues] = useState(() => {
    const seed = {};
    allFields.forEach((f) => {
      seed[f.name] = defaultValue(f);
    });
    return seed;
  });

  const values = controlledValues ?? localValues;

  const setValue = (name, val) => {
    if (!controlledValues) {
      setLocalValues((v) => ({ ...v, [name]: val }));
    }
    onChange?.(name, val, { ...values, [name]: val });
  };

  const hasBack = showBack ?? (backHref != null || onBack != null);
  const hasAside = title != null || subtitle != null || description != null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (disabled || submitDisabled) return;
    onSubmit?.(values);
  };

  const renderField = (f) =>
    f.when && !f.when(values) ? null : (
      <FormField
        key={f.name}
        field={f}
        value={values[f.name]}
        onChange={(val) => setValue(f.name, val)}
        disabled={disabled}
      />
    );

  return (
    <div className={"gvf" + (hasBack ? " gvf--withback" : "") + (className ? " " + className : "")}>
      {hasBack ? (
        <div className="gvf__back">
          <a
            className="gvf__backbtn"
            href={backHref || undefined}
            role={backHref ? undefined : "button"}
            aria-label="Back"
            onClick={(e) => {
              if (onBack) {
                e.preventDefault();
                onBack();
              }
            }}
          >
            <BackGlyph />
          </a>
        </div>
      ) : null}

      <form className={"gvf__form" + (hasAside ? "" : " gvf__form--single")} onSubmit={handleSubmit}>
        {hasAside ? (
          <aside className="gvf__aside">
            {title ? (
              <section className="gvf__section gvf__section--title">
                <h1 className="gvf__h1">{title}</h1>
                {subtitle ? <p className="gvf__lead">{subtitle}</p> : null}
              </section>
            ) : null}

            {description != null ? (
              <section className="gvf__section gvf__section--intro">
                {Array.isArray(description)
                  ? description.map((p, i) => <p key={i} className="gvf__intro">{p}</p>)
                  : typeof description === "string"
                    ? <p className="gvf__intro">{description}</p>
                    : <div className="gvf__intro">{description}</div>}
              </section>
            ) : null}
          </aside>
        ) : null}

        <div className="gvf__main">
        {groups.map((g, gi) =>
          g.field ? (
            renderField(g.field)
          ) : (
            <section key={"grp-" + gi} className="gvf__group">
              <SectionHeader
                number={numbered || g.number != null ? g.number : gi + 1}
                title={g.section}
                isNew={g.isNew}
                validated={g.validated}
              />
              <div className="gvf__groupbody">{g.fields.map(renderField)}</div>
            </section>
          )
        )}

        <section className="gvf__section gvf__section--submit">
          <button type="submit" className="gvf__submit" disabled={disabled || submitDisabled}>
            {submitLabel}
          </button>
          {secondaryLabel ? (
            <button type="button" className="gvf__secondary" disabled={disabled} onClick={onSecondary}>
              {secondaryLabel}
            </button>
          ) : null}
        </section>

        {vpNotice ? (
          <section className="gvf__section">
            <p className="gvf__vpnotice">{vpNotice}</p>
          </section>
        ) : null}

        {error ? (
          <section className="gvf__section">
            <div className="gvf__error" role="alert">
              <span className="gvf__erroricon"><ErrorMark /></span>
              <div className="gvf__errorbody">
                <div className="gvf__errorhead">
                  <p className="gvf__errorlabel">{errorLabel}</p>
                  {errorCollapsible ? (
                    <button type="button" className="gvf__errortoggle" onClick={() => setErrorOpen((o) => !o)}>
                      {errorOpen ? "Hide" : "Show"}
                    </button>
                  ) : null}
                </div>
                {!errorCollapsible || errorOpen ? <p className="gvf__errormsg">{error}</p> : null}
              </div>
            </div>
          </section>
        ) : null}
        </div>
      </form>
    </div>
  );
}

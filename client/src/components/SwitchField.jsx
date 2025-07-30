import React from 'react'

export default function SwitchField({ name, options, selected, onChange }) {
  return (
    <div className="switch-field">
      {options.map((opt) => (
        <React.Fragment key={opt}>
          <input
            type="radio"
            id={`${name}-${opt}`}
            name={name}
            value={opt}
            checked={selected === opt}
            onChange={() => onChange(opt)}
          />
          <label htmlFor={`${name}-${opt}`}>{opt}</label>
        </React.Fragment>
      ))}
    </div>
  )
}

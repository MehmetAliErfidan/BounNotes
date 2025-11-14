interface RadioButtonProps {
  id: string;
  label: string;
  value: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function RadioButton({
  id,
  label,
  value,
  checked,
  onChange,
}: RadioButtonProps) {
  return (
    <label htmlFor={id} className="flex items-center cursor-pointer space-x-2">
      <input
        type="radio"
        id={id}
        name="category"
        value={value}
        checked={checked}
        onChange={onChange}
        className="mr-2 mb-1"
      />
      {label}
    </label>
  );
}

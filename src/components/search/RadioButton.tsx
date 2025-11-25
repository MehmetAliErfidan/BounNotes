import { StyledLabel, StyledInput } from "./!RadioButton.styled";

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
    <StyledLabel htmlFor={id}>
      <StyledInput
        type="radio"
        id={id}
        name="category"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </StyledLabel>
  );
}

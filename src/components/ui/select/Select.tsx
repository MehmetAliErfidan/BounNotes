import * as RadixSelect from "@radix-ui/react-select";
import * as S from "./Select.styled";

/* =======================
   GENERIC TYPE TANIMLARI
   ======================= */

type Option<T extends string> = {
  value: T;
  label: string;
};

type Props<T extends string> = {
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
  options: Option<T>[];
};

/* =======================
   COMPONENT
   ======================= */

export default function Select<T extends string>({
  value,
  onChange,
  placeholder,
  options,
}: Props<T>) {
  return (
    <RadixSelect.Root value={value} onValueChange={onChange}>
      <S.Trigger>
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>▾</RadixSelect.Icon>
      </S.Trigger>

      <S.Content position="popper" side="bottom" sideOffset={8} align="start">
        <RadixSelect.Viewport>
          {options.map((opt) => (
            <S.Item key={opt.value} value={opt.value}>
              <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
            </S.Item>
          ))}
        </RadixSelect.Viewport>
      </S.Content>
    </RadixSelect.Root>
  );
}

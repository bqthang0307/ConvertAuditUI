import { Input } from "../../../shared/ui/Input";

type Props = {
  values: { email: string; landingUrl: string };
  onChange: (patch: Partial<Props["values"]>) => void;
  errors?: Record<string, string>;
};

export default function StepThree({ values, onChange, errors = {} }: Props) {
  return (
    <div className="space-y-6">
      <Input
        label="Email"
        placeholder="john@gmail.com"
        hint="Helps us send you a magic link and a PDF export."
        value={values.email}
        onChange={(e) => onChange({ email: e.target.value })}
        error={errors.email}
      />
      <Input
        label="Landing page URL"
        placeholder="convertaudit.com"
        value={values.landingUrl}
        onChange={(e) => onChange({ landingUrl: e.target.value })}
        error={errors.landingUrl}
      />
    </div>
  );
}

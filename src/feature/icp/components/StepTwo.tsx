import { Textarea } from "../../../shared/ui/Input";

type Props = {
  values: { painPoint: string; uniqueValue: string };
  onChange: (patch: Partial<Props["values"]>) => void;
  errors?: Record<string, string>;
};

export default function StepTwo({ values, onChange, errors = {} }: Props) {
  return (
    <div className="space-y-6">
      <Textarea
        label="What problem or pain point are they facing?"
        placeholder="e.g. Wasting hours filtering candidates, Manual onboarding,…"
        hint="Makes sure the page clearly addresses their pain point."
        value={values.painPoint}
        onChange={(e) => onChange({ painPoint: e.target.value })}
        error={errors.painPoint}
      />
      <Textarea
        label="What makes your product different or valuable to this audience?"
        placeholder="e.g. AI filters candidates instantly, No‑code setup in 5 mins,…"
        hint="Check if your page clearly communicates your unique value."
        value={values.uniqueValue}
        onChange={(e) => onChange({ uniqueValue: e.target.value })}
        error={errors.uniqueValue}
      />
    </div>
  );
}

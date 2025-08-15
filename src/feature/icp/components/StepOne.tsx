import { Textarea } from "../../../shared/ui/Input";

type Props = {
  values: { mainGoal: string; targetCustomer: string };
  onChange: (patch: Partial<Props["values"]>) => void;
  errors?: Record<string, string>;
};

export default function StepOne({ values, onChange, errors = {} }: Props) {
  return (
    <div className="space-y-6">
      <Textarea
        label="What's the main goal of this landing page?"
        placeholder="e.g. Collect waitlist, Book demo,…"
        hint="Helps us evaluate success based on the right outcome."
        value={values.mainGoal}
        onChange={(e) => onChange({ mainGoal: e.target.value })}
        error={errors.mainGoal}
      />
      <Textarea
        label="Who is your target customer?"
        placeholder="e.g. Startup founder, B2B SaaS team,…"
        hint="Ensures our insights match your intended audience."
        value={values.targetCustomer}
        onChange={(e) => onChange({ targetCustomer: e.target.value })}
        error={errors.targetCustomer}
      />
    </div>
  );
}

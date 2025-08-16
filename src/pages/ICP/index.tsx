import React, { useState } from "react";
import { Card } from "../../shared/ui/Card";
import { Button } from "../../shared/ui//Button";
import { Stepper, StepOne, StepTwo, StepThree, submitIcp, useIcpForm } from "../../feature/icp";

export default function ICPPage() {
  const { step, next, back, validate, s1, setS1, s2, setS2, s3, setS3, errors, toPayload } = useIcpForm();
  const [submitting, setSubmitting] = useState(false);

  const onNext = () => {
    if (validate(step)) next();
  };

  const onSubmit = async () => {
    if (!validate(3)) return;
    setSubmitting(true);
    try {
      const payload = toPayload();
      await submitIcp(payload);
      alert("Submitted! 🎉"); // replace with real navigation/Toast
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar placeholder — slot your real navbar here */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-xl font-bold text-blue-600">ConvertAudit</div>
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <a href="#" className="hover:text-gray-900">History</a>
          <a href="#" className="relative hover:text-gray-900">Credits<span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">9</span></a>
          <button className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 text-white">+ Create New</button>
        </div>
      </div>

      <div className="px-4 pb-16 pt-4">
        <Card>
          <h1 className="mb-4 text-center text-2xl font-extrabold text-gray-800">
            Help us understand your ICP so we can give <br className="hidden md:block" /> better insights
          </h1>

          <Stepper step={step} />

          {step === 1 && (
            <StepOne
              values={s1}
              onChange={(patch) => setS1({ ...s1, ...patch })}
              errors={errors}
            />
          )}
          {step === 2 && (
            <StepTwo
              values={s2}
              onChange={(patch) => setS2({ ...s2, ...patch })}
              errors={errors}
            />
          )}
          {step === 3 && (
            <StepThree
              values={s3}
              onChange={(patch) => setS3({ ...s3, ...patch })}
              errors={errors}
            />
          )}

          <div className="mt-8 flex items-center justify-between">
            <Button variant="secondary" onClick={back} disabled={step === 1}>
              Back
            </Button>

            {step < 3 ? (
              <Button onClick={onNext}>Next</Button>
            ) : (
              <Button onClick={onSubmit} loading={submitting}>
                Get my audit
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

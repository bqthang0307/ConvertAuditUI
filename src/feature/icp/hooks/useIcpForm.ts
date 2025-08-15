import { useState } from "react";
import type { IcpStep1, IcpStep2, IcpStep3, IcpPayload } from "../model/type";
import { isEmail, isUrl } from "../../../shared/lib/validators";

export function useIcpForm() {
    const [step, setStep] = useState<Step>(1);

    const [s1, setS1] = useState<IcpStep1>({ mainGoal: "", targetCustomer: "" });
    const [s2, setS2] = useState<IcpStep2>({ painPoint: "", uniqueValue: "" });
    const [s3, setS3] = useState<IcpStep3>({ email: "", landingUrl: "" });

    const [errors, setErrors] = useState<Record<string, string>>({});

    type Step = 1 | 2 | 3;
    const next = () => setStep(s => (s === 1 ? 2 : 3));
    const back = () => setStep(s => (s === 3 ? 2 : 1));

    function validate(current: 1 | 2 | 3) {
        const e: Record<string, string> = {};
        if (current === 1) {
            if (!s1.mainGoal.trim()) e.mainGoal = "Please enter the main goal.";
            if (!s1.targetCustomer.trim()) e.targetCustomer = "Who is the target customer?";
        }
        if (current === 2) {
            if (!s2.painPoint.trim()) e.painPoint = "Describe the key pain point.";
            if (!s2.uniqueValue.trim()) e.uniqueValue = "What makes you different?";
        }
        if (current === 3) {
            if (!isEmail(s3.email)) e.email = "Enter a valid email.";
            if (!isUrl(s3.landingUrl)) e.landingUrl = "Enter a valid URL (with or without http).";
        }
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function toPayload(): IcpPayload {
        return { ...s1, ...s2, ...s3 };
    }

    return {
        step, next, back, validate,
        s1, setS1, s2, setS2, s3, setS3,
        errors, setErrors,
        toPayload
    };
}

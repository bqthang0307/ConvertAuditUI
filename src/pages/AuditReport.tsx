import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { useLocation, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import arrowDownIcon from "@/assets/Icon/arrow-down.svg";
// import AuditSection from "@/components/AuditSection";
import SectionWithSubsections from "@/components/SectionWithSubsections";
import CircularProgress from "@/components/CircularProgress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { auditService } from "@/services/auditService";

const AuditReport = () => {
  const [activeSection, setActiveSection] = useState("clarity");
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [auditData, setAuditData] = useState<any | null>(location.state?.auditData ?? null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (isoString?: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDisplayUrl = (raw?: string) => {
    if (!raw) return "";
    const withoutAt = raw.replace(/^@/, "");
    const withoutScheme = withoutAt.replace(/^https?:\/\//i, "");
    return withoutScheme;
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fetch audit by jobId from URL, prefer server over navigation state
  useEffect(() => {
    const jobId = searchParams.get('jobId');
    if (!jobId) {
      setError('Missing jobId in URL');
      setLoading(false);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const response = await auditService.getAudit(jobId);
        // Accept either { data: ... } or raw object
        const auditsInformation = (response as any)?.data ?? response;
        setAuditData(auditsInformation);
        setError(null);
      } catch (e) {
        setError('Failed to fetch audit data');
      } finally {
        setLoading(false);
      }
    })();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-6 pt-12 max-w-7xl">
          <div className="text-center mb-8">Loading audit...</div>
        </div>
      </div>
    );
  }

  if (error || !auditData) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-6 pt-12 max-w-7xl">
          <div className="text-center mb-8 text-red-600">{error || 'No audit data available'}</div>
        </div>
      </div>
    );
  }

  // Use auditData directly since it's now a single object, not an array 
  // || {
  //   "Clarity": {
  //     "summary": "Strong message but lacks clear ICP fit and ROI clarity",
  //     "dream_outcome": {
  //       "whatsWorking": [
  //         "Headline promises conversion improvement",
  //         "Subheadline hints at smart audit solution",
  //         "Visuals preview audit dashboard",
  //         "Testimonials highlight user satisfaction"
  //       ],
  //       "whatsMissing": [
  //         "Target customer (SMBs) is not mentioned clearly in headline/subheadline",
  //         "No quantified results or metrics are shown",
  //         "Pain point of 'low trial-to-paid' not directly mentioned or solved",
  //         "Faster onboarding as a unique differentiator is not emphasized"
  //       ],
  //       "recommendations": [
  //         {
  //           "action": "Include 'for SaaS SMBs' in the headline or subheadline",
  //           "purpose": "Clarity",
  //           "effort": "Easy",
  //           "impact": "High"
  //         },
  //         {
  //           "action": "Add a clear before-after comparison for conversion rates",
  //           "purpose": "Trust",
  //           "effort": "Medium",
  //           "impact": "Medium"
  //         },
  //         {
  //           "action": "Highlight 'low trial-to-paid' conversion issue in subheadline or body copy",
  //           "purpose": "Clarity",
  //           "effort": "Easy",
  //           "impact": "High"
  //         },
  //         {
  //           "action": "Emphasize 'faster onboarding' in a value prop section or visual",
  //           "purpose": "Conversion",
  //           "effort": "Medium",
  //           "impact": "High"
  //         }
  //       ],
  //       "score": 45
  //     },
  //     "time_&_effort": {
  //       "whatsWorking": [
  //         "3-step audit process clearly shown",
  //         "Mentions automation and ready-to-use insights",
  //         "Visual shows quick input and output structure"
  //       ],
  //       "whatsMissing": [
  //         "No specific time to result mentioned (e.g., 'in 24 hours')",
  //         "Setup time is not clearly stated",
  //         "No comparison with manual audits or competing tools",
  //         "Faster onboarding benefit not linked to process copy"
  //       ],
  //       "recommendations": [
  //         {
  //           "action": "Add line like 'Get your conversion report in under 30 minutes'",
  //           "purpose": "Clarity",
  //           "effort": "Easy",
  //           "impact": "Medium"
  //         },
  //         {
  //           "action": "Compare ConvertAudit setup speed to traditional audits",
  //           "purpose": "Trust",
  //           "effort": "Medium",
  //           "impact": "Medium"
  //         },
  //         {
  //           "action": "Mention 'zero learning curve' or 'onboard in under 10 mins' benefit",
  //           "purpose": "Conversion",
  //           "effort": "Easy",
  //           "impact": "High"
  //         }
  //       ],
  //       "score": 55
  //     },
  //     "weighted_score": 50
  //   },
  //   "Trust": {
  //     "summary": "Good trust signals, but deeper SMB-focused proof can boost relevance.",
  //     "reviews_&_social_proof": {
  //       "whatsWorking": [
  //         "Multiple testimonials are visible.",
  //         "Photos, names, and 5-star ratings are included.",
  //         "Mentions of product effectiveness are present."
  //       ],
  //       "whatsMissing": [
  //         "Testimonials don’t clearly reflect SMB profile.",
  //         "No direct mention of improving trial-to-paid conversion.",
  //         "No case studies showing quantifiable before/after results."
  //       ],
  //       "recommendations": [
  //         {
  //           "action": "Add testimonials from small to mid-sized business customers.",
  //           "purpose": "Trust",
  //           "effort": "Medium",
  //           "impact": "High"
  //         },
  //         {
  //           "action": "Include specific mentions of how ConvertAudit improved trial-to-paid rates.",
  //           "purpose": "Conversion",
  //           "effort": "Medium",
  //           "impact": "High"
  //         },
  //         {
  //           "action": "Add at least one testimonial with before/after metrics.",
  //           "purpose": "Clarity",
  //           "effort": "Medium",
  //           "impact": "High"
  //         }
  //       ],
  //       "score": 60
  //     },
  //     "trust_badges_&_eputation": {
  //       "whatsWorking": [
  //         "Strong visual ratings in testimonials enhance credibility."
  //       ],
  //       "whatsMissing": [
  //         "No trust badges, compliance logos, or press features.",
  //         "No external credibility proof tied to faster onboarding benefit."
  //       ],
  //       "recommendations": [
  //         {
  //           "action": "Add recognized trust badges or software review site logos (e.g., G2, Capterra).",
  //           "purpose": "Trust",
  //           "effort": "Easy",
  //           "impact": "Medium"
  //         },
  //         {
  //           "action": "Include an award, press feature, or certification if available.",
  //           "purpose": "Trust",
  //           "effort": "Medium",
  //           "impact": "High"
  //         },
  //         {
  //           "action": "Highlight a stat or badge related to ‘faster onboarding’ benefit if possible.",
  //           "purpose": "Conversion",
  //           "effort": "Medium",
  //           "impact": "High"
  //         }
  //       ],
  //       "score": 20
  //     },
  //     "personality_&_face": {
  //       "whatsWorking": [
  //         "Photo and friendly introduction of the founder are included.",
  //         "Founder quote provides a clear mission tone."
  //       ],
  //       "whatsMissing": [
  //         "No team or culture visuals, missing a broader personal feel."
  //       ],
  //       "recommendations": [
  //         {
  //           "action": "Show more behind-the-scenes/team visuals to connect further with SMB founders.",
  //           "purpose": "Trust",
  //           "effort": "Medium",
  //           "impact": "Medium"
  //         },
  //         {
  //           "action": "Add a short personal anecdote from the founder tied to helping SMBs convert easier.",
  //           "purpose": "Conversion",
  //           "effort": "Medium",
  //           "impact": "High"
  //         }
  //       ],
  //       "score": 40
  //     },
  //     "emotional_back_story": {
  //       "whatsWorking": [
  //         "Story from the founder explains why the tool exists.",
  //         "Mentions frustration solving conversion clarity problems."
  //       ],
  //       "whatsMissing": [
  //         "No mention of SMBs or messaging directly tied to trial-to-paid upgrade challenges.",
  //         "Emotional narrative could be stronger or more personal."
  //       ],
  //       "recommendations": [
  //         {
  //           "action": "Mention an example of helping an SMB overcome trial-to-paid friction.",
  //           "purpose": "Conversion",
  //           "effort": "Medium",
  //           "impact": "High"
  //         },
  //         {
  //           "action": "Deepen the founder’s story with a specific pain moment and outcome.",
  //           "purpose": "Trust",
  //           "effort": "Medium",
  //           "impact": "Medium"
  //         }
  //       ],
  //       "score": 35
  //     },
  //     "weighted_score": 38.75
  //   },
  //   "Conversion": {
  //     "summary": "CTA is clear but lacks urgency and doesn't highlight fast results.",
  //     "call_to_action": {
  //       "whatsWorking": [
  //         "CTA button copy 'Start free audit' is simple and action-driven.",
  //         "CTA appears multiple times, including hero section and footer."
  //       ],
  //       "whatsMissing": [
  //         "CTA does not emphasize benefit like faster onboarding or improved conversions.",
  //         "No tailored language addressing SMBs or their trial-to-paid pain."
  //       ],
  //       "recommendations": [
  //         {
  //           "action": "Add benefit-driven wording like 'Start free audit and boost signups today'.",
  //           "purpose": "Conversion",
  //           "effort": "Easy",
  //           "impact": "High"
  //         },
  //         {
  //           "action": "Include phrasing that reflects ICP pain point like 'Fix trial-to-paid drop-off now'.",
  //           "purpose": "Clarity",
  //           "effort": "Easy",
  //           "impact": "Medium"
  //         },
  //         {
  //           "action": "Emphasize speed of seeing value in CTA (e.g., 'Get quick insights in minutes').",
  //           "purpose": "Clarity",
  //           "effort": "Easy",
  //           "impact": "High"
  //         }
  //       ],
  //       "score": 70
  //     },
  //     "incentive_to_take_action": {
  //       "whatsWorking": [
  //         "Free audit is clearly offered – low barrier to entry.",
  //         "No mention of credit card needed implies low friction, though not stated."
  //       ],
  //       "whatsMissing": [
  //         "No urgency or limited-time incentive presented.",
  //         "No mention of refund policy or cancellation in case of paid upgrade.",
  //         "No language reinforcing fast onboarding/value realization, despite being the core differentiator."
  //       ],
  //       "recommendations": [
  //         {
  //           "action": "Add line below CTA that reads 'Takes less than 5 minutes. No credit card needed.'",
  //           "purpose": "Trust",
  //           "effort": "Easy",
  //           "impact": "Medium"
  //         },
  //         {
  //           "action": "Include urgency like 'Only 20 free audits/week – grab yours now!'",
  //           "purpose": "Conversion",
  //           "effort": "Medium",
  //           "impact": "High"
  //         },
  //         {
  //           "action": "Emphasize speed with copy like 'See results in under 24 hours'.",
  //           "purpose": "Clarity",
  //           "effort": "Easy",
  //           "impact": "High"
  //         }
  //       ],
  //       "score": 55
  //     },
  //     "weighted_score": 63
  //   },
  //   "overall_score_estimate": 50.58,
  //   "summary_comment": "ConvertAudit shows strong foundational messaging and solid conversion potential with a free CTA and user testimonials. However, it needs clearer focus on its ICP (SaaS SMBs), quantified results, and stronger urgency signals. Adding proof points and amplifying the unique faster onboarding benefit will significantly increase trust and drive action."
  // };
  // Derive report payload flexibly: supports object or JSON string
  let rawPayload: any = (auditData as any)?.payloadJson ?? (typeof auditData === 'string' ? auditData : location.state?.auditData);
  if (typeof rawPayload === 'string') {
    try {
      rawPayload = JSON.parse(rawPayload);
    } catch (_e) {
      rawPayload = {};
    }
  }
  const transformedData: any = rawPayload || {};

  // Calculate overall score from weighted scores
  const overallScore = Math.round(
    (Math.round(transformedData.Clarity?.weighted_score || 0) +
      Math.round(transformedData.Trust?.weighted_score || 0) +
      Math.round(transformedData.Conversion?.weighted_score || 0)) / 3
  );

  // Determine color and title based on score
  const getScoreInfo = (score: number) => {
    if (score >= 85) {
      return {
        color: "var(--color-excellent)",
        title: "You Are Close to Conversion Ready"
      };
    } else if (score >= 70) {
      return {
        color: "var(--color-excellent)",
        title: "Almost There with Just a Few Tweaks"
      };
    } else if (score >= 55) {
      return {
        color: "var(--color-needs-improvement)",
        title: "You Are on the Right Track"
      };
    } else if (score >= 40) {
      return {
        color: "var(--color-poor)",
        title: "You Have Potential and It Shows"
      };
    } else {
      return {
        color: "var(--color-poor)",
        title: "Let's Fix This From the Ground Up"
      };
    }
  };

  const mainScoreInfo = getScoreInfo(overallScore);

  // Aggregate all recommendations from the JSON and prepare rows for the table
  const getPriorityBadgeClass = (impact?: string) => {
    switch ((impact || "").toLowerCase()) {
      case "high":
        return "bg-excellent-50 text-excellent-600 text-body-sm";
      case "medium":
        return "bg-good-50 text-good-600 text-body-sm";
      case "low":
        return "bg-orange-100 text-orange-800 text-body-sm";
      default:
        return "bg-gray-100 text-gray-800 text-body-sm";
    }
  };

  const categoryToPurpose: Record<string, string> = {
    Clarity: "Clarity",
    Trust: "Trust",
    Conversion: "Conversion",
  };

  const allRecommendations = ["Clarity", "Trust", "Conversion"].flatMap((categoryKey) => {
    const category: any = (transformedData as any)?.[categoryKey] || {};
    return Object.keys(category).flatMap((subKey) => {
      const subsection = category[subKey];
      const recs = subsection?.recommendations;
      if (!Array.isArray(recs)) return [] as any[];
      return recs.map((rec: any) => ({
        action: rec.action,
        purpose: rec.purpose || categoryToPurpose[categoryKey] || categoryKey,
        impact: rec.impact,
      }));
    });
  });

  const priorityOrder: Record<string, number> = { High: 0, Medium: 1, Low: 2 };
  const sortedRecommendations = allRecommendations.sort((a, b) =>
    (priorityOrder[a.impact as string] ?? 99) - (priorityOrder[b.impact as string] ?? 99)
  );

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-6 pt-12 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl text-h6 text-darkBG mb-2">
            Audit result for {formatDisplayUrl(auditData.url)}
          </h1>
          <div className="inline-flex items-center gap-1 text-title-18
           text-dark-bg border border-dark-bg rounded px-2 py-1">
            <Clock className="w-5 h-5" />
            <span>{formatDate(auditData.createdAt)}</span>
          </div>
        </div>

        {/* Main Score */}
        <div className="text-center mb-10">
          <div className="relative w-64 h-64 mx-auto mb-2.5">
            <svg className="w-64 h-64 transform -rotate-90" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="80"
                stroke="currentColor"
                strokeWidth="16"
                fill="transparent"
                className="text-light-bg-400"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                stroke="var(--color-primary-CTA)"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 80}`}
                strokeDashoffset={`${2 * Math.PI * 80 * (1 - overallScore / 100)}`}
                className="transition-all duration-500 ease-in-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-h6 text-dark-bg-300">Total score</span>
              <span className="text-4xl font-bold text-dark-bg">{overallScore}%</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-dark-bg mb-6">{mainScoreInfo.title}</h2>
          <p className="text-dark-bg text-title-18 mx-auto max-w-[600px]">
            {transformedData.summary_comment}
          </p>
        </div>

        {/* Score Breakdown */}
        <div className="flex justify-center items-center space-x-[134px] mb-12">
          <CircularProgress value={Math.round(transformedData.Clarity?.weighted_score || 0)} label="Clarity" />
          <CircularProgress value={Math.round(transformedData.Trust?.weighted_score || 0)} label="Trust" />
          <CircularProgress value={Math.round(transformedData.Conversion?.weighted_score || 0)} label="Conversion" />
        </div>

        {/* Layout with Sidebar Navigation */}
        <div className="flex">
          {/* Left Navigation Sidebar */}
          <div className="w-53 flex-shrink-0">
            <div className="sticky top-8 bg-card border border-border rounded-2xl p-4">
              {/* Navigation Items */}
              <nav className="space-y-2">
                {/* Clarity with nested items */}
                <div>
                  <button
                    onClick={() => setActiveSection(activeSection === "clarity" ? "" : "clarity")}
                    className={`w-full flex items-center justify-between p-3 text-left rounded-lg 
                      transition-colors bg-dark-bg-50 hover: cursor-pointer`}
                  >
                    <span className="text-title-18 text-dark-bg">Clarity</span>
                    <img
                      src={arrowDownIcon}
                      alt="arrow"
                      className={`w-6 h-6 transition-transform ${activeSection === "clarity" ? "-rotate-180" : ""
                        }`}
                    />
                  </button>

                  {/* Nested items under Clarity */}
                  {activeSection === "clarity" && (
                    <div className="ml-4 mt-2 space-y-1">
                      <button
                        onClick={() => scrollToSection("dream-outcome")}
                        className="w-full flex items-center justify-between p-2 text-left rounded-lg transition-colors hover:bg-light-bg-200 text-sm text-muted-foreground"
                      >
                        <span className="text-body-lg text-dark-bg">Dream Outcome</span>

                      </button>
                      <button
                        onClick={() => scrollToSection("time-delay-effort")}
                        className="w-full flex items-center justify-between p-2 text-left rounded-lg transition-colors hover:bg-light-bg-200 text-sm text-muted-foreground"
                      >
                        <span className="text-body-lg text-dark-bg">Time Delay & Effort</span>

                      </button>
                    </div>
                  )}
                </div>

                {/* Trust with nested items */}
                <div>
                  <button
                    onClick={() => setActiveSection(activeSection === "trust" ? "" : "trust")}
                    className={`w-full flex items-center justify-between p-3 text-left rounded-lg 
                      transition-colors bg-dark-bg-50 hover: cursor-pointer`}
                  >
                    <span className="text-title-18 text-dark-bg">Trust</span>
                    <img
                      src={arrowDownIcon}
                      alt="arrow"
                      className={`w-6 h-6 transition-transform ${activeSection === "trust" ? "-rotate-180" : ""
                        }`}
                    />
                  </button>

                  {activeSection === "trust" && (
                    <div className="ml-4 mt-2 space-y-1">
                      <button
                        onClick={() => scrollToSection("reviews_&_social_proof")}
                        className="w-full flex items-center justify-between p-2 text-left rounded-lg transition-colors hover:bg-light-bg-200 text-sm text-muted-foreground"
                      >
                        <span className="text-body-lg text-dark-bg">Reviews & Social Proof</span>
                      </button>
                      <button
                        onClick={() => scrollToSection("trust_badges_&_eputation")}
                        className="w-full flex items-center justify-between p-2 text-left rounded-lg transition-colors hover:bg-light-bg-200 text-sm text-muted-foreground"
                      >
                        <span className="text-body-lg text-dark-bg">Trust Badges & Reputation</span>
                      </button>
                      <button
                        onClick={() => scrollToSection("personality_&_face")}
                        className="w-full flex items-center justify-between p-2 text-left rounded-lg transition-colors hover:bg-light-bg-200 text-sm text-muted-foreground"
                      >
                        <span className="text-body-lg text-dark-bg">Personality & Face</span>
                      </button>
                      <button
                        onClick={() => scrollToSection("emotional_back_story")}
                        className="w-full flex items-center justify-between p-2 text-left rounded-lg transition-colors hover:bg-light-bg-200 text-sm text-muted-foreground"
                      >
                        <span className="text-body-lg text-dark-bg">Emotional Back Story</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Conversion with nested items */}
                <div>
                  <button
                    onClick={() => setActiveSection(activeSection === "conversion" ? "" : "conversion")}
                    className={`w-full flex items-center justify-between p-3 text-left rounded-lg 
                      transition-colors bg-dark-bg-50 hover: cursor-pointer`}
                  >
                    <span className="text-title-18 text-dark-bg">Conversion</span>
                    <img
                      src={arrowDownIcon}
                      alt="arrow"
                      className={`w-6 h-6 transition-transform ${activeSection === "conversion" ? "-rotate-180" : ""
                        }`}
                    />
                  </button>

                  {activeSection === "conversion" && (
                    <div className="ml-4 mt-2 space-y-1">
                      <button
                        onClick={() => scrollToSection("call_to_action")}
                        className="w-full flex items-center justify-between p-2 text-left rounded-lg transition-colors hover:bg-light-bg-200 text-sm text-muted-foreground"
                      >
                        <span className="text-body-lg text-dark-bg">Call to Action</span>
                      </button>
                      <button
                        onClick={() => scrollToSection("incentive_to_take_action")}
                        className="w-full flex items-center justify-between p-2 text-left rounded-lg transition-colors hover:bg-light-bg-200 text-sm text-muted-foreground"
                      >
                        <span className="text-body-lg text-dark-bg">Incentive to Take Action</span>
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Clarity Section with Subsections */}
            <SectionWithSubsections
              id="clarity"
              title="Clarity"
              score={Math.round(transformedData.Clarity?.weighted_score || 0)}
              description={transformedData.Clarity?.summary}
              subsections={[
                {
                  id: "dream-outcome",
                  title: "Dream Outcome",
                  score: Math.round(transformedData.Clarity?.dream_outcome?.score || 0),
                  workingWell: transformedData.Clarity?.dream_outcome?.whatsWorking,
                  missing: transformedData.Clarity?.dream_outcome?.whatsMissing,
                  recommendations: transformedData.Clarity?.dream_outcome?.recommendations?.map((rec: any) => rec.action)
                },
                {
                  id: "time-delay-effort",
                  title: "Time Delay & Effort",
                  score: Math.round(transformedData.Clarity?.["time_&_effort"]?.score || 0),
                  workingWell: transformedData.Clarity?.["time_&_effort"]?.whatsWorking,
                  missing: transformedData.Clarity?.["time_&_effort"]?.whatsMissing,
                  recommendations: transformedData.Clarity?.["time_&_effort"]?.recommendations?.map((rec: any) => rec.action)
                }
              ]}
              showMainDescription={true}
              subsectionBorderColor="border-blue-200"
              mainProgressSize="lg"
            />

            {/* Trust Section with Subsections */}
            <SectionWithSubsections
              id="trust"
              title="Trust"
              score={Math.round(transformedData.Trust?.weighted_score || 0)}
              description={transformedData.Trust?.summary}
              subsections={[
                {
                  id: "reviews_&_social_proof",
                  title: "Reviews & Social Proof",
                  score: Math.round(transformedData.Trust?.["reviews_&_social_proof"]?.score || 0),
                  workingWell: transformedData.Trust?.["reviews_&_social_proof"]?.whatsWorking,
                  missing: transformedData.Trust?.["reviews_&_social_proof"]?.whatsMissing,
                  recommendations: transformedData.Trust?.["reviews_&_social_proof"]?.recommendations?.map((rec: any) => rec.action)
                },
                {
                  id: "trust_badges_&_eputation",
                  title: "Trust Badges & Reputation",
                  score: Math.round(transformedData.Trust?.["trust_badges_&_eputation"]?.score || 0),
                  workingWell: transformedData.Trust?.["trust_badges_&_eputation"]?.whatsWorking,
                  missing: transformedData.Trust?.["trust_badges_&_eputation"]?.whatsMissing,
                  recommendations: transformedData.Trust?.["trust_badges_&_eputation"]?.recommendations?.map((rec: any) => rec.action)
                },
                {
                  id: "personality_&_face",
                  title: "Personality & Face",
                  score: Math.round(transformedData.Trust?.["personality_&_face"]?.score || 0),
                  workingWell: transformedData.Trust?.["personality_&_face"]?.whatsWorking,
                  missing: transformedData.Trust?.["personality_&_face"]?.whatsMissing,
                  recommendations: transformedData.Trust?.["personality_&_face"]?.recommendations?.map((rec: any) => rec.action)
                },
                {
                  id: "emotional_back_story",
                  title: "Emotional Back Story",
                  score: Math.round(transformedData.Trust?.["emotional_back_story"]?.score || 0),
                  workingWell: transformedData.Trust?.["emotional_back_story"]?.whatsWorking,
                  missing: transformedData.Trust?.["emotional_back_story"]?.whatsMissing,
                  recommendations: transformedData.Trust?.["emotional_back_story"]?.recommendations?.map((rec: any) => rec.action)
                }
              ]}
              showMainDescription={true}
              subsectionBorderColor="border-blue-200"
              mainProgressSize="lg"
            />

            {/* Conversion Section with Subsections */}
            <SectionWithSubsections
              id="conversion"
              title="Conversion"
              score={Math.round(transformedData.Conversion?.weighted_score || 0)}
              description={transformedData.Conversion?.summary}
              subsections={[
                {
                  id: "call_to_action",
                  title: "Call to Action",
                  score: Math.round(transformedData.Conversion?.["call_to_action"]?.score || 0),
                  workingWell: transformedData.Conversion?.["call_to_action"]?.whatsWorking,
                  missing: transformedData.Conversion?.["call_to_action"]?.whatsMissing,
                  recommendations: transformedData.Conversion?.["call_to_action"]?.recommendations?.map((rec: any) => rec.action)
                },
                {
                  id: "incentive_to_take_action",
                  title: "Incentive to Take Action",
                  score: Math.round(transformedData.Conversion?.["incentive_to_take_action"]?.score || 0),
                  workingWell: transformedData.Conversion?.["incentive_to_take_action"]?.whatsWorking,
                  missing: transformedData.Conversion?.["incentive_to_take_action"]?.whatsMissing,
                  recommendations: transformedData.Conversion?.["incentive_to_take_action"]?.recommendations?.map((rec: any) => rec.action)
                }
              ]}
              showMainDescription={true}
              subsectionBorderColor="border-blue-200"
              mainProgressSize="lg"
            />
          </div>
        </div>

        {/* Priority Recommendations */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Priority Recommendations</h2>
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-title-18 text-align-left text-dark-bg-300 pl-5">Recommendation</TableHead>
                  <TableHead className="text-title-18 text-align-left text-dark-bg-300">Purpose</TableHead>
                  <TableHead className="text-title-18 text-align-left text-dark-bg-300">Priority</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRecommendations.map((rec, idx) => (
                  <TableRow key={`${rec.action}-${idx}`}>
                    <TableCell className="text-menu py-4 pl-5">{rec.action}</TableCell>
                    <TableCell><Badge variant="purpose" className="text-dark-bg-900">{rec.purpose}</Badge></TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center justify-center rounded-md border border-transparent px-2 py-0.5 whitespace-nowrap ${getPriorityBadgeClass(rec.impact)}`}>
                        {rec.impact || ""}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditReport;
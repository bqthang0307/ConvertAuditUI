import { useEffect, useState } from "react";
import { Clock, Menu, X } from "lucide-react";
import { useLocation, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import arrowDownIcon from "@/assets/Icon/arrow-down.svg";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

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
    const withoutTrailingSlash = withoutScheme.replace(/\/+$/, "");
    return withoutTrailingSlash;
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
    const backendSignature = searchParams.get('sig');
    if (!jobId) {
      setError('Missing jobId in URL');
      setLoading(false);
      return;
    }
    if (!backendSignature) {
      setError('Missing signature in URL');
      setLoading(false);
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const response = await auditService.getAudit(jobId, backendSignature);
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

  // Scroll detection for mobile navigation visibility
  useEffect(() => {
    const handleScroll = () => {
      const scoreBreakdownElement = document.querySelector('[data-section="score-breakdown"]');
      if (scoreBreakdownElement) {
        const rect = scoreBreakdownElement.getBoundingClientRect();
        // Show mobile nav when score breakdown is scrolled past (bottom of element is above viewport)
        const shouldShow = rect.bottom < 0;
        setShowMobileNav(shouldShow);
        
        // Close mobile menu if user scrolls back up past score breakdown
        if (!shouldShow && isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-12 max-w-7xl">
          <div className="text-center mb-8">Loading audit...</div>
        </div>
      </div>
    );
  }

  if (error || !auditData) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-12 max-w-7xl">
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
      {/* Mobile hamburger trigger */}
      {showMobileNav && (
        <button
          aria-label="Open navigation"
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden fixed top-3 left-3 z-50 w-9 h-9 rounded-full bg-card/80 backdrop-blur border border-border flex items-center justify-center"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/20"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-card border-r border-border shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                aria-label="Close navigation"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 inline-flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-2">
              <button
                onClick={() => {
                  setActiveSection(activeSection === "clarity" ? "" : "clarity");
                }}
                className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors bg-dark-bg-50`}
              >
                <span className="text-title-18 text-dark-bg">Clarity</span>
                <img src={arrowDownIcon} alt="arrow" className={`w-6 h-6`} />
              </button>
              {activeSection === "clarity" && (
                <div className="ml-4 mt-1 space-y-1">
                  <button
                    onClick={() => { scrollToSection("dream-outcome"); setIsMobileMenuOpen(false); }}
                    className="w-full p-2 text-left rounded-lg transition-colors hover:bg-light-bg-200 text-sm text-muted-foreground"
                  >
                    <span className="text-body-lg text-dark-bg">Dream Outcome</span>
                  </button>
                  <button
                    onClick={() => { scrollToSection("time-delay-effort"); setIsMobileMenuOpen(false); }}
                    className="w-full p-2 text-left rounded-lg transition-colors hover:bg-light-bg-200 text-sm text-muted-foreground"
                  >
                    <span className="text-body-lg text-dark-bg">Time Delay & Effort</span>
                  </button>
                </div>
              )}

              <button
                onClick={() => { setActiveSection(activeSection === "trust" ? "" : "trust"); }}
                className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors bg-dark-bg-50`}
              >
                <span className="text-title-18 text-dark-bg">Trust</span>
                <img src={arrowDownIcon} alt="arrow" className={`w-6 h-6`} />
              </button>
              {activeSection === "trust" && (
                <div className="ml-4 mt-1 space-y-1">
                  <button onClick={() => { scrollToSection("reviews_&_social_proof"); setIsMobileMenuOpen(false); }} className="w-full p-2 text-left rounded-lg hover:bg-light-bg-200 text-sm text-muted-foreground">
                    <span className="text-body-lg text-dark-bg">Reviews & Social Proof</span>
                  </button>
                  <button onClick={() => { scrollToSection("trust_badges_&_eputation"); setIsMobileMenuOpen(false); }} className="w-full p-2 text-left rounded-lg hover:bg-light-bg-200 text-sm text-muted-foreground">
                    <span className="text-body-lg text-dark-bg">Trust Badges & Reputation</span>
                  </button>
                  <button onClick={() => { scrollToSection("personality_&_face"); setIsMobileMenuOpen(false); }} className="w-full p-2 text-left rounded-lg hover:bg-light-bg-200 text-sm text-muted-foreground">
                    <span className="text-body-lg text-dark-bg">Personality & Face</span>
                  </button>
                  <button onClick={() => { scrollToSection("emotional_back_story"); setIsMobileMenuOpen(false); }} className="w-full p-2 text-left rounded-lg hover:bg-light-bg-200 text-sm text-muted-foreground">
                    <span className="text-body-lg text-dark-bg">Emotional Back Story</span>
                  </button>
                </div>
              )}

              <button
                onClick={() => { setActiveSection(activeSection === "conversion" ? "" : "conversion"); }}
                className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors bg-dark-bg-50`}
              >
                <span className="text-title-18 text-dark-bg">Conversion</span>
                <img src={arrowDownIcon} alt="arrow" className={`w-6 h-6`} />
              </button>
              {activeSection === "conversion" && (
                <div className="ml-4 mt-1 space-y-1">
                  <button onClick={() => { scrollToSection("call_to_action"); setIsMobileMenuOpen(false); }} className="w-full p-2 text-left rounded-lg hover:bg-light-bg-200 text-sm text-muted-foreground">
                    <span className="text-body-lg text-dark-bg">Call to Action</span>
                  </button>
                  <button onClick={() => { scrollToSection("incentive_to_take_action"); setIsMobileMenuOpen(false); }} className="w-full p-2 text-left rounded-lg hover:bg-light-bg-200 text-sm text-muted-foreground">
                    <span className="text-body-lg text-dark-bg">Incentive to Take Action</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 sm:px-10 lg:px-12 py-6 pt-14.5 sm:pt-12 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-title-18 sm:text-h6 text-dark-bg mb-3">
            Audit result for {formatDisplayUrl(auditData.url)}
          </h1>
          <div className="inline-flex items-center gap-1 text-menu sm:text-title-18
           text-dark-bg border border-dark-bg rounded px-2 py-1">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{formatDate(auditData.createdAt)}</span>
          </div>
        </div>

        {/* Main Score */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="relative w-57.5 h-57.5 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto mb-1.5 sm:mb-2.5">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
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
              <span className="text-title-18 sm:text-h6 text-dark-bg-300">Total score</span>
              <span className="text-h4 sm:text-h3 font-bold text-dark-bg">{overallScore}%</span>
            </div>
          </div>

          <h2 className="text-h5 sm:text-h4 font-bold text-dark-bg mb-6">{mainScoreInfo.title}</h2>
          <p className="text-dark-bg text-body-lg sm:text-title-18 mx-auto max-w-[600px]">
            {transformedData.summary_comment}
          </p>
        </div>

        {/* Score Breakdown */}
        <div data-section="score-breakdown" className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-4 sm:gap-20 lg:gap-33.5 mb-8 sm:mb-12 mx-2 lg:mx-0">
          <CircularProgress value={Math.round(transformedData.Clarity?.weighted_score || 0)} label="Clarity" />
          <CircularProgress value={Math.round(transformedData.Trust?.weighted_score || 0)} label="Trust" />
          <CircularProgress value={Math.round(transformedData.Conversion?.weighted_score || 0)} label="Conversion" />
        </div>

        {/* Layout with Sidebar Navigation */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Navigation Sidebar */}
          <div className="hidden lg:block lg:w-53 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-8 bg-card border border-border rounded-2xl p-4">
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
          <div className="flex-1 min-w-0">
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
        <div className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 sm:mb-8">Priority Recommendations</h2>
          
          {/* Desktop Table */}
          <div className="hidden sm:block border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-sm sm:text-base text-align-left text-dark-bg-300 pl-3 sm:pl-5">Recommendation</TableHead>
                    <TableHead className="text-sm sm:text-base text-align-left text-dark-bg-300">Purpose</TableHead>
                    <TableHead className="text-sm sm:text-base text-align-left text-dark-bg-300">Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedRecommendations.map((rec, idx) => (
                    <TableRow key={`${rec.action}-${idx}`}>
                      <TableCell className="text-sm sm:text-base text-menu py-3 sm:py-4 pl-3 sm:pl-5 max-w-[600px] whitespace-normal break-words">{rec.action}</TableCell>
                      <TableCell><Badge variant="purpose" className="text-dark-bg-900 text-xs sm:text-sm">{rec.purpose}</Badge></TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center justify-center rounded-md border border-transparent px-2 py-0.5 whitespace-nowrap text-xs sm:text-sm ${getPriorityBadgeClass(rec.impact)}`}>
                          {rec.impact || ""}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden space-y-4">
            {sortedRecommendations.map((rec, idx) => (
              <div key={`${rec.action}-${idx}`} className="border border-border rounded-lg p-4 bg-card">
                <div className="mb-3">
                  <p className="text-sm text-menu whitespace-normal break-words">{rec.action}</p>
                </div>
                <div className="flex gap-4">
                  <Badge variant="purpose" className="text-dark-bg-900 text-xs">{rec.purpose}</Badge>
                  <span className={`inline-flex items-center justify-center rounded-md border border-transparent px-2 py-0.5 whitespace-nowrap text-xs ${getPriorityBadgeClass(rec.impact)}`}>
                    {rec.impact || ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditReport;
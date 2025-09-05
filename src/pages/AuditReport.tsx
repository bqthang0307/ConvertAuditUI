import { useState } from "react";
import { Clock } from "lucide-react";
import Header from "@/components/Header";
import arrowDownIcon from "@/assets/Icon/arrow-down.svg";
// import AuditSection from "@/components/AuditSection";
import SectionWithSubsections from "@/components/SectionWithSubsections";
import CircularProgress from "@/components/CircularProgress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const AuditReport = () => {
  const [activeSection, setActiveSection] = useState("clarity");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };



  const auditData = [
    {
      "usp": {
        "summary": "The landing page promotes a smarter SaaS landing page audit tool to help boost conversions. It is visually appealing and mentions SaaS founders multiple times, which aligns partially with the ICP’s target customer (SMBs). However, the copy misses the specific pain point of low trial-to-paid conversion, and the differentiator of faster onboarding is not clearly stated.",
        "dream_outcome": {
          "whatsWorking": [
            "Mentions improved conversions in headline and subheadline",
            "References SaaS founders, partially aligning with SMB targeting",
            "Social proof from testimonials builds trust"
          ],
          "whatsMissing": [
            "No clear mention of the ICP's specific pain point: 'low trial-to-paid'",
            "Target customer (SMBs) is vaguely referenced; not explicit",
            "No transformation before-after story shown",
            "No visuals showing outcome or ROI"
          ],
          "recommendations": [
            {
              "action": "Add subheadline or section stating explicitly that this helps increase trial-to-paid conversions",
              "benefit": "Aligns directly with ICP pain point",
              "purpose": "Clarity",
              "effort": "Easy",
              "impact": "High"
            },
            {
              "action": "Include visual (e.g. graph or user journey) showing before-after conversion lift",
              "benefit": "Shows impact clearly",
              "purpose": "Conversion",
              "effort": "Medium",
              "impact": "High"
            },
            {
              "action": "Make 'SaaS founders' or 'SMBs' more prominent in the copy to clearly define the audience",
              "benefit": "Better targeting",
              "purpose": "Clarity",
              "effort": "Easy",
              "impact": "Medium"
            }
          ],
          "score": 65
        },
        "time_&_effort": {
          "whatsWorking": [
            "Mentions '3 simple steps' to get started",
            "Mentions automation in generating tailored audit insights",
            "Clear call-to-action and simple form submission"
          ],
          "whatsMissing": [
            "No specified time to see benefits or results",
            "No comparison to manual audit process or time savings",
            "‘Faster onboarding’ differentiator is not explicitly shown"
          ],
          "recommendations": [
            {
              "action": "Add a line or badge highlighting time to completed audit (e.g. 'Get insights in under 5 minutes')",
              "benefit": "Sets clear expectations",
              "purpose": "Clarity",
              "effort": "Easy",
              "impact": "Medium"
            },
            {
              "action": "State how much faster this tool is vs manual audit (e.g. '10x faster than traditional methods')",
              "benefit": "Highlights differentiator",
              "purpose": "Conversion",
              "effort": "Medium",
              "impact": "High"
            },
            {
              "action": "Use comparison table or visual to show effort saved vs current solutions",
              "benefit": "Reinforces value and ease",
              "purpose": "Trust",
              "effort": "Medium",
              "impact": "Medium"
            }
          ],
          "score": 60
        },
        "weighted_score": 63
      }
    },
    {
      "trust": {
        "summary": "The landing page establishes a foundational level of trust through testimonials, founder visibility, and some social proof. However, the connection to SMBs and the specific pain point of low trial-to-paid conversions is weak or missing. Key trust elements like detailed outcomes in testimonials, emotional storytelling tied to SMB struggles, and supporting evidence for the faster onboarding differentiator are lacking and present opportunities to improve credibility and relevance to the ICP.",
        "reviews_&_social_proof": {
          "whatsWorking": [
            "Multiple testimonials displayed with names and logos.",
            "5-star ratings included for added credibility."
          ],
          "whatsMissing": [
            "No mention of role, company size, or industry – unclear if reviewers are SMBs.",
            "No detail on results achieved or improvement in trial-to-paid success.",
            "No video testimonials or emotional storytelling in reviews."
          ],
          "recommendations": [
            {
              "action": "Add titles, company size, and industry to each testimonial.",
              "benefit": "Makes testimonials relatable for SMBs.",
              "purpose": "Trust",
              "effort": "Easy",
              "impact": "Medium"
            },
            {
              "action": "Include specific customer wins like 'increase in trial-to-paid' or similar metrics.",
              "benefit": "Demonstrates product effectiveness on ICP pain point.",
              "purpose": "Conversion",
              "effort": "Medium",
              "impact": "High"
            },
            {
              "action": "Add one video testimonial from a founder of an SMB.",
              "benefit": "Builds trust and connection with target customer base.",
              "purpose": "Trust",
              "effort": "Medium",
              "impact": "High"
            }
          ],
          "score": 50
        },
        "trust_badges_&_eputation": {
          "whatsWorking": [
            "Customer star ratings lend some credibility."
          ],
          "whatsMissing": [
            "No mention of certifications, awards, or press features.",
            "No third-party validation or industry trust badges.",
            "No data/statistics showing onboarding speed advantage."
          ],
          "recommendations": [
            {
              "action": "Add visual trust badges (e.g., featured in press, trusted by X companies).",
              "benefit": "Increases external credibility quickly.",
              "purpose": "Trust",
              "effort": "Medium",
              "impact": "Medium"
            },
            {
              "action": "Include a stat or proof point like 'average time to ROI' or 'onboarding in X minutes'.",
              "benefit": "Supports faster onboarding claim with proof.",
              "purpose": "Clarity",
              "effort": "Medium",
              "impact": "High"
            }
          ],
          "score": 20
        },
        "personality_&_face": {
          "whatsWorking": [
            "Photo and introduction of founder toward the bottom of the page.",
            "Founder provides product context and motivation."
          ],
          "whatsMissing": [
            "No additional team members or personal touches beyond the founder.",
            "Lacks quotes that humanize the brand further."
          ],
          "recommendations": [
            {
              "action": "Add a quote from the founder about helping SMBs grow faster.",
              "benefit": "Connects more directly to ICP (SMBs).",
              "purpose": "Conversion",
              "effort": "Easy",
              "impact": "Medium"
            },
            {
              "action": "Consider showing more team faces or quotes to make brand feel more approachable.",
              "benefit": "Strengthens personal connection.",
              "purpose": "Trust",
              "effort": "Medium",
              "impact": "Medium"
            }
          ],
          "score": 40
        },
        "emotional_back_story": {
          "whatsWorking": [
            "The founder section gives some personal backstory about their experience."
          ],
          "whatsMissing": [
            "No clear emotional pain or struggle presented that connects deeply with ICP.",
            "Doesn’t directly mention problems like low trial-to-paid conversions from the founder’s journey.",
            "Lacks narrative that shows why traditional audit tools failed for small businesses."
          ],
          "recommendations": [
            {
              "action": "Include more emotional story details on why the founder created the tool.",
              "benefit": "Creates emotional resonance with struggling SMBs.",
              "purpose": "Trust",
              "effort": "Medium",
              "impact": "High"
            },
            {
              "action": "Tie the founder’s story into solving low trial-to-paid conversion challenges.",
              "benefit": "Aligns pain point with ICP path more directly.",
              "purpose": "Clarity",
              "effort": "Medium",
              "impact": "High"
            }
          ],
          "score": 25
        },
        "weighted_score": 34
      }
    },
    {
      "conversion": {
        "summary": "The landing page has a clear and focused call-to-action strategy, with repeated buttons like 'Start Free Audit' that are easy to see and act upon. This resonates well with the SMB target audience aiming to improve conversions. However, the copy doesn't fully emphasize the unique selling point of 'faster onboarding' or directly connect the CTA to the pain point of low trial-to-paid conversion. Incentives are present but could be stronger. The page doesn't mention things like 'no credit card needed' or deadlines to create urgency. These changes could help reduce risk perception and emphasize speed—which is a leverage point for SMBs evaluating onboarding-heavy tools.",
        "call_to_action": {
          "whatsWorking": [
            "Primary CTA 'Start Free Audit' is clear and benefits-focused.",
            "CTA placement appears consistently throughout the page.",
            "Text focuses on improving conversions, aligning with ICP goal."
          ],
          "whatsMissing": [
            "No microcopy to ease friction for hesitant users (e.g., 'Takes less than 5 mins').",
            "CTA doesn't mention speed or ease as differentiators.",
            "CTA not optimized for mobile visibility — placement is okay but could be more prominent."
          ],
          "recommendations": [
            {
              "action": "Add supporting microcopy like 'No credit card, results in minutes' near CTA buttons.",
              "benefit": "Reduces perceived friction for SMBs.",
              "purpose": "Conversion",
              "effort": "Easy",
              "impact": "High"
            },
            {
              "action": "Highlight 'fast onboarding' within or near CTA (e.g., 'Quick Audit in Minutes').",
              "benefit": "Reinforces key differentiator.",
              "purpose": "Clarity",
              "effort": "Easy",
              "impact": "Medium"
            },
            {
              "action": "Revisit mobile spacing/padding for CTA to assure it stands out more on small screens.",
              "benefit": "Improves mobile usability.",
              "purpose": "Conversion",
              "effort": "Medium",
              "impact": "Medium"
            }
          ],
          "score": 78
        },
        "incentive_to_take_action": {
          "whatsWorking": [
            "Free audit offering reduces commitment instantly.",
            "Copy reflects high-value insights with little effort."
          ],
          "whatsMissing": [
            "No mention of 'no credit card' or limited-time incentive.",
            "Missing urgency elements like countdowns or limited slots.",
            "No explicit mention of refund, but expected since it's a free offer."
          ],
          "recommendations": [
            {
              "action": "Add urgency copy, like 'Limited slots weekly' or 'Only 5 audits left this week'.",
              "benefit": "Encourages immediate action.",
              "purpose": "Conversion",
              "effort": "Easy",
              "impact": "High"
            },
            {
              "action": "Clarify zero-risk with phrase like 'No payment required — Ever.'",
              "benefit": "Lowers hesitation for SMBs.",
              "purpose": "Trust",
              "effort": "Easy",
              "impact": "Medium"
            },
            {
              "action": "Highlight outcome timeframe — e.g., 'Get insights in 24 hours'.",
              "benefit": "Supports speed/differentiator.",
              "purpose": "Clarity",
              "effort": "Medium",
              "impact": "High"
            }
          ],
          "score": 65
        },
        "weighted_score": 71
      }
    }
  ];

  // Transform the data from array format to object format
  const transformedData = auditData.reduce((acc, item) => {
    Object.keys(item).forEach(key => {
      (acc as any)[key] = (item as any)[key];
    });
    console.log(acc);
    return acc;
  }, {} as any);

  // Calculate overall score from weighted scores
  const overallScore = Math.round(
    (transformedData.usp?.weighted_score +
      transformedData.trust?.weighted_score +
      transformedData.conversion?.weighted_score) / 3
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
    usp: "Clarity",
    trust: "Trust",
    conversion: "Conversion",
  };

  const allRecommendations = ["usp", "trust", "conversion"].flatMap((categoryKey) => {
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
            Audit result for serrand.co.uk
          </h1>
          <div className="inline-flex items-center gap-1 text-title-18
           text-dark-bg border border-dark-bg rounded px-2 py-1">
            <Clock className="w-5 h-5" />
            <span>28/07/2025</span>
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
            Your Clarity is solid. Now boost conversions by adding urgency,
            emotional trust, and clearer audience targeting.
          </p>
        </div>

        {/* Score Breakdown */}
        <div className="flex justify-center items-center space-x-[134px] mb-12">
          <CircularProgress value={transformedData.usp?.weighted_score || 0} label="Clarity" />
          <CircularProgress value={transformedData.trust?.weighted_score || 0} label="Trust" />
          <CircularProgress value={transformedData.conversion?.weighted_score || 0} label="Conversion" />
        </div>

        {/* Layout with Sidebar Navigation */}
        <div className="flex">
          {/* Left Navigation Sidebar */}
          <div className="w-53 flex-shrink-0">
            <div className="sticky top-8 bg-card border border-border rounded-lg p-4">
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
                        className="w-full flex items-center justify-between p-2 text-left rounded-lg transition-colors hover:bg-muted/50 text-sm text-muted-foreground"
                      >
                        <span className="text-body-lg text-dark-bg">Dream Outcome</span>
                        
                      </button>
                      <button
                        onClick={() => scrollToSection("time-delay-effort")}
                        className="w-full flex items-center justify-between p-2 text-left rounded-lg transition-colors hover:bg-muted/50 text-sm text-muted-foreground"
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
                        className="w-full flex items-center justify-between p-2 text-left rounded-lg transition-colors hover:bg-muted/50 text-sm text-muted-foreground"
                      >
                        <span className="text-body-lg text-dark-bg">Reviews & Social Proof</span>
                        <img src={arrowDownIcon} alt="arrow" className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => scrollToSection("trust_badges_&_eputation")}
                        className="w-full flex items-center justify-between p-2 text-left rounded-lg transition-colors hover:bg-muted/50 text-sm text-muted-foreground"
                      >
                        <span className="text-body-lg text-dark-bg">Trust Badges & Reputation</span>
                        <img src={arrowDownIcon} alt="arrow" className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => scrollToSection("personality_&_face")}
                        className="w-full flex items-center justify-between p-2 text-left rounded-lg transition-colors hover:bg-muted/50 text-sm text-muted-foreground"
                      >
                        <span className="text-body-lg text-dark-bg">Personality & Face</span>
                        <img src={arrowDownIcon} alt="arrow" className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => scrollToSection("emotional_back_story")}
                        className="w-full flex items-center justify-between p-2 text-left rounded-lg transition-colors hover:bg-muted/50 text-sm text-muted-foreground"
                      >
                        <span className="text-body-lg text-dark-bg">Emotional Back Story</span>
                        <img src={arrowDownIcon} alt="arrow" className="w-6 h-6" />
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
                        className="w-full flex items-center justify-between p-2 text-left rounded-lg transition-colors hover:bg-muted/50 text-sm text-muted-foreground"
                      >
                        <span className="text-body-lg text-dark-bg">Call to Action</span>
                        <img src={arrowDownIcon} alt="arrow" className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => scrollToSection("incentive_to_take_action")}
                        className="w-full flex items-center justify-between p-2 text-left rounded-lg transition-colors hover:bg-muted/50 text-sm text-muted-foreground"
                      >
                        <span className="text-body-lg text-dark-bg">Incentive to Take Action</span>
                        <img src={arrowDownIcon} alt="arrow" className="w-6 h-6" />
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-12">
            {/* Clarity Section with Subsections */}
            <SectionWithSubsections
              id="clarity"
              title="Clarity"
              score={transformedData.usp?.weighted_score || 0}
              description={transformedData.usp?.summary}
              subsections={[
                {
                  id: "dream-outcome",
                  title: "Dream Outcome",
                  score: transformedData.usp?.dream_outcome?.score || 0,
                  workingWell: transformedData.usp?.dream_outcome?.whatsWorking,
                  missing: transformedData.usp?.dream_outcome?.whatsMissing,
                  recommendations: transformedData.usp?.dream_outcome?.recommendations?.map((rec: any) => rec.action)
                },
                {
                  id: "time-delay-effort",
                  title: "Time Delay & Effort",
                  score: transformedData.usp?.["time_&_effort"]?.score || 0,
                  workingWell: transformedData.usp?.["time_&_effort"]?.whatsWorking,
                  missing: transformedData.usp?.["time_&_effort"]?.whatsMissing,
                  recommendations: transformedData.usp?.["time_&_effort"]?.recommendations?.map((rec: any) => rec.action)
                }
              ]}
              showMainDescription={true}
              subsectionBorderColor="border-blue-200"
              mainProgressSize="lg"
            />

            {/* Clarity Section with Subsections */}
            <SectionWithSubsections
              id="trust"
              title="Trust"
              score={transformedData.trust?.weighted_score || 0}
              description={transformedData.trust?.summary}
              subsections={[
                {
                  id: "reviews_&_social_proof",
                  title: "Reviews & Social Proof",
                  score: transformedData.trust?.["reviews_&_social_proof"]?.score || 0,
                  workingWell: transformedData.trust?.["reviews_&_social_proof"]?.whatsWorking,
                  missing: transformedData.trust?.["reviews_&_social_proof"]?.whatsMissing,
                  recommendations: transformedData.trust?.["reviews_&_social_proof"]?.recommendations?.map((rec: any) => rec.action)
                },
                {
                  id: "trust_badges_&_eputation",
                  title: "Trust Badges & Reputation",
                  score: transformedData.trust?.["trust_badges_&_eputation"]?.score || 0,
                  workingWell: transformedData.trust?.["trust_badges_&_eputation"]?.whatsWorking,
                  missing: transformedData.trust?.["trust_badges_&_eputation"]?.whatsMissing,
                  recommendations: transformedData.trust?.["trust_badges_&_eputation"]?.recommendations?.map((rec: any) => rec.action)
                },
                {
                  id: "personality_&_face",
                  title: "Personality & Face",
                  score: transformedData.trust?.["personality_&_face"]?.score || 0,
                  workingWell: transformedData.trust?.["personality_&_face"]?.whatsWorking,
                  missing: transformedData.trust?.["personality_&_face"]?.whatsMissing,
                  recommendations: transformedData.trust?.["personality_&_face"]?.recommendations?.map((rec: any) => rec.action)
                },
                {
                  id: "emotional_back_story",
                  title: "Emotional Back Story",
                  score: transformedData.trust?.["emotional_back_story"]?.score || 0,
                  workingWell: transformedData.trust?.["emotional_back_story"]?.whatsWorking,
                  missing: transformedData.trust?.["emotional_back_story"]?.whatsMissing,
                  recommendations: transformedData.trust?.["emotional_back_story"]?.recommendations?.map((rec: any) => rec.action)
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
              score={transformedData.conversion?.weighted_score || 0}
              description={transformedData.conversion?.summary}
              subsections={[
                {
                  id: "call_to_action",
                  title: "Call to Action",
                  score: transformedData.conversion?.["call_to_action"]?.score || 0,
                  workingWell: transformedData.conversion?.["call_to_action"]?.whatsWorking,
                  missing: transformedData.conversion?.["call_to_action"]?.whatsMissing,
                  recommendations: transformedData.conversion?.["call_to_action"]?.recommendations?.map((rec: any) => rec.action)
                },
                {
                  id: "incentive_to_take_action",
                  title: "Incentive to Take Action",
                  score: transformedData.conversion?.["incentive_to_take_action"]?.score || 0,
                  workingWell: transformedData.conversion?.["incentive_to_take_action"]?.whatsWorking,
                  missing: transformedData.conversion?.["incentive_to_take_action"]?.whatsMissing,
                  recommendations: transformedData.conversion?.["incentive_to_take_action"]?.recommendations?.map((rec: any) => rec.action)
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
import { useState } from "react";
import { Calendar, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import AuditSection from "@/components/AuditSection";
import CircularProgress from "@/components/CircularProgress";

const AuditReport = () => {
  const [activeSection, setActiveSection] = useState("clarity");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigationItems = [
    { id: "clarity", label: "Clarity" },
    { id: "dream-outcome", label: "Dream Outcome" },
    { id: "time-delay-effort", label: "Time Delay & Effort" },
    { id: "trust", label: "Trust" },
    { id: "conversion", label: "Conversion" },
  ];

  const auditData = {
    clarity: {
      id: "clarity",
      title: "Clarity",
      score: 70,
      color: "#EAB308",
      description: "Overall clarity communicates the problem it solves and its core solution, but the lack of a clearly defined target audience and the sense of emotionally compelling before-and-after story could still be improved."
    },
    dreamOutcome: {
      id: "dream-outcome",
      title: "Dream Outcome",
      score: 76,
      color: "#EAB308",
      badge: {
        text: "Good",
        bgColor: "bg-green-100",
        textColor: "text-green-800"
      },
      workingWell: [
        "Shows clear benefits through numbers: 81% accuracy, 53% time saved, 47% fewer hiring mistakes",
        "Uses dashboard mockups and visuals to help users understand the product experience",
        "The message \"Start hiring on data\" clearly positions the product as a smarter solution"
      ],
      missing: [
        "Doesn't state who the product is for; there's no mention of startups or hiring teams in the hero",
        "No clear before-after transformation to show the impact of using Serrand",
        "Lacks emotional value or a sense of aspiration in the messaging"
      ],
      recommendations: [
        "Add a phrase in the hero section that makes the target audience obvious, such as \"For startup hiring teams.\"",
        "Use a substitutive call-to-action that communicates the benefit: \"Reduce screening time and hire with confidence from day one.\"",
        "Include a visual or short narrative that shows a clear before-after comparison, such as: \"Before Serrand: 4 hours/day manually reviewing CVs. After Serrand: 30 minutes reviewing AI-filtered candidates ready to interview.\""
      ]
    },
    timeDelayEffort: {
      id: "time-delay-effort",
      title: "Time Delay & Effort",
      score: 64,
      color: "#3B82F6",
      badge: {
        text: "Needs Improvement",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800"
      },
      workingWell: [
        "The product is clearly explained with a 4-step onboarding section",
        "Users get a sense of structure and simplicity when viewing how Serrand works"
      ],
      missing: [
        "Doesn't mention how long it takes to get results or complete setup",
        "No comparison with traditional hiring methods, which limits the perception of time/effort",
        "Automation is referenced but not clearly positioned as a time-saving benefit"
      ],
      recommendations: [
        "Add a short line like \"Set up in under 5 minutes\" to reduce perceived effort",
        "Mention expected results within a timeframe such as \"Get your first shortlist in under 1 hour\"",
        "Reword features to highlight automation: \"Automatically screens resumes so you don't have to\""
      ]
    },
    trust: {
      id: "trust",
      title: "Trust",
      score: 78,
      color: "#22C55E",
      description: "Strong trust signals with testimonials and social proof, but could benefit from more specific credibility indicators."
    },
    conversion: {
      id: "conversion",
      title: "Conversion",
      score: 72,
      color: "#10B981",
      description: "Good conversion elements present, but could be optimized with stronger urgency and clearer value proposition."
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-6 pt-24 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Audit result for serrand.co.uk
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>28/07/2025</span>
          </div>
        </div>

        {/* Main Score */}
        <div className="text-center mb-12">
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="80"
                stroke="currentColor"
                strokeWidth="16"
                fill="transparent"
                className="text-muted-foreground/20"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                stroke="#3B82F6"
                strokeWidth="16"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 80}`}
                strokeDashoffset={`${2 * Math.PI * 80 * (1 - 73 / 100)}`}
                className="transition-all duration-500 ease-in-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm text-muted-foreground">Total score</span>
              <span className="text-4xl font-bold text-foreground">73%</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-3">You're on the right track!</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Your Clarity is solid. Now boost conversions by adding urgency, 
            emotional trust, and clearer audience targeting.
          </p>
        </div>

        {/* Score Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <CircularProgress value={70} color="#EAB308" label="Clarity" />
          <CircularProgress value={78} color="#22C55E" label="Trust" />
          <CircularProgress value={72} color="#10B981" label="Conversion" />
        </div>

        {/* Layout with Sidebar Navigation */}
        <div className="flex gap-8">
          {/* Left Navigation Sidebar */}
          <div className="w-53 flex-shrink-0">
            <div className="sticky top-8 bg-card border border-border rounded-lg p-4">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center justify-between p-3 text-left rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <span className="font-medium">{item.label}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-12">
            <AuditSection {...auditData.clarity} />
            <AuditSection {...auditData.dreamOutcome} />
            <AuditSection {...auditData.timeDelayEffort} />
            <AuditSection {...auditData.trust} />
            <AuditSection {...auditData.conversion} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditReport;
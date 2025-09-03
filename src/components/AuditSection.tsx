import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Lightbulb } from "lucide-react";

interface AuditSectionProps {
  id: string;
  title: string;
  score: number;
  description?: string;
  workingWell?: string[];
  missing?: string[];
  recommendations?: string[];
}

const AuditSection = ({
  id,
  title,
  score,
  description,
  workingWell,
  missing,
  recommendations
}: AuditSectionProps) => {
  // Determine color, badge, and title based on score
  const getScoreInfo = (score: number) => {
    if (score >= 85) {
      return {
        color: "var(--color-excellent)",
        badge: {
          text: "Excellent",
          bgColor: "bg-green-100",
          textColor: "text-green-800"
        },
        title: "You Are Close to Conversion Ready"
      };
    } else if (score >= 70) {
      return {
        color: "var(--color-excellent)",
        badge: {
          text: "Good",
          bgColor: "bg-green-100",
          textColor: "text-green-800"
        },
        title: "Almost There with Just a Few Tweaks"
      };
    } else if (score >= 55) {
      return {
        color: "var(--color-needs-improvement)",
        badge: {
          text: "Needs Improvement",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800"
        },
        title: "You Are on the Right Track"
      };
    } else if (score >= 40) {
      return {
        color: "var(--color-poor)",
        badge: {
          text: "Poor",
          bgColor: "bg-red-100",
          textColor: "text-red-800"
        },
        title: "You Have Potential and It Shows"
      };
    } else {
      return {
        color: "var(--color-poor)",
        badge: {
          text: "Failed",
          bgColor: "bg-red-100",
          textColor: "text-red-800"
        },
        title: "Let's Fix This From the Ground Up"
      };
    }
  };

  const scoreInfo = getScoreInfo(score);
  const progressColor = scoreInfo.color;
  const badge = scoreInfo.badge;
  return (
    <section id={id}>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="relative w-29 h-29">
              <svg className="w-29 h-29 transform -rotate-90" viewBox="0 0 64 64">
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="transparent"
                  className="text-muted-foreground/20"
                />
                <circle
                  cx="32"
                  cy="32"
                  r="26"
                  stroke={progressColor}
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 26}`}
                  strokeDashoffset={`${2 * Math.PI * 26 * (1 - score / 100)}`}
                  className="transition-all duration-500 ease-in-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-foreground">{score}%</span>
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl">{title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1 italic">
                {scoreInfo.title}
              </p>
              {badge && (
                <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${badge.bgColor} ${badge.textColor} rounded-full mt-2`}>
                  {badge.text}
                </span>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {description && (
            <p className="text-muted-foreground mb-6">
              {description}
            </p>
          )}
          
          {workingWell && workingWell.length > 0 && (
            <div>
              <h5 className="font-medium text-green-700 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                What's working well:
              </h5>
              <ul className="text-sm text-muted-foreground space-y-2 ml-6">
                {workingWell.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          )}
          
          {missing && missing.length > 0 && (
            <div>
              <h5 className="font-medium text-red-700 mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                What's missing:
              </h5>
              <ul className="text-sm text-muted-foreground space-y-2 ml-6">
                {missing.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          )}
          
          {recommendations && recommendations.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h5 className="font-medium text-green-700 mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                Recommendation
              </h5>
              <ul className="text-sm text-green-700 space-y-2">
                {recommendations.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default AuditSection;
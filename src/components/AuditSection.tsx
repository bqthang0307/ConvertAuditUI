import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, Lightbulb } from "lucide-react";

interface AuditSectionProps {
  id: string;
  title: string;
  score: number;
  color: string;
  badge?: {
    text: string;
    bgColor: string;
    textColor: string;
  };
  description?: string;
  workingWell?: string[];
  missing?: string[];
  recommendations?: string[];
}

const AuditSection = ({
  id,
  title,
  score,
  color,
  badge,
  description,
  workingWell,
  missing,
  recommendations
}: AuditSectionProps) => {
  return (
    <section id={id}>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
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
                  stroke={color}
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
              {badge && (
                <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${badge.bgColor} ${badge.textColor} rounded-full`}>
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
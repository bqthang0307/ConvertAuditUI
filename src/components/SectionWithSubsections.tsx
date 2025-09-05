import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import activityIcon from "@/assets/Icon/activity.svg";
import likeIcon from "@/assets/Icon/like.svg";
import tickIcon from "@/assets/Icon/Tick.svg";

interface SubsectionData {
  id: string;
  title: string;
  score: number;
  description?: string;
  workingWell?: string[];
  missing?: string[];
  recommendations?: string[];
}

interface SectionWithSubsectionsProps {
  id: string;
  title: string;
  score: number;
  description?: string;
  subsections: SubsectionData[];
  // Customization options
  showMainDescription?: boolean;
  subsectionBorderColor?: string;
  mainProgressSize?: 'sm' | 'md' | 'lg';
}

const SectionWithSubsections = ({
  id,
  title,
  score,
  description,
  subsections,
  showMainDescription = true,
  mainProgressSize = 'lg'
}: SectionWithSubsectionsProps) => {
  // Determine color, badge, and title based on score
  const getScoreInfo = (score: number) => {
    if (score >= 85) {
      return {
        color: "var(--color-excellent)",
        badge: {
          text: "Excellent",
          bgColor: "bg-excellent-50",
          textColor: "text-excellent-600"
        },
        title: "You Are Close to Conversion Ready"
      };
    } else if (score >= 70) {
      return {
        color: "var(--color-excellent)",
        badge: {
          text: "Good",
          bgColor: "bg-excellent-50",
          textColor: "text-excellent-800"
        },
        title: "Almost There with Just a Few Tweaks"
      };
    } else if (score >= 55) {
      return {
        color: "var(--color-needs-improvement)",
        badge: {
          text: "Needs Improvement",
          bgColor: "bg-good-50",
          textColor: "text-good-600"
        },
        title: "You Are on the Right Track"
      };
    } else if (score >= 40) {
      return {
        color: "var(--color-poor)",
        badge: {
          text: "Poor",
          bgColor: "bg-warning-50",
          textColor: "text-warning-600"
        },
        title: "You Have Potential and It Shows"
      };
    } else {
      return {
        color: "var(--color-poor)",
        badge: {
          text: "Failed",
          bgColor: "bg-danger-50",
          textColor: "text-danger-500"
        },
        title: "Let's Fix This From the Ground Up"
      };
    }
  };

  const mainScoreInfo = getScoreInfo(score);
  const progressColor = mainScoreInfo.color;

  // Size configurations for progress circles
  const getProgressSize = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm':
        return { container: 'w-12 h-12', viewBox: '0 0 48 48', cx: '24', cy: '24', r: '20', strokeWidth: '3', textSize: 'text-xs' };
      case 'md':
        return { container: 'w-14 h-14', viewBox: '0 0 56 56', cx: '28', cy: '28', r: '24', strokeWidth: '3', textSize: 'text-sm' };
      case 'lg':
        return { container: 'w-29 h-29', viewBox: '0 0 64 64', cx: '32', cy: '32', r: '26', strokeWidth: '4', textSize: 'text-sm' };
      default:
        return { container: 'w-16 h-16', viewBox: '0 0 64 64', cx: '32', cy: '32', r: '26', strokeWidth: '4', textSize: 'text-sm' };
    }
  };

  const mainSize = getProgressSize(mainProgressSize);

  return (
    <section id={id}>
      <Card className="mt-0 bg-background">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className={`relative ${mainSize.container}`}>
              <svg className={`${mainSize.container} transform -rotate-90`} viewBox={mainSize.viewBox}>
                <circle
                  cx={mainSize.cx}
                  cy={mainSize.cy}
                  r={mainSize.r}
                  stroke="currentColor"
                  strokeWidth={mainSize.strokeWidth}
                  fill="transparent"
                  className="text-light-bg-400"
                />
                <circle
                  cx={mainSize.cx}
                  cy={mainSize.cy}
                  r={mainSize.r}
                  stroke={progressColor}
                  strokeWidth={mainSize.strokeWidth}
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * parseInt(mainSize.r)}`}
                  strokeDashoffset={`${2 * Math.PI * parseInt(mainSize.r) * (1 - score / 100)}`}
                  className="transition-all duration-500 ease-in-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-h6 text-foreground`}>{score}%</span>
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl mb-2" >{title}</CardTitle>
              {showMainDescription && description && (
                <p className="text-muted-foreground mb-6">
                  {description}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">


          {/* Subsections */}
          {subsections.map((subsection) => {
            const subsectionScoreInfo = getScoreInfo(subsection.score);
            const subsectionBadge = subsectionScoreInfo.badge;

            return (
              <div id={subsection.id} key={subsection.id} >
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <h4 className="text-h6 text-dark-bg">{subsection.title}</h4>
                    </div>
                    {subsectionBadge && (
                      <div className={`inline-flex items-center px-2 py-1 text-xs font-medium
                        ${subsectionBadge.bgColor} ${subsectionBadge.textColor} rounded-sm border border-current`}>
                        <img src={likeIcon} alt="acitivityIcon" className={`w-6 h-6 inline ${subsectionBadge.textColor}`} />
                        <span className={`inline-flex items-center px-2 py-1 text-xs`}>
                          {subsectionBadge.text}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className={`mb-6`}>
                  <img src={activityIcon} alt="acitivityIcon" className="w-6 h-6 inline mr-0.5 pb-1" />
                  <span className={`text-title-18 text-primary-CTA inline`}>{subsection.score}%</span>
                </div>

                <div className="space-y-6">
                  {subsection.workingWell && subsection.workingWell.length > 0 && (
                    <div>
                      <h5 className="mb-2 flex items-center text-title-18 text-dark-bg-300">
                        What's working well:
                      </h5>
                      <ul className="text-body-lg text-dark-bg-300 space-y-1 ml-6">
                        {subsection.workingWell.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {subsection.missing && subsection.missing.length > 0 && (
                    <div>
                      <h5 className="mb-2 flex items-center text-title-18 text-dark-bg-300">
                        What's missing:
                      </h5>
                      <ul className="text-body-lg text-dark-bg-300 space-y-1 ml-6">
                        {subsection.missing.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {subsection.recommendations && subsection.recommendations.length > 0 && (
                    <div className="bg-excellent-50 border border-green-200 rounded-lg p-4">
                      <h5 className="text-h6 mb-2 flex items-center gap-2 text-dark-bg">
                      <img src={tickIcon} className="w-5 h-5 rounded-full border border-dark-bg"/>
                        Recommendation
                      </h5>
                      <ul className="text-body-lg text-dark-bg-300 space-y-1">
                        {subsection.recommendations.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </section>
  );
};

export default SectionWithSubsections;

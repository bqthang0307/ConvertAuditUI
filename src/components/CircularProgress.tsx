interface CircularProgressProps {
  value: number;
  label: string;
  isPrimaryColor?: boolean;
}

const CircularProgress = ({ value, label, isPrimaryColor }: CircularProgressProps) => {
  // Determine color and title based on value
  const getScoreInfo = (score: number) => {
    if (isPrimaryColor) {
      return {
        color: "var(--color-primary)",
        title: "You Are Close to Conversion Ready"
      };
    }else if (score >= 85) {
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

  const scoreInfo = getScoreInfo(value);
  const progressColor = scoreInfo.color;

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="relative w-46 h-46">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-light-bg-400"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={progressColor}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 40}`}
            strokeDashoffset={`${2 * Math.PI * 40 * (1 - value / 100)}`}
            className="transition-all duration-500 ease-in-out"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-h5 text-dark-bg">{value}%</span>
        </div>
      </div>
      <div className="text-center">
        <span className="text-title-18 sm:text-h6 text-dark-bg">{label}</span>
      </div>
    </div>
  );
};

export default CircularProgress;
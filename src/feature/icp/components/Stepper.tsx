export default function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const dot = (n: 1 | 2 | 3) => {
    const active = step >= n;
    return (
      <div className="flex items-center">
        <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2
          ${active ? "border-lime-400 bg-lime-400 text-white" : "border-gray-300 bg-white text-gray-400"}`}>
          {active ? "✓" : n}
        </div>
        {n !== 3 && <div className={`mx-2 h-[2px] w-16 ${step > n ? "bg-lime-400" : "bg-gray-200"}`} />}
      </div>
    );
  };

  return (
    <div className="mb-6 flex items-center justify-center">{dot(1)}{dot(2)}{dot(3)}</div>
  );
}

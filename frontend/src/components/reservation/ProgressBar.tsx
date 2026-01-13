interface ProgressBarProps {
  step: 1 | 2 | 3 | 4;
}

const ProgressBar = ({ step }: ProgressBarProps) => {
  return (
    <div className="mb-6 sm:mb-12">
      <div className="flex items-center justify-between relative mb-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`sm:w-10 w-8 sm:h-10 h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold border-2 transition-all duration-300 ${
              step >= s
                ? "bg-stone-900 border-stone-900 text-white shadow-lg scale-105"
                : "bg-white/10 border-stone-400/15 text-stone-600"
            }`}
          >
            {s}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs font-bold text-stone-700 uppercase tracking-widest px-1">
        <span>Date & Time</span>
        <span>Seating Area</span>
        <span>Details</span>
      </div>
    </div>
  );
};

export default ProgressBar;

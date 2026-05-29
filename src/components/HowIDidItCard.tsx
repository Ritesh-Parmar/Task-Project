interface HowIDidItItem {
  imageSrc: string;
  title: string;
  description: string;
}

interface HowIDidItCardProps {
  items: HowIDidItItem[];
  darkMode: boolean;
}

function HowIDidItCard({ items, darkMode }: HowIDidItCardProps) {
  return (
    <div
      className={`relative z-50 w-[420px] max-h-[360px] overflow-y-auto rounded-2xl border p-4 shadow-[0_22px_50px_-35px_rgba(15,23,42,0.75)] ${
        darkMode
          ? "border-white/10 bg-slate-900/95"
          : "border-slate-200/80 bg-white/95"
      }`}
    >
      <div className="flex flex-col gap-4">
        {items.map((item, index) => (
          <div key={`${item.title}-${index}`} className="flex flex-col gap-3">
            <div
              className={`rounded-xl border ${
                darkMode
                  ? "border-white/10 bg-slate-800/80"
                  : "border-slate-200/70 bg-slate-100"
              }`}
            >
              <img
                src={item.imageSrc}
                alt={item.title}
                className="w-full object-contain"
              />
            </div>
            <div>
              <p className={`text-sm font-semibold ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
                {item.title}
              </p>
              <p className={`mt-1 text-xs leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowIDidItCard;

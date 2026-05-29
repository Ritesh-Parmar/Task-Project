interface CardProps {
  name: string;
  email: string;
  avatar: string;
  darkMode: boolean;
}

function Card({ name, email, avatar, darkMode }: CardProps) {
  return (
    <div
      className={`rounded-2xl p-4 border flex items-center gap-4 shadow-[0_15px_35px_-25px_rgba(15,23,42,0.6)] ${
        darkMode
          ? "bg-slate-900/80 border-white/10"
          : "bg-white/90 border-slate-200/80"
      }`}
    >
      <img
        src={avatar}
        alt={name}
        className={`w-12 h-12 rounded-full ring-2 shadow-sm ${
          darkMode ? "ring-slate-800" : "ring-white"
        }`}
      />
      <div className="min-w-0">
        <h3 className={`font-semibold truncate ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
          {name}
        </h3>
        <p className={`text-sm truncate ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          {email}
        </p>
      </div>
    </div>
  );
}

export default Card;
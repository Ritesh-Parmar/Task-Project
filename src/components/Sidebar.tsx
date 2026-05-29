type Page = "home" | "users" | "settings";

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  darkMode: boolean;
}

const navItems = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "users", label: "Users", icon: "👥" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

function Sidebar({ currentPage, setCurrentPage, darkMode }: SidebarProps) {
  return (
    <aside
      className={`w-64 h-screen flex flex-col px-5 py-6 gap-5 border-r ${
        darkMode
          ? "bg-[#0b1118] text-slate-100 border-white/10"
          : "bg-stone-100 text-slate-900 border-slate-200/80"
      }`}
    >
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-wide">Ritesh Parmar</h1>
        <a
          href="https://ritesh-parmar-portfoliov2.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className={`mt-2 block text-xs font-medium ${
            darkMode ? "text-slate-300 hover:text-slate-100" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          ritesh-parmar-portfoliov2.vercel.app
        </a>
        <p className={`text-xs uppercase tracking-[0.2em] mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          Sample Project
        </p>
      </div>
      <div className="pt-20" />
      <div className="flex flex-col gap-20">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id as Page)}
            aria-current={currentPage === item.id ? "page" : undefined}
            className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200
              ${
                currentPage === item.id
                  ? darkMode
                    ? "bg-cyan-400/15 text-cyan-200 ring-1 ring-cyan-400/30"
                    : "bg-emerald-500/15 text-emerald-800 ring-1 ring-emerald-500/20"
                  : darkMode
                    ? "text-slate-300 hover:bg-white/5 hover:text-slate-100"
                    : "text-slate-600 hover:bg-white hover:text-slate-900"
              }`}
          >
            <span className="text-lg" aria-hidden="true">
              {item.icon}
            </span>
            <span className="text-sm font-medium tracking-wide">{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
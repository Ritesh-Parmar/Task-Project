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
      className={`w-full md:w-64 h-auto md:h-screen flex flex-col px-4 sm:px-5 py-4 md:py-6 gap-4 md:gap-5 border-b md:border-b-0 md:border-r ${
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
      <div className="hidden md:block pt-20" />
      <div className="mt-16 gap-5 flex flex-row flex-wrap justify-center md:justify-start md:flex-col gap-3 md:gap-12">
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
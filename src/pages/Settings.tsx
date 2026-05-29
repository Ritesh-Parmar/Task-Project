interface SettingsProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

function Settings({ darkMode, setDarkMode }: SettingsProps) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className={`text-3xl font-semibold ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
          Settings ⚙️
        </h1>
        <p className={`mt-2 text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          Personalize how the workspace looks and feels.
        </p>
      </div>

      <div
        className={`rounded-2xl p-6 border shadow-[0_18px_45px_-35px_rgba(15,23,42,0.7)] ${
          darkMode
            ? "bg-slate-900/70 border-white/10"
            : "bg-white/90 border-slate-200/80"
        }`}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className={`text-lg font-semibold ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
              Dark Mode
            </h2>
            <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
              Switch between light and low-light themes.
            </p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-16 h-8 rounded-full transition-colors duration-300 relative ${
              darkMode ? "bg-emerald-400" : "bg-slate-300"
            }`}
          >
            <span
              className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-all duration-300 ${
                darkMode ? "left-9" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
import { useEffect, useState } from "react";
import HowIDidItCard from "../components/HowIDidItCard";
import Cubes from "../components/Cubes";
import howImageOne from "../assets/i1.png";
import howImageTwo from "../assets/i2.png";
import howImageThree from "../assets/i3.png";
import howImageFour from "../assets/i4.png";

interface HomeProps {
    darkMode: boolean;
}

function Home({ darkMode }: HomeProps) {
    const [showHowIDidIt, setShowHowIDidIt] = useState(false);
    const [showThemeHowIdIdIt, setShowThemeHowIdIdIt] = useState(false);
    const now = new Date();
    const fullDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(now);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            if (!target) return;
            if (target.closest("[data-howididit-card]") || target.closest("[data-howididit-trigger]")) {
                return;
            }
            if (showHowIDidIt) setShowHowIDidIt(false);
            if (showThemeHowIdIdIt) setShowThemeHowIdIdIt(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showHowIDidIt, showThemeHowIdIdIt]);

    return (
        <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                    <h1 className={`text-3xl sm:text-4xl font-semibold tracking-tight ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
                        Hi Sir!👋
                    </h1>
                    <p className={`mt-2 max-w-3xl text-sm sm:text-base ${darkMode ? "text-slate-300" : "text-slate-600"}`}>
                        So I have completed the task you gave.. and this application itself will tell you how I did each of the tasks which were mentioned in the PDF. You are currently viewing the Home screen of this application and just a little below this page you will find the summary of how each task was done by me.
                    </p>
                </div>
                <div
                    className={`rounded-2xl border px-5 py-4 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.7)] ${
                        darkMode
                            ? "bg-slate-900/80 border-white/10"
                            : "bg-white/80 border-slate-200/80"
                    }`}
                >
                    <p className={`text-xs uppercase tracking-[0.2em] ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                        Today
                    </p>
                    <p className={`text-lg font-semibold mt-1 ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
                        {fullDate}
                    </p>

                </div>
            </div>

            <div className="relative lg:pl-64">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div
                        className={`w-full sm:w-max text-center sm:text-left rounded-full px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base font-semibold tracking-wide shadow-[0_16px_36px_-22px_rgba(15,23,42,0.7)] ${
                            darkMode
                                ? "bg-slate-800/80 text-slate-100 border border-white/10"
                                : "bg-slate-900 text-white"
                        }`}
                    >
                        Sidebar navigation
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowHowIDidIt((prev) => !prev)}
                        data-howididit-trigger
                        className="w-full sm:w-auto rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(16,185,129,0.6)] transition hover:bg-emerald-600 active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                    >
                        How I did it
                    </button>
                    <div className={`${darkMode ? "text-slate-400" : "text-slate-500"} hidden lg:block`}>
                        {"<-- try clicking this button"}
                    </div>
                </div>
                {showHowIDidIt && (
                    <div className="mt-4 lg:mt-0 lg:absolute lg:right-48" data-howididit-card>
                        <HowIDidItCard
                            darkMode={darkMode}
                            items={[
                                {
                                    imageSrc: howImageOne,
                                    title: "Made a separate component for the sidebar",
                                    description:
                                        "I made this a separate component because this makes the whole code modular and increases the moudularity in the code",
                                },
                                {
                                    imageSrc: howImageTwo,
                                    title: "useState hook to set the current page",
                                    description:
                                        "this variable is then used to set which page is rendered",
                                },
                                {
                                    imageSrc: howImageThree,
                                    title: "renderPage() function",
                                    description:
                                        "This function is written in the App.tsx.. it decides which page is to be shown",
                                },

                            ]}
                        />
                    </div>
                )}
            </div>
            <div className={`hidden lg:flex -mt-7 flex-col pl-80 text-xl font-semibold leading-5 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
            </div>
            <span className={`hidden lg:block -mt-9 text-2xl font-semibold ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                {"<--------------------------------"}
            </span>
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
                <span className={`hidden lg:inline -mt-4 text-xl font-semibold ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                    {"<----------go to this page----------------------"}
                </span>
                <div
                    className={`w-full lg:w-max lg:-mt-4 rounded-2xl px-6 sm:px-7 py-3 text-sm sm:text-base tracking-wide shadow-[0_16px_36px_-22px_rgba(15,23,42,0.7)] ${
                        darkMode
                            ? "bg-slate-800/80 text-slate-100 border border-white/10"
                            : "bg-slate-900 text-white"
                    }`}
                >
                    1. API fetch with loading/error state 
                    <br />
                    2. Search + filter UI
                    <br />
                    3. Local storage persistence
                    <br />
                    4. Reusable card/list component
                    <br />
                    5. Pagination
                    <br />

                </div>
            </div>
            
                <span className={`hidden lg:block -mt-8 text-xl font-semibold ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                    {"<----------go to this page-----------"}
                </span>
                <span className={`hidden lg:flex -mt-10 pl-80 text-xl flex-col leading-5 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                    <span>|</span>
                    <span>|</span>
                </span>
                <div className="relative -mt-4 flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 lg:ml-48">
                    <div
                        className={`w-full sm:w-max text-center sm:text-left rounded-2xl px-6 sm:px-7 py-3 text-sm sm:text-base tracking-wide shadow-[0_16px_36px_-22px_rgba(15,23,42,0.7)] ${
                            darkMode
                                ? "bg-slate-800/80 text-slate-100 border border-white/10"
                                : "bg-slate-900 text-white"
                        }`}
                    >
                        Dark/light mode toggle
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowThemeHowIdIdIt((prev) => !prev)}
                        data-howididit-trigger
                        className="w-full sm:w-auto rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(16,185,129,0.6)] transition hover:bg-emerald-600 active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                    >
                        How I did it
                    </button>
                </div>
                {showThemeHowIdIdIt && (
                    <div className="mt-4 lg:absolute lg:right-64 lg:mt-72" data-howididit-card>
                        <HowIDidItCard
                            darkMode={darkMode}
                            items={[
                                {
                                    imageSrc: howImageFour,
                                    title: "useState hook to manage theme",
                                    description:
                                        "I used React's useState hook to create a state variable for the theme (dark or light) and a function to toggle it.",
                                }
                            ]}
                        />
                    </div>
                )}
            <div
                className={`mt-12 w-full rounded-3xl border p-4 sm:p-6 ${
                    darkMode
                        ? "bg-slate-900/70 border-white/10"
                        : "bg-white/70 border-slate-200/80"
                }`}
            >
                <Cubes
                    gridSize={16}
                    maxAngle={45}
                    radius={5}
                    cellGap={6}
                    borderStyle={
                        darkMode
                            ? "1px solid rgba(255, 255, 255, 0.3)"
                            : "1px solid rgba(15, 23, 42, 0.15)"
                    }
                    faceColor={darkMode ? "#0b1220" : "#f8fafc"}
                    rippleColor={darkMode ? "#22d3ee" : "#34d399"}
                    rippleSpeed={1.4}
                    shadow={darkMode ? "0 10px 24px rgba(8, 15, 30, 0.45)" : "0 10px 24px rgba(15, 23, 42, 0.12)"}
                    autoAnimate={true}
                    rippleOnClick={true}
                />
            </div>
        </div>
    );
}

export default Home;
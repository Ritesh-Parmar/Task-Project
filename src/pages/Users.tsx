import { useEffect, useState } from "react";
import Card from "../components/Card";
import HowIDidItCard from "../components/HowIDidItCard";
import howImageFive from "../assets/i5.png";
import howImageSix from "../assets/i6.png";
import howImageSeven from "../assets/i7.png";
import howImageEight from "../assets/i8.png";
import howImageNine from "../assets/i9.png";
import howImageTen from "../assets/i10.png"



interface User {
    id: number;
    name: string;
    email: string;
}

interface UsersProps {
    darkMode: boolean;
}

function Users({ darkMode }: UsersProps) {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [activeHowIdIdIt, setActiveHowIdIdIt] = useState<string | null>(null);
    const usersPerPage = 5;

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch users");
                return res.json();
            })
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            if (!target) return;
            if (target.closest("[data-howididit-card]") || target.closest("[data-howididit-trigger]")) {
                return;
            }
            if (activeHowIdIdIt) setActiveHowIdIdIt(null);
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [activeHowIdIdIt]);

    if (loading) return <div className={darkMode ? "text-slate-400" : "text-gray-500"}>Loading users...</div>;
    if (error) return <div className={darkMode ? "text-rose-400" : "text-red-500"}>Error: {error}</div>;

    return (
        <div className="flex flex-col gap-5">
            <div className="relative">
                <div className="flex flex-wrap items-center gap-3">
                    <h1 className={`text-3xl font-semibold ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
                        Users 👥
                    </h1>
                    <div className="flex items-center gap-2 ml-6">
                        <span
                            className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-[0_14px_30px_-22px_rgba(15,23,42,0.6)] ${
                                darkMode
                                    ? "bg-slate-800/80 text-slate-100 border border-white/10"
                                    : "bg-slate-900 text-white"
                            }`}
                        >
                            API fetch with loading/error state
                        </span>
                        <button
                            type="button"
                            onClick={() =>
                                setActiveHowIdIdIt((prev) => (prev === "api" ? null : "api"))
                            }
                            data-howididit-trigger
                            className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_14px_30px_-18px_rgba(16,185,129,0.6)] transition hover:bg-emerald-600 active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                        >
                            How I did it
                        </button>
                    </div>
                </div>
                <p className={`text-sm mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Manage contacts and track who is active today.
                </p>
                {activeHowIdIdIt === "api" && (
                    <div className="absolute right-11 top-10" data-howididit-card>
                        <HowIDidItCard
                            darkMode={darkMode}
                            items={[
                                {
                                    imageSrc: howImageFive,
                                    title: "API fetch + states",
                                    description:
                                        "This is the API I used to fetch the users data. This is a FREE PUBLIC API called JsonPlaceholder. I also implemented loading and error states to handle different scenarios during the fetch process.",
                                },
                            ]}
                        />
                    </div>
                )}
            </div>
            <div className="relative">
                <span
                    className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                        darkMode ? "text-slate-500" : "text-slate-400"
                    }`}
                >
                    🔎
                </span>
                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => {setSearch(e.target.value); setCurrentPage(1);}}
                    className={`w-full rounded-2xl border px-12 py-3 text-sm shadow-[0_15px_35px_-30px_rgba(15,23,42,0.6)] focus:outline-none focus:ring-2 focus:ring-emerald-400/60 ${
                        darkMode
                            ? "border-white/10 bg-slate-900/70 text-slate-100 placeholder:text-slate-500"
                            : "border-slate-200/80 bg-white/90 text-slate-700"
                    }`}
                />
            </div>
            <div className="relative flex flex-wrap items-center gap-2">
                <span
                    className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-[0_14px_30px_-22px_rgba(15,23,42,0.6)] ${
                        darkMode
                            ? "bg-slate-800/80 text-slate-100 border border-white/10"
                            : "bg-slate-900 text-white"
                    }`}
                >
                    Search + filter UI
                </span>
                
                <button
                    type="button"
                    onClick={() =>
                        setActiveHowIdIdIt((prev) => (prev === "search" ? null : "search"))
                    }
                    data-howididit-trigger
                    className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_14px_30px_-18px_rgba(16,185,129,0.6)] transition hover:bg-emerald-600 active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                >
                    How I did it
                </button>
                <div className="flex flex-col mt-5">

                <span className={`-mt-8 font-semibold ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                    {"_______________|"}
                </span>
                <span className={`-mt-10 pl-24 flex flex-col ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                    <span className="pt-2">^</span>
                </span>
                </div>
                <div className="ml-48">
                    <span
                        className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-[0_14px_30px_-22px_rgba(15,23,42,0.6)] ${
                            darkMode
                                ? "bg-slate-800/80 text-slate-100 border border-white/10"
                                : "bg-slate-900 text-white"
                        }`}
                    >
                    Local storage persistence
                </span>
                <button
                    type="button"
                    onClick={() =>
                        setActiveHowIdIdIt((prev) => (prev === "local" ? null : "local"))
                    }
                    data-howididit-trigger
                    className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_14px_30px_-18px_rgba(16,185,129,0.6)] transition hover:bg-emerald-600 active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                >
                    How I did it
                </button>
                </div>
            </div>
            {activeHowIdIdIt === "search" && (
                <div className="absolute right-80 top-32" data-howididit-card>
                    <HowIDidItCard
                        darkMode={darkMode}
                        items={[
                            {
                                imageSrc: howImageSix,
                                title: "filteredUsers() function",
                                description:
                                    "",
                            },
                            {
                                imageSrc: howImageSeven,
                                title: "Use of map function",
                                description:
                                    "this is how the component card is reused using props",
                            },
                            {
                                imageSrc: howImageEight,
                                title: "Notice!",
                                description:
                                    "Notice how after every search even if you are on a differnt page it will redirect you to the page 1",
                            },
                        ]}
                    />
                </div>
            )}
            {activeHowIdIdIt === "local" && (
                <div className="absolute right-11 top-48" data-howididit-card>
                    <HowIDidItCard
                        darkMode={darkMode}
                        items={[
                            {
                                imageSrc: howImageNine,
                                title: "Local storage persistence",
                                description:
                                    "in this way the system uses local storage to remember the theme preference even after the user leaves or refreshes the page.",
                            },
                        ]}
                    />
                </div>
            )}
            <div className="relative flex flex-wrap items-center gap-2">
                <span
                    className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-[0_14px_30px_-22px_rgba(15,23,42,0.6)] ${
                        darkMode
                            ? "bg-slate-800/80 text-slate-100 border border-white/10"
                            : "bg-slate-900 text-white"
                    }`}
                >
                    Reusable card/list component
                </span>
                <button
                    type="button"
                    onClick={() =>
                        setActiveHowIdIdIt((prev) => (prev === "card" ? null : "card"))
                    }
                    data-howididit-trigger
                    className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_14px_30px_-18px_rgba(16,185,129,0.6)] transition hover:bg-emerald-600 active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                >
                    How I did it
                </button>
                <div className="flex flex-col-reverse">
            <span className={`-mt-8 font-semibold ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                    {"---------|"}
                </span>
                <span className={`-mt-1 flex flex-col ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                    <span className="inline-block translate-y-2 translate-x-14">V</span>
                </span>

                </div>
            </div>
            {activeHowIdIdIt === "card" && (
                <div className="absolute left-1/2 top-64" data-howididit-card>
                    <HowIDidItCard
                        darkMode={darkMode}
                        items={[
                            {
                                imageSrc: howImageSeven,
                                title: "Reusable card/list using props",
                                description:
                                    "Created a reusable card layout to keep the list consistent and easy to extend.",
                            },
                        ]}
                    />
                </div>
            )}
            <div className="grid gap-4">
                {paginatedUsers.map((user) => (
                    <Card
                        key={user.id}
                        name={user.name}
                        email={user.email}
                        avatar={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                        darkMode={darkMode}
                    />
                ))}
            </div>

            <div className="relative flex flex-wrap items-center gap-2">
                <span
                    className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-[0_14px_30px_-22px_rgba(15,23,42,0.6)] ${
                        darkMode
                            ? "bg-slate-800/80 text-slate-100 border border-white/10"
                            : "bg-slate-900 text-white"
                    }`}
                >
                    Pagination
                </span>
                <button
                    type="button"
                    onClick={() =>
                        setActiveHowIdIdIt((prev) => (prev === "pagination" ? null : "pagination"))
                    }
                    data-howididit-trigger
                    className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_14px_30px_-18px_rgba(16,185,129,0.6)] transition hover:bg-emerald-600 active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                >
                    How I did it
                </button>
            </div>
            {activeHowIdIdIt === "pagination" && (
                <div className="absolute ml-60 bottom-2" data-howididit-card>
                    <HowIDidItCard
                        darkMode={darkMode}
                        items={[
                            {
                                imageSrc: howImageTen,
                                title: "Pagination controls",
                                description:
                                    "",
                            },
                        ]}
                    />
                </div>
            )}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-2">
                <p className={`text-xs uppercase tracking-[0.2em] ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Page {currentPage} of {totalPages}
                </p>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setCurrentPage((p) => p - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-full text-sm font-medium disabled:opacity-40 ${
                            darkMode
                                ? "bg-slate-800/80 text-slate-100 hover:bg-slate-700"
                                : "bg-slate-200/80 text-slate-700 hover:bg-slate-300"
                        }`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentPage((p) => p + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-full text-sm font-medium disabled:opacity-40 ${
                            darkMode
                                ? "bg-emerald-400 text-slate-950 hover:bg-emerald-300"
                                : "bg-emerald-500/80 text-white hover:bg-emerald-500"
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Users;
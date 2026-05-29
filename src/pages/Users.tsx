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
    avatar: string;
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
    const usersPerPage = 6;

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * usersPerPage,
        currentPage * usersPerPage
    );

    useEffect(() => {
        fetch("https://randomuser.me/api/?results=30&nat=us,ca,gb")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch users");
                return res.json();
            })
            .then((data) => {
                const results = Array.isArray(data?.results) ? data.results : [];
                const mappedUsers: User[] = results.map((user: any, index: number) => ({
                    id: index + 1,
                    name: `${user.name?.first ?? "User"} ${user.name?.last ?? ""}`.trim(),
                    email: user.email ?? `user${index + 1}@example.com`,
                    avatar: user.picture?.thumbnail ?? "",
                }));

                setUsers(mappedUsers);
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
        <div className="flex flex-col gap-8">
            <div className="relative">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
                    <h1 className={`text-3xl font-semibold ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
                        Users 👥
                    </h1>
                    <div className="flex flex-wrap items-center gap-2">
                        <span
                            className={`w-full sm:w-auto text-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-[0_14px_30px_-22px_rgba(15,23,42,0.6)] ${
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
                            className="w-full sm:w-auto rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_14px_30px_-18px_rgba(16,185,129,0.6)] transition hover:bg-emerald-600 active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                        >
                            How I did it
                        </button>
                    </div>
                </div>
                <p className={`text-sm mt-1 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Manage contacts and track who is active today.
                </p>
                {activeHowIdIdIt === "api" && (
                    <div className="mt-4 lg:mt-0 lg:absolute lg:right-11 lg:top-10" data-howididit-card>
                        <HowIDidItCard
                            darkMode={darkMode}
                            items={[
                                {
                                    imageSrc: howImageFive,
                                    title: "API fetch + states",
                                    description:
                                        "This is the API I used to fetch the users data. This is a FREE PUBLIC API called Random User. I also implemented loading and error states to handle different scenarios during the fetch process.",
                                },
                            ]}
                        />
                    </div>
                )}
            </div>
            <div
                className={`rounded-2xl border p-4 sm:p-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.6)] ${
                    darkMode
                        ? "border-white/10 bg-slate-900/60"
                        : "border-slate-200/80 bg-white/80"
                }`}
            >
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
                <div className="mt-4 grid gap-3 lg:grid-cols-2">
                    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                        <span
                            className={`w-full sm:w-auto text-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-[0_14px_30px_-22px_rgba(15,23,42,0.6)] ${
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
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                        <span
                            className={`w-full sm:w-auto text-center rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-[0_14px_30px_-22px_rgba(15,23,42,0.6)] ${
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
                            className="w-full sm:w-auto rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white shadow-[0_14px_30px_-18px_rgba(16,185,129,0.6)] transition hover:bg-emerald-600 active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                        >
                            How I did it
                        </button>
                    </div>
                </div>
            </div>
            {activeHowIdIdIt === "search" && (
                <div className="mt-4 lg:absolute lg:right-80 lg:top-32" data-howididit-card>
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
                <div className="mt-4 lg:absolute lg:right-11 lg:top-48" data-howididit-card>
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
            <div className="relative flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <span
                    className={`w-full sm:w-auto text-center rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-[0_14px_30px_-22px_rgba(15,23,42,0.6)] ${
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
                
            </div>
            {activeHowIdIdIt === "card" && (
                <div className="mt-4 lg:absolute lg:left-1/2 lg:top-64" data-howididit-card>
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
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {paginatedUsers.map((user) => (
                    <Card
                        key={user.id}
                        name={user.name}
                        email={user.email}
                        avatar={user.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                        darkMode={darkMode}
                    />
                ))}
            </div>

            <div className="relative flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <span
                    className={`w-full sm:w-auto text-center rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] shadow-[0_14px_30px_-22px_rgba(15,23,42,0.6)] ${
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
                <div className="mt-4 lg:absolute lg:ml-60 lg:bottom-2" data-howididit-card>
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
                <p className={`text-xs uppercase tracking-[0.2em] ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                    Page {currentPage} of {totalPages}
                </p>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setCurrentPage((p) => p - 1)}
                        disabled={currentPage === 1}
                        className={`w-full sm:w-auto px-4 py-2 rounded-full text-sm font-medium disabled:opacity-40 ${
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
                        className={`w-full sm:w-auto px-4 py-2 rounded-full text-sm font-medium disabled:opacity-40 ${
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
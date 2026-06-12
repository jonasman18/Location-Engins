// src/layouts/ClientLayout.tsx

import {
    Outlet,
    Link,
    useNavigate,
    useLocation
} from "react-router-dom";

import toast from "react-hot-toast";

export default function ClientLayout() {

    const navigate = useNavigate();

    const location = useLocation();

    // =========================================
    // ACTIVE MENU
    // =========================================

    const isActive = (path: string) => {

        return location.pathname === path;
    };

    // =========================================
    // MENU STYLE
    // =========================================

    const menuClass = (path: string) => {

        return `
            px-5
            py-4
            rounded-2xl
            transition
            font-medium
            flex
            items-center
            gap-3
            ${
                isActive(path)
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-slate-800 text-slate-200"
            }
        `;
    };

    // =========================================
    // LOGOUT
    // =========================================

    const logout = () => {

        sessionStorage.removeItem("access");

        sessionStorage.removeItem("refresh");

        sessionStorage.removeItem("role");

        toast.success("Déconnexion réussie");

        navigate("/");
    };

    return (

        <div className="min-h-screen bg-slate-100">

            <div className="flex">

                {/* ========================================= */}
                {/* SIDEBAR */}
                {/* ========================================= */}

                <aside className="w-72 min-h-screen bg-slate-900 text-white fixed left-0 top-0 p-6 flex flex-col justify-between">

                    <div>

                        {/* LOGO */}

                        <div className="mb-10">

                            <h1 className="text-3xl font-black">

                                🚜 Client

                            </h1>

                            <p className="text-slate-400 mt-2 text-sm">

                                Espace client

                            </p>

                        </div>

                        {/* MENU */}

                        <nav className="flex flex-col gap-3">

                            <Link
                                to="/client-dashboard"
                                className={
                                    menuClass(
                                        "/client-dashboard"
                                    )
                                }
                            >

                                <span>
                                    🏠
                                </span>

                                Dashboard

                            </Link>


                            <Link
                                to="/engins"
                                className={
                                    menuClass(
                                        "/engins"
                                    )
                                }
                            >

                                <span>
                                    🚜
                                </span>

                                Engins

                            </Link>


                            <Link
                                to="/reservations/add"
                                className={
                                    menuClass(
                                        "/reservations/add"
                                    )
                                }
                            >

                                <span>
                                    📅
                                </span>

                                Nouvelle réservation

                            </Link>


                            <Link
                                to="/reservations"
                                className={
                                    menuClass(
                                        "/reservations"
                                    )
                                }
                            >

                                <span>
                                    📋
                                </span>

                                Réservations

                            </Link>


                            <Link
                                to="/paiements/add"
                                className={
                                    menuClass(
                                        "/paiements/add"
                                    )
                                }
                            >

                                <span>
                                    💳
                                </span>

                                Paiements

                            </Link>

                        </nav>

                    </div>


                    {/* ========================================= */}
                    {/* LOGOUT */}
                    {/* ========================================= */}

                    <button
                        onClick={logout}
                        className="
                            w-full
                            bg-red-600
                            hover:bg-red-700
                            px-5
                            py-4
                            rounded-2xl
                            transition
                            font-semibold
                        "
                    >

                        Déconnexion

                    </button>

                </aside>


                {/* ========================================= */}
                {/* CONTENT */}
                {/* ========================================= */}

                <main className="ml-72 w-full min-h-screen">


                    {/* PAGE */}

                    <div className="p-8">

                        <Outlet />

                    </div>

                </main>

            </div>

        </div>
    );
}
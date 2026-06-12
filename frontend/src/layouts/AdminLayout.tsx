// src/layouts/AdminLayout.tsx

import {
    NavLink,
    Outlet,
    useNavigate
} from "react-router-dom";

import toast from "react-hot-toast";

export default function AdminLayout() {

    const navigate = useNavigate();

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

    // =========================================
    // ACTIVE MENU STYLE
    // =========================================

    const menuClass = ({ isActive }: { isActive: boolean }) =>

        `
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        transition
        font-medium
        text-[15px]
        ${
            isActive
            ? "bg-blue-600 text-white shadow-md"
            : "hover:bg-slate-800 text-slate-200"
        }
    `;

    return (

        <div className="min-h-screen bg-slate-100 flex overflow-hidden">

            {/* ========================================= */}
            {/* SIDEBAR */}
            {/* ========================================= */}

            <aside
                className="
                    w-64
                    bg-slate-900
                    text-white
                    h-screen
                    px-5
                    py-5
                    fixed
                    left-0
                    top-0
                    border-r
                    border-slate-800
                    flex
                    flex-col
                "
            >

                {/* LOGO */}

                <div className="mb-7">

                    <h1 className="text-2xl font-black">

                        🚜 Admin

                    </h1>

                    <p className="text-slate-400 mt-1 text-sm">

                        Gestion des locations

                    </p>

                </div>


                {/* MENU */}

                <nav className="space-y-2 flex-1 overflow-y-auto pr-1">

                    <NavLink
                        to="/admin-dashboard"
                        className={menuClass}
                    >

                        <span>🏠</span>

                        <span>Dashboard</span>

                    </NavLink>


                    <NavLink
                        to="/engins"
                        className={menuClass}
                    >

                        <span>🚜</span>

                        <span>Engins</span>

                    </NavLink>


                    <NavLink
                        to="/categories"
                        className={menuClass}
                    >

                        <span>📦</span>

                        <span>Catégories</span>

                    </NavLink>


                    <NavLink
                        to="/clients"
                        className={menuClass}
                    >

                        <span>👥</span>

                        <span>Clients</span>

                    </NavLink>


                    <NavLink
                        to="/reservations"
                        className={menuClass}
                    >

                        <span>📅</span>

                        <span>Réservations</span>

                    </NavLink>


                    <NavLink
                        to="/locations"
                        className={menuClass}
                    >

                        <span>📋</span>

                        <span>Locations</span>

                    </NavLink>


                    <NavLink
                        to="/paiements"
                        className={menuClass}
                    >

                        <span>💳</span>

                        <span>Paiements</span>

                    </NavLink>


                    <NavLink
                        to="/maintenances"
                        className={menuClass}
                    >

                        <span>🛠️</span>

                        <span>Maintenances</span>

                    </NavLink>

                </nav>


                {/* LOGOUT */}

                <button
                    onClick={logout}
                    className="
                        mt-5
                        w-full
                        bg-red-600
                        hover:bg-red-700
                        py-3
                        rounded-xl
                        transition
                        font-semibold
                        shadow-sm
                        text-sm
                    "
                >

                    Déconnexion

                </button>

            </aside>


            {/* ========================================= */}
            {/* CONTENT */}
            {/* ========================================= */}

            <main
                className="
                    flex-1
                    ml-64
                    p-6
                    overflow-y-auto
                    min-h-screen
                "
            >

                <Outlet />

            </main>

        </div>
    );
}
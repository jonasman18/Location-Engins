import { Link, Outlet } from "react-router-dom";

function AdminLayout() {

    return (

        <div className="min-h-screen bg-slate-100 flex">

            {/* Sidebar */}

            <aside className="w-72 bg-slate-900 text-white p-6">

                <h1 className="text-3xl font-bold mb-10">
                    Admin
                </h1>

                <nav className="space-y-4">

                    <Link
                        to="/admin/categories"
                        className="block px-4 py-3 rounded-xl hover:bg-slate-800 transition"
                    >
                        Catégories
                    </Link>

                    <Link
                        to="/admin/categories/add"
                        className="block px-4 py-3 rounded-xl hover:bg-slate-800 transition"
                    >
                        Ajouter catégorie
                    </Link>

                    <Link
                        to="/admin/engins"
                        className="block px-4 py-3 rounded-xl hover:bg-slate-800 transition"
                    >
                        Engins
                    </Link>

                    <Link
                        to="/admin/engins/add"
                        className="block px-4 py-3 rounded-xl hover:bg-slate-800 transition"
                    >
                        Ajouter engin
                    </Link>

                    <Link
                        to="/admin/clients"
                        className="block px-4 py-3 rounded-xl hover:bg-slate-800 transition"
                    >
                        Clients
                    </Link>

                    <Link
                        to="/reservations"
                        className="block px-4 py-3 rounded-xl hover:bg-slate-800 transition"
                    >
                        Réservations
                    </Link>

                </nav>

            </aside>

            {/* Content */}

            <main className="flex-1 p-8">

                <Outlet />

            </main>

        </div>
    );
}

export default AdminLayout;
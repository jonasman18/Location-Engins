import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AdminDashboard() {

    const navigate = useNavigate();

    // =========================================
    // LOGOUT
    // =========================================

    const logout = () => {

        localStorage.removeItem("access");

        localStorage.removeItem("refresh");

        localStorage.removeItem("role");

        toast.success("Déconnexion réussie");

        navigate("/");
    };

    // =========================================
    // DASHBOARD
    // =========================================

    return (

        <div className="min-h-screen bg-slate-100">

            {/* HEADER */}

            <header className="bg-white shadow-sm">

                <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

                    <div>

                        <h1 className="text-4xl font-black text-slate-800">

                            Dashboard Admin

                        </h1>

                        <p className="text-slate-500 mt-1">

                            Gestion complète de la plateforme

                        </p>

                    </div>

                    <button
                        onClick={logout}
                        className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-5
                            py-3
                            rounded-2xl
                            transition
                        "
                    >

                        Déconnexion

                    </button>

                </div>

            </header>


            {/* CONTENT */}

            <div className="max-w-7xl mx-auto px-8 py-12">

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                    {/* ENGINS */}

                    <Link to="/engins">

                        <div className="
                            bg-white
                            rounded-3xl
                            p-8
                            shadow-sm
                            hover:shadow-xl
                            transition
                        ">

                            <div className="text-6xl mb-5">
                                🚜
                            </div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-3">

                                Gestion des engins

                            </h2>

                            <p className="text-slate-500">

                                Ajouter, modifier et gérer les engins.

                            </p>

                        </div>

                    </Link>


                    {/* CATEGORIES */}

                    <Link to="/categories">

                        <div className="
                            bg-white
                            rounded-3xl
                            p-8
                            shadow-sm
                            hover:shadow-xl
                            transition
                        ">

                            <div className="text-6xl mb-5">
                                📂
                            </div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-3">

                                Catégories

                            </h2>

                            <p className="text-slate-500">

                                Organiser les catégories des engins.

                            </p>

                        </div>

                    </Link>


                    {/* CLIENTS */}

                    <Link to="/clients">

                        <div className="
                            bg-white
                            rounded-3xl
                            p-8
                            shadow-sm
                            hover:shadow-xl
                            transition
                        ">

                            <div className="text-6xl mb-5">
                                👥
                            </div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-3">

                                Clients

                            </h2>

                            <p className="text-slate-500">

                                Voir tous les clients inscrits.

                            </p>

                        </div>

                    </Link>


                    {/* RESERVATIONS */}

                    <Link to="/reservations">

                        <div className="
                            bg-white
                            rounded-3xl
                            p-8
                            shadow-sm
                            hover:shadow-xl
                            transition
                        ">

                            <div className="text-6xl mb-5">
                                📅
                            </div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-3">

                                Réservations

                            </h2>

                            <p className="text-slate-500">

                                Gérer les réservations clients.

                            </p>

                        </div>

                    </Link>


                    {/* LOCATIONS */}

                    <Link to="/locations">

                        <div className="
                            bg-white
                            rounded-3xl
                            p-8
                            shadow-sm
                            hover:shadow-xl
                            transition
                        ">

                            <div className="text-6xl mb-5">
                                🏗️
                            </div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-3">

                                Locations

                            </h2>

                            <p className="text-slate-500">

                                Suivre les locations actives.

                            </p>

                        </div>

                    </Link>


                    {/* PAIEMENTS */}

                    <Link to="/paiements">

                        <div className="
                            bg-white
                            rounded-3xl
                            p-8
                            shadow-sm
                            hover:shadow-xl
                            transition
                        ">

                            <div className="text-6xl mb-5">
                                💰
                            </div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-3">

                                Paiements

                            </h2>

                            <p className="text-slate-500">

                                Gestion des paiements clients.

                            </p>

                        </div>

                    </Link>


                    {/* MAINTENANCES */}

                    <Link to="/maintenances">

                        <div className="
                            bg-white
                            rounded-3xl
                            p-8
                            shadow-sm
                            hover:shadow-xl
                            transition
                        ">

                            <div className="text-6xl mb-5">
                                🔧
                            </div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-3">

                                Maintenances

                            </h2>

                            <p className="text-slate-500">

                                Suivre les réparations des engins.

                            </p>

                        </div>

                    </Link>

                </div>

            </div>

        </div>
    );
}
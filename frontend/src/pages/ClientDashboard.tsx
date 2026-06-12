import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ClientDashboard() {

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

    return (

        <div className="min-h-screen bg-slate-100">

            {/* HEADER */}

            <header className="bg-white shadow-sm">

                <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

                    <div>

                        <h1 className="text-4xl font-black text-slate-800">

                            Dashboard Client

                        </h1>

                        <p className="text-slate-500 mt-1">

                            Bienvenue sur votre espace client

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

                                Voir les engins

                            </h2>

                            <p className="text-slate-500">

                                Consulter les engins disponibles.

                            </p>

                        </div>

                    </Link>


                    {/* RESERVATION */}

                    <Link to="/reservations/add">

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

                                Réserver un engin

                            </h2>

                            <p className="text-slate-500">

                                Effectuer une nouvelle réservation.

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
                                📋
                            </div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-3">

                                Mes réservations

                            </h2>

                            <p className="text-slate-500">

                                Voir toutes vos réservations.

                            </p>

                        </div>

                    </Link>


                    {/* PAIEMENTS */}

                    <Link to="/paiements/add">

                        <div className="
                            bg-white
                            rounded-3xl
                            p-8
                            shadow-sm
                            hover:shadow-xl
                            transition
                        ">

                            <div className="text-6xl mb-5">
                                💳
                            </div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-3">

                                Paiements

                            </h2>

                            <p className="text-slate-500">

                                Suivre vos paiements et factures.

                            </p>

                        </div>

                    </Link>

                </div>

            </div>

        </div>
    );
}
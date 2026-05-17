import { Link } from "react-router-dom";

export default function HomePage() {

    return (

        <div className="min-h-screen bg-slate-100">


            {/* ================= NAVBAR ================= */}

            <header className="bg-white shadow-sm sticky top-0 z-50">

                <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

                    <Link to="/">

                        <h1 className="text-3xl font-black text-slate-800">

                            Location Engins

                        </h1>

                    </Link>


                    <nav className="hidden md:flex items-center gap-8 text-slate-700 font-medium">

                        <Link
                            to="/"
                            className="hover:text-blue-600 transition"
                        >
                            Accueil
                        </Link>

                        <Link
                            to="/engins"
                            className="hover:text-blue-600 transition"
                        >
                            Engins
                        </Link>

                        <Link
                            to="/categories"
                            className="hover:text-blue-600 transition"
                        >
                            Catégories
                        </Link>

                        <Link
                            to="/reservations"
                            className="hover:text-blue-600 transition"
                        >
                            Réservations
                        </Link>

                    </nav>


                    <div className="flex gap-4">

                        <Link to="/login">

                            <button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-2xl transition">

                                Connexion

                            </button>

                        </Link>


                        <Link to="/register">

                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl transition">

                                S'inscrire

                            </button>

                        </Link>

                    </div>

                </div>

            </header>


            {/* ================= HERO ================= */}

            <section className="max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 gap-16 items-center">

                <div>

                    <div className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold mb-6">

                        Plateforme de location d'engins

                    </div>


                    <h2 className="text-6xl font-black text-slate-800 leading-tight">

                        Louez vos engins de chantier facilement

                    </h2>


                    <p className="text-slate-600 text-xl mt-8 leading-relaxed">

                        Gérez vos locations,
                        réservations et équipements
                        depuis une plateforme moderne.

                    </p>


                    <div className="flex gap-5 mt-10">

                        <Link to="/engins">

                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl transition text-lg font-semibold">

                                Voir les engins

                            </button>

                        </Link>


                        <Link to="/reservations/add">

                            <button className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-2xl transition text-lg font-semibold">

                                Réserver

                            </button>

                        </Link>

                    </div>

                </div>


                {/* IMAGE */}

                <div>

                    <div className="bg-gradient-to-br from-blue-600 to-slate-800 rounded-[40px] h-[500px] flex items-center justify-center shadow-2xl">

                        <div className="text-center text-white">

                            <div className="text-8xl mb-6">

                                🚜

                            </div>

                            <h3 className="text-4xl font-black">

                                Location Engins

                            </h3>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= SERVICES ================= */}

            <section className="max-w-7xl mx-auto px-8 py-20">

                <h3 className="text-5xl font-black text-slate-800 mb-14 text-center">

                    Fonctionnalités principales

                </h3>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    <Link to="/engins">

                        <div className="bg-white rounded-[30px] p-10 shadow-sm hover:shadow-xl transition">

                            <div className="text-6xl mb-6">

                                🚜

                            </div>

                            <h4 className="text-2xl font-bold text-slate-800 mb-4">

                                Gestion des engins

                            </h4>

                            <p className="text-slate-500">

                                Consultez la liste des engins disponibles.

                            </p>

                        </div>

                    </Link>


                    <Link to="/categories">

                        <div className="bg-white rounded-[30px] p-10 shadow-sm hover:shadow-xl transition">

                            <div className="text-6xl mb-6">

                                📂

                            </div>

                            <h4 className="text-2xl font-bold text-slate-800 mb-4">

                                Catégories

                            </h4>

                            <p className="text-slate-500">

                                Organisez les équipements par catégorie.

                            </p>

                        </div>

                    </Link>


                    <Link to="/reservations">

                        <div className="bg-white rounded-[30px] p-10 shadow-sm hover:shadow-xl transition">

                            <div className="text-6xl mb-6">

                                📅

                            </div>

                            <h4 className="text-2xl font-bold text-slate-800 mb-4">

                                Réservations

                            </h4>

                            <p className="text-slate-500">

                                Gérez facilement les réservations clients.

                            </p>

                        </div>

                    </Link>

                </div>

            </section>


            {/* ================= FOOTER ================= */}

            <footer className="bg-slate-900 text-white py-12 mt-20">

                <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between gap-8">

                    <div>

                        <h3 className="text-3xl font-black mb-4">

                            Location Engins

                        </h3>

                        <p className="text-slate-400">

                            Application de gestion de location d'engins.

                        </p>

                    </div>


                    <div className="space-y-2 text-slate-400">

                        <p>Antananarivo, Madagascar</p>

                        <p>contact@location-engins.com</p>

                    </div>

                </div>


                <div className="border-t border-slate-800 mt-10 pt-8 text-center text-slate-500">

                    © 2026 Location Engins

                </div>

            </footer>

        </div>
    );
}
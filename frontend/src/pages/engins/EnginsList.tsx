import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

interface Reservation {

    client: string;

    date_debut: string;

    date_fin: string;

    statut: string;
}

interface Engin {

    id: number;

    nom: string;

    categorie_nom: string;

    prix_jour: string;

    etat: string;

    reservations: Reservation[];
}

function EnginsList() {

    const [engins, setEngins] =
        useState<Engin[]>([]);

    const [search, setSearch] =
        useState<string>("");

    // =========================================
    // PAGINATION
    // =========================================

    const [currentPage, setCurrentPage] =
        useState(1);

    const itemsPerPage = 3;

    // =========================================
    // FETCH ENGINS
    // =========================================

    useEffect(() => {

        const loadEngins = async () => {

            try {

                const response =
                    await api.get("engins/");

                setEngins(response.data);

            } catch (error) {

                console.log(error);
            }
        };

        loadEngins();

    }, []);

    // =========================================
    // FILTRAGE
    // =========================================

    const filteredEngins = useMemo(() => {

        return engins.filter((engin) => {

            const searchLower =
                search.toLowerCase();

            return (

                engin.nom
                    .toLowerCase()
                    .includes(searchLower)

                ||

                engin.categorie_nom
                    .toLowerCase()
                    .includes(searchLower)

                ||

                engin.etat
                    .toLowerCase()
                    .includes(searchLower)
            );
        });

    }, [engins, search]);

    // =========================================
    // PAGINATION LOGIC
    // =========================================

    const totalPages =
        Math.ceil(
            filteredEngins.length /
            itemsPerPage
        );

    const startIndex =
        (currentPage - 1) *
        itemsPerPage;

    const currentEngins =
        filteredEngins.slice(
            startIndex,
            startIndex + itemsPerPage
        );

    // =========================================
    // PAGE CHANGE
    // =========================================

    const handlePageChange = (
        page: number
    ) => {

        if (
            page >= 1 &&
            page <= totalPages
        ) {

            setCurrentPage(page);
        }
    };

    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}

                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-5 mb-8">

                    <div>

                        <h1 className="text-4xl font-bold text-slate-800">

                            Liste des engins

                        </h1>

                        <p className="text-slate-500 mt-2">

                            Gestion des engins de location

                        </p>

                    </div>

                    <Link to="/engins/add">

                        <button
                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-6
                                py-3
                                rounded-2xl
                                transition
                                font-medium
                                shadow-sm
                            "
                        >

                            Ajouter Engin

                        </button>

                    </Link>

                </div>

                {/* RECHERCHE */}

                <div className="bg-white rounded-3xl shadow-sm p-5 mb-6">

                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={search}
                        onChange={(e) => {

                            setSearch(
                                e.target.value
                            );

                            setCurrentPage(1);
                        }}
                        className="
                            w-full
                            border
                            border-slate-300
                            rounded-2xl
                            px-5
                            py-4
                            outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                    />

                </div>

                {/* TABLE */}

                <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-slate-900 text-white">

                                <tr>

                                    <th className="text-left px-6 py-4">
                                        Nom
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Catégorie
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Prix / Jour
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Etat actuel
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Réservations
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {currentEngins.length > 0 ? (

                                    currentEngins.map((engin) => (

                                        <tr
                                            key={engin.id}
                                            className="
                                                border-b
                                                border-slate-100
                                                hover:bg-slate-50
                                                transition
                                                align-top
                                            "
                                        >

                                            {/* NOM */}

                                            <td className="px-6 py-4 font-semibold text-slate-800">

                                                {engin.nom}

                                            </td>

                                            {/* CATEGORIE */}

                                            <td className="px-6 py-4 text-slate-600">

                                                {engin.categorie_nom}

                                            </td>

                                            {/* PRIX */}

                                            <td className="px-6 py-4 text-slate-600 font-medium">

                                                {engin.prix_jour} Ar

                                            </td>

                                            {/* ETAT */}

                                            <td className="px-6 py-4">

                                                <span
                                                    className={`
                                                        px-4
                                                        py-2
                                                        rounded-full
                                                        text-sm
                                                        font-medium

                                                        ${
                                                            engin.etat === "disponible"
                                                            ? "bg-green-100 text-green-700"
                                                            : engin.etat === "en_maintenance"
                                                            ? "bg-orange-100 text-orange-700"
                                                            : "bg-red-100 text-red-700"
                                                        }
                                                    `}
                                                >

                                                    {engin.etat}

                                                </span>

                                            </td>

                                            {/* RESERVATIONS */}

                                            <td className="px-6 py-4">

                                                {engin.reservations.length > 0 ? (

                                                    <div className="space-y-2">

                                                        {engin.reservations.map(
                                                            (
                                                                reservation,
                                                                index
                                                            ) => (

                                                                <div
                                                                    key={index}
                                                                    className="
                                                                        bg-slate-50
                                                                        border
                                                                        border-slate-200
                                                                        rounded-xl
                                                                        px-3
                                                                        py-2
                                                                        text-sm
                                                                    "
                                                                >

                                                                    <p className="text-slate-500 text-xs">

                                                                        {
                                                                            reservation.date_debut
                                                                        }

                                                                        {" → "}

                                                                        {
                                                                            reservation.date_fin
                                                                        }

                                                                    </p>

                                                                </div>
                                                            )
                                                        )}

                                                    </div>

                                                ) : (

                                                    <span className="text-green-600 text-sm font-medium">

                                                        Aucune réservation

                                                    </span>
                                                )}

                                            </td>

                                            {/* ACTION */}

                                            <td className="px-6 py-4">

                                                <Link
                                                    to={`/engins/edit/${engin.id}`}
                                                >

                                                    <button
                                                        className="
                                                            bg-blue-600
                                                            hover:bg-blue-700
                                                            text-white
                                                            px-4
                                                            py-2
                                                            rounded-xl
                                                            text-sm
                                                            transition
                                                        "
                                                    >

                                                        Modifier

                                                    </button>

                                                </Link>

                                            </td>

                                        </tr>
                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={6}
                                            className="
                                                text-center
                                                py-10
                                                text-slate-500
                                            "
                                        >

                                            Aucun engin trouvé

                                        </td>

                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* PAGINATION */}

                {filteredEngins.length > 0 && (

                    <div className="flex justify-center items-center gap-3 mt-8">

                        {/* PREVIOUS */}

                        <button
                            onClick={() =>
                                handlePageChange(
                                    currentPage - 1
                                )
                            }
                            disabled={
                                currentPage === 1
                            }
                            className="
                                w-11
                                h-11
                                rounded-xl
                                bg-slate-800
                                hover:bg-slate-900
                                disabled:bg-slate-300
                                text-white
                                text-lg
                                transition
                            "
                        >

                            ←

                        </button>

                        {/* PAGE NUMBERS */}

                        {[...Array(totalPages)].map(
                            (_, index) => {

                                const page =
                                    index + 1;

                                return (

                                    <button
                                        key={page}
                                        onClick={() =>
                                            handlePageChange(
                                                page
                                            )
                                        }
                                        className={`
                                            w-11
                                            h-11
                                            rounded-xl
                                            font-medium
                                            transition

                                            ${
                                                currentPage === page
                                                ? "bg-blue-600 text-white"
                                                : "bg-white text-slate-700 hover:bg-slate-200"
                                            }
                                        `}
                                    >

                                        {page}

                                    </button>
                                );
                            }
                        )}

                        {/* NEXT */}

                        <button
                            onClick={() =>
                                handlePageChange(
                                    currentPage + 1
                                )
                            }
                            disabled={
                                currentPage === totalPages
                            }
                            className="
                                w-11
                                h-11
                                rounded-xl
                                bg-blue-600
                                hover:bg-blue-700
                                disabled:bg-slate-300
                                text-white
                                text-lg
                                transition
                            "
                        >

                            →

                        </button>

                    </div>
                )}

            </div>

        </div>
    );
}

export default EnginsList;
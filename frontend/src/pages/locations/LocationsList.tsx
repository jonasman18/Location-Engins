// src/pages/locations/LocationsList.tsx

import { useEffect, useMemo, useState } from "react";

import api from "../../api/axios";

import { Link } from "react-router-dom";


// =========================================
// INTERFACES
// =========================================

interface DetailLocation {

    id: number;

    engin_nom: string;

    prix_total: string;
}

interface LocationType {

    id: number;

    utilisateur_nom: string;

    date_debut: string;

    date_fin: string;

    statut: string;

    montant_total: string;

    details?: DetailLocation[];
}


// =========================================
// COMPONENT
// =========================================

function LocationsList() {

    const [locations, setLocations] =
        useState<LocationType[]>([]);

    const [search, setSearch] =
        useState("");

    // =========================================
    // PAGINATION
    // =========================================

    const [currentPage, setCurrentPage] =
        useState(1);

    const itemsPerPage = 2;

    // =========================================
    // FETCH
    // =========================================

    useEffect(() => {

        const loadLocations = async () => {

            try {

                const response =
                    await api.get("locations/");

                setLocations(response.data);

            } catch (error) {

                console.log(error);
            }
        };

        loadLocations();

    }, []);

    // =========================================
    // FILTER
    // =========================================

    const filteredLocations = useMemo(() => {

        return locations.filter(
            (location) =>

                location.utilisateur_nom
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    }, [locations, search]);

    // =========================================
    // PAGINATION LOGIC
    // =========================================

    const totalPages =
        Math.ceil(
            filteredLocations.length /
            itemsPerPage
        );

    const startIndex =
        (currentPage - 1) *
        itemsPerPage;

    const currentLocations =
        filteredLocations.slice(
            startIndex,
            startIndex + itemsPerPage
        );

    // =========================================
    // STATUS STYLE
    // =========================================

    const getStatusStyle = (
        statut: string
    ) => {

        switch (statut) {

            case "en_cours":

                return "bg-green-100 text-green-700";

            case "terminee":

                return "bg-blue-100 text-blue-700";

            case "retard":

                return "bg-red-100 text-red-700";

            default:

                return "bg-slate-100 text-slate-700";
        }
    };

    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

                    <div>

                        <h1 className="text-4xl font-bold text-slate-800">

                            Locations

                        </h1>

                        <p className="text-slate-500 mt-2">

                            Gestion des locations d'engins

                        </p>

                    </div>

                    <Link to="/locations/add">

                        <button
                            className="
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-6
                                py-3
                                rounded-2xl
                                transition
                                shadow-sm
                                font-medium
                            "
                        >

                            Nouvelle Location

                        </button>

                    </Link>

                </div>

                {/* SEARCH */}

                <div className="bg-white rounded-3xl shadow-sm p-5 mb-6">

                    <input
                        type="text"
                        placeholder="Rechercher client..."
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
                            focus:outline-none
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
                                        Client
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Période
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Statut
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Engins
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Montant
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Facture
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {currentLocations.length > 0 ? (

                                    currentLocations.map(
                                        (location) => (

                                            <tr
                                                key={location.id}
                                                className="
                                                    border-b
                                                    border-slate-100
                                                    hover:bg-slate-50
                                                    transition
                                                    align-top
                                                "
                                            >

                                                {/* CLIENT */}

                                                <td className="px-6 py-4 font-semibold text-slate-800">

                                                    {
                                                        location.utilisateur_nom
                                                    }

                                                </td>

                                                {/* DATE */}

                                                <td className="px-6 py-4 text-slate-600 whitespace-nowrap">

                                                    <div className="flex items-center gap-2 text-sm">

                                                        <span>
                                                            {location.date_debut}
                                                        </span>

                                                        <span className="text-slate-400">
                                                            →
                                                        </span>

                                                        <span>
                                                            {location.date_fin}
                                                        </span>

                                                    </div>

                                                </td>

                                                {/* STATUS */}

                                                <td className="px-6 py-4">

                                                    <span
                                                        className={`
                                                            px-4
                                                            py-2
                                                            rounded-full
                                                            text-sm
                                                            font-medium
                                                            ${getStatusStyle(
                                                                location.statut
                                                            )}
                                                        `}
                                                    >

                                                        {
                                                            location.statut
                                                        }

                                                    </span>

                                                </td>

                                                {/* ENGINS */}

                                                <td className="px-6 py-4">

                                                    <div className="space-y-2">

                                                        {(location.details || []).map(
                                                            (
                                                                detail
                                                            ) => (

                                                                <div
                                                                    key={
                                                                        detail.id
                                                                    }
                                                                    className="
                                                                        bg-slate-50
                                                                        border
                                                                        border-slate-200
                                                                        rounded-xl
                                                                        px-3
                                                                        py-2
                                                                    "
                                                                >

                                                                    <div className="font-medium text-slate-700 text-sm">

                                                                        {
                                                                            detail.engin_nom
                                                                        }

                                                                    </div>

                                                                    <div className="text-xs text-slate-500 mt-1">

                                                                        {
                                                                            detail.prix_total
                                                                        }
                                                                        {" Ar"}

                                                                    </div>

                                                                </div>
                                                            )
                                                        )}

                                                    </div>

                                                </td>

                                                {/* TOTAL */}

                                                <td className="px-6 py-4 font-bold text-blue-700 whitespace-nowrap">

                                                    {
                                                        location.montant_total
                                                    }
                                                    {" Ar"}

                                                </td>

                                                {/* FACTURE */}

                                                <td className="px-6 py-4">

                                                    <a
                                                        href={`http://127.0.0.1:8000/api/factures/${location.id}/`}
                                                        target="_blank"
                                                        rel="noreferrer"
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

                                                        PDF

                                                    </a>

                                                </td>

                                            </tr>
                                        )
                                    )

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={6}
                                            className="
                                                text-center
                                                py-10
                                                text-slate-400
                                            "
                                        >

                                            Aucune location trouvée

                                        </td>

                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* PAGINATION */}

                {filteredLocations.length > 0 && (

                    <div className="flex justify-center items-center gap-3 mt-8">

                        <button
                            onClick={() =>
                                setCurrentPage(
                                    currentPage - 1
                                )
                            }
                            disabled={
                                currentPage === 1
                            }
                            className="
                                w-12
                                h-12
                                rounded-2xl
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

                        {Array.from(
                            { length: totalPages },
                            (_, index) => {

                                const page =
                                    index + 1;

                                return (

                                    <button
                                        key={page}
                                        onClick={() =>
                                            setCurrentPage(
                                                page
                                            )
                                        }
                                        className={`
                                            w-12
                                            h-12
                                            rounded-2xl
                                            font-medium
                                            transition
                                            ${
                                                currentPage === page
                                                    ? `
                                                        bg-blue-600
                                                        text-white
                                                      `
                                                    : `
                                                        bg-white
                                                        text-slate-700
                                                        hover:bg-slate-200
                                                      `
                                            }
                                        `}
                                    >

                                        {page}

                                    </button>
                                );
                            }
                        )}

                        <button
                            onClick={() =>
                                setCurrentPage(
                                    currentPage + 1
                                )
                            }
                            disabled={
                                currentPage === totalPages
                            }
                            className="
                                w-12
                                h-12
                                rounded-2xl
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

export default LocationsList;
// src/pages/locations/LocationsList.tsx

import { useEffect, useState } from "react";

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
    // FETCH LOCATIONS
    // =========================================

    useEffect(() => {

        const loadLocations = async () => {

            try {

                const response =
                    await api.get(
                        "locations/"
                    );

                setLocations(
                    response.data
                );

            } catch (error) {

                console.log(error);
            }
        };

        loadLocations();

    }, []);


    // =========================================
    // FILTER
    // =========================================

    const filteredLocations =
        locations.filter(
            (location) =>

                location.utilisateur_nom
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
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
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl transition shadow-sm"
                        >

                            Nouvelle Location

                        </button>

                    </Link>

                </div>


                {/* SEARCH */}

                <div className="bg-white rounded-3xl shadow-sm p-5 mb-6">

                    <input
                        type="text"
                        placeholder="Rechercher par client..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        className="w-full border border-slate-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                                {filteredLocations.map(
                                    (location) => (

                                        <tr
                                            key={location.id}
                                            className="border-b border-slate-100 hover:bg-slate-50 transition align-top"
                                        >

                                            {/* CLIENT */}

                                            <td className="px-6 py-5 font-semibold text-slate-800">

                                                {
                                                    location.utilisateur_nom
                                                }

                                            </td>


                                            {/* DATE */}

                                            <td className="px-6 py-5 text-slate-600">

                                                <div>

                                                    {
                                                        location.date_debut
                                                    }

                                                </div>

                                                <div className="text-sm text-slate-400">

                                                    au

                                                </div>

                                                <div>

                                                    {
                                                        location.date_fin
                                                    }

                                                </div>

                                            </td>


                                            {/* STATUS */}

                                            <td className="px-6 py-5">

                                                <span
                                                    className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(
                                                        location.statut
                                                    )}`}
                                                >

                                                    {
                                                        location.statut
                                                    }

                                                </span>

                                            </td>


                                            {/* ENGINS */}

                                            <td className="px-6 py-5">

                                                <div className="space-y-2 max-h-40 overflow-y-auto pr-2">

                                                    {(location.details || []).map(
                                                        (
                                                            detail
                                                        ) => (

                                                            <div
                                                                key={
                                                                    detail.id
                                                                }
                                                                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
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

                                            <td className="px-6 py-5 font-bold text-blue-700 whitespace-nowrap">

                                                {
                                                    location.montant_total
                                                }
                                                {" Ar"}

                                            </td>

                                            <td className="px-6 py-5">

    <a
        href={`http://127.0.0.1:8000/api/factures/${location.id}/`}
        target="_blank"
        rel="noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm"
    >

        PDF

    </a>

</td>

                                        </tr>
                                    )
                                )}


                                {/* EMPTY */}

                                {filteredLocations.length === 0 && (

                                    <tr>

                                        <td
                                            colSpan={5}
                                            className="text-center py-10 text-slate-400"
                                        >

                                            Aucune location trouvée

                                        </td>

                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default LocationsList;
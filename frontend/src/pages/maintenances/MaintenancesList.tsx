import { useEffect, useState } from "react";

import api from "../../api/axios";

import { Link } from "react-router-dom";

interface Maintenance {

    id: number;

    engin_nom: string;

    type_maintenance: string;

    description: string;

    date_debut: string;

    date_fin: string | null;

    cout: string;

    statut: string;
}

function MaintenancesList() {

    const [maintenances, setMaintenances] =
        useState<Maintenance[]>([]);

    // =====================================
    // FETCH
    // =====================================

    const loadMaintenances = async () => {

        try {

            const response =
                await api.get(
                    "maintenances/"
                );

            setMaintenances(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    // =====================================
    // USE EFFECT
    // =====================================

    useEffect(() => {

        const fetchMaintenances = async () => {
            await loadMaintenances();
        };

        void fetchMaintenances();

    }, []);

    // =====================================
    // TERMINER MAINTENANCE
    // =====================================

    const terminerMaintenance =
        async (id: number) => {

        try {

            await api.patch(
                `maintenances/${id}/terminer/`
            );

            alert(
                "Maintenance terminée"
            );

            loadMaintenances();

        } catch (error) {

            console.log(error);
        }
    };

    // =====================================
    // STYLE STATUS
    // =====================================

    const getStatusStyle = (
        statut: string
    ) => {

        switch (statut) {

            case "en_cours":

                return "bg-orange-100 text-orange-700";

            case "terminee":

                return "bg-green-100 text-green-700";

            default:

                return "bg-slate-100 text-slate-700";
        }
    };

    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-4xl font-bold text-slate-800">

                            Maintenances

                        </h1>

                        <p className="text-slate-500 mt-2">

                            Gestion des réparations et entretiens

                        </p>

                    </div>

                    <Link to="/maintenances/add">

                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
                        >

                            Nouvelle Maintenance

                        </button>

                    </Link>

                </div>

                {/* TABLE */}

                <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-slate-900 text-white">

                                <tr>

                                    <th className="text-left px-6 py-4">
                                        Engin
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Type
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Période
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Coût
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Statut
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {maintenances.map(
                                    (maintenance) => (

                                        <tr
                                            key={maintenance.id}
                                            className="border-b border-slate-100 hover:bg-slate-50"
                                        >

                                            <td className="px-6 py-5 font-semibold text-slate-800">

                                                {
                                                    maintenance.engin_nom
                                                }

                                            </td>

                                            <td className="px-6 py-5 text-slate-600">

                                                {
                                                    maintenance.type_maintenance
                                                }

                                            </td>

                                                <td className="px-6 py-5 text-slate-600 whitespace-nowrap">

                                                {maintenance.date_debut}
                                                {" → "}
                                                {maintenance.date_fin || "En cours"}

                                            </td>

                                            <td className="px-6 py-5 font-bold text-blue-700">

                                                {
                                                    maintenance.cout
                                                }
                                                {" Ar"}

                                            </td>

                                            <td className="px-6 py-5">

                                                <span
                                                    className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(
                                                        maintenance.statut
                                                    )}`}
                                                >

                                                    {
                                                        maintenance.statut
                                                    }

                                                </span>

                                            </td>

                                            <td className="px-6 py-5">

                                                {maintenance.statut ===
                                                "en_cours" && (

                                                    <button
                                                        onClick={() =>
                                                            terminerMaintenance(
                                                                maintenance.id
                                                            )
                                                        }
                                                        className="
                                                            bg-green-600
                                                            hover:bg-green-700
                                                            text-white
                                                            px-4
                                                            py-2
                                                            rounded-xl
                                                            text-sm
                                                        "
                                                    >

                                                        Terminer

                                                    </button>
                                                )}

                                            </td>

                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default MaintenancesList;
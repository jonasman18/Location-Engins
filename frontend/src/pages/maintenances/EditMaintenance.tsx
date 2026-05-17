import { useEffect, useState } from "react";

import api from "../../api/axios";
import toast from "react-hot-toast";

import {
    useNavigate,
    useParams
} from "react-router-dom";

function EditMaintenance() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [typeMaintenance,
        setTypeMaintenance] =
        useState("");

    const [description,
        setDescription] =
        useState("");

    const [dateDebut,
        setDateDebut] =
        useState("");

    const [dateFin,
        setDateFin] =
        useState("");

    const [cout,
        setCout] =
        useState("");

    const [statut,
        setStatut] =
        useState("");

    // =====================================
    // LOAD MAINTENANCE
    // =====================================

    useEffect(() => {

        const fetchMaintenance =
            async () => {

            try {

                const response =
                    await api.get(
                        `maintenances/${id}/`
                    );

                const data =
                    response.data;

                setTypeMaintenance(
                    data.type_maintenance
                );

                setDescription(
                    data.description
                );

                setDateDebut(
                    data.date_debut
                );

                setDateFin(
                    data.date_fin || ""
                );

                setCout(
                    data.cout
                );

                setStatut(
                    data.statut
                );

            } catch (error) {

                console.log(error);
            }
        };

        void fetchMaintenance();

    }, [id]);

    // =====================================
    // SUBMIT
    // =====================================

    const handleSubmit =
        async (
            e: React.FormEvent
        ) => {

        e.preventDefault();

        try {

            await api.patch(
                `maintenances/${id}/`,
                {
                    type_maintenance:
                        typeMaintenance,

                    description,

                    date_debut:
                        dateDebut,

                    date_fin:
                        dateFin || null,

                    cout,

                    statut
                }
            );

            toast.success("Maintenance modifiée");

            navigate(
                "/maintenances"
            );

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-3xl mx-auto">

                <div className="bg-white rounded-3xl shadow-sm p-8">

                    <h1 className="text-4xl font-bold text-slate-800 mb-8">

                        Modifier Maintenance

                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* TYPE */}

                        <div>

                            <label className="block mb-2">

                                Type maintenance

                            </label>

                            <input
                                type="text"
                                value={typeMaintenance}
                                onChange={(e) =>
                                    setTypeMaintenance(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-slate-300 rounded-2xl px-4 py-3"
                            />

                        </div>

                        {/* DESCRIPTION */}

                        <div>

                            <label className="block mb-2">

                                Description

                            </label>

                            <textarea
                                rows={4}
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-slate-300 rounded-2xl px-4 py-3"
                            />

                        </div>

                        {/* DATE DEBUT */}

                        <div>

                            <label className="block mb-2">

                                Date début

                            </label>

                            <input
                                type="date"
                                value={dateDebut}
                                onChange={(e) =>
                                    setDateDebut(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-slate-300 rounded-2xl px-4 py-3"
                            />

                        </div>

                        {/* DATE FIN */}

                        <div>

                            <label className="block mb-2">

                                Date fin

                            </label>

                            <input
                                type="date"
                                value={dateFin}
                                onChange={(e) =>
                                    setDateFin(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-slate-300 rounded-2xl px-4 py-3"
                            />

                        </div>

                        {/* COUT */}

                        <div>

                            <label className="block mb-2">

                                Coût

                            </label>

                            <input
                                type="number"
                                value={cout}
                                onChange={(e) =>
                                    setCout(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-slate-300 rounded-2xl px-4 py-3"
                            />

                        </div>

                        {/* STATUT */}

                        <div>

                            <label className="block mb-2">

                                Statut

                            </label>

                            <select
                                value={statut}
                                onChange={(e) =>
                                    setStatut(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-slate-300 rounded-2xl px-4 py-3"
                            >

                                <option value="en_cours">
                                    En cours
                                </option>

                                <option value="terminee">
                                    Terminée
                                </option>

                            </select>

                        </div>

                        {/* BTN */}

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl"
                        >

                            Modifier

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default EditMaintenance;
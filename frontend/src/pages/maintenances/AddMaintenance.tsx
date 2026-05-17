import { useEffect, useState } from "react";

import api from "../../api/axios";

import { useNavigate } from "react-router-dom";

interface Engin {

    id: number;

    nom: string;
}

function AddMaintenance() {

    const navigate = useNavigate();

    const [engins, setEngins] =
        useState<Engin[]>([]);

    const [engin, setEngin] =
        useState("");

    const [
        typeMaintenance,
        setTypeMaintenance
    ] = useState("");

    const [
        description,
        setDescription
    ] = useState("");

    const [
        dateDebut,
        setDateDebut
    ] = useState("");

    const [cout, setCout] =
        useState("");

        // =====================================
// FETCH ENGINS
// =====================================

useEffect(() => {

    const fetchEngins = async () => {

        try {

            const response =
                await api.get(
                    "engins/"
                );

            setEngins(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    fetchEngins();

}, []);

    // =====================================
    // SUBMIT
    // =====================================

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            await api.post(
                "maintenances/",
                {
                    engin,
                    type_maintenance:
                        typeMaintenance,
                    description,
                    date_debut:
                        dateDebut,
                    cout,
                    statut:
                        "en_cours"
                }
            );

            alert(
                "Maintenance enregistrée"
            );

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

                        Nouvelle Maintenance

                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* ENGIN */}

                        <div>

                            <label className="block mb-2 text-sm font-medium">

                                Engin

                            </label>

                            <select
                                value={engin}
                                onChange={(e) =>
                                    setEngin(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-slate-300 rounded-2xl px-4 py-3"
                                required
                            >

                                <option value="">
                                    Sélectionner
                                </option>

                                {engins.map(
                                    (e) => (

                                        <option
                                            key={e.id}
                                            value={e.id}
                                        >

                                            {e.nom}

                                        </option>
                                    )
                                )}

                            </select>

                        </div>

                        {/* TYPE */}

                        <div>

                            <label className="block mb-2 text-sm font-medium">

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
                                required
                            />

                        </div>

                        {/* DESCRIPTION */}

                        <div>

                            <label className="block mb-2 text-sm font-medium">

                                Description

                            </label>

                            <textarea
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                                rows={4}
                                className="w-full border border-slate-300 rounded-2xl px-4 py-3"
                            />

                        </div>

                        {/* DATE */}

                        <div>

                            <label className="block mb-2 text-sm font-medium">

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
                                required
                            />

                        </div>

                        {/* COUT */}

                        <div>

                            <label className="block mb-2 text-sm font-medium">

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
                                required
                            />

                        </div>

                        {/* BTN */}

                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl transition"
                        >

                            Enregistrer

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddMaintenance;
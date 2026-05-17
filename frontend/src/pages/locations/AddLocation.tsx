// src/pages/locations/AddLocation.tsx

import { useEffect, useMemo, useState } from "react";

import api from "../../api/axios";

import { useNavigate } from "react-router-dom";


// =========================================
// INTERFACES
// =========================================

interface Client {

    id: number;

    nom: string;

    prenom: string;
}


interface Engin {

    id: number;

    nom: string;

    prix_jour: string;

    statut_location: string;
}


interface DetailLocation {

    engin: number;

    engin_nom: string;

    prix_jour: number;

    quantite: number;

    nb_jours: number;

    prix_total: number;
}


// =========================================
// COMPONENT
// =========================================

function AddLocation() {

    const navigate = useNavigate();


    // =========================================
    // STATES
    // =========================================

    const [clients, setClients] = useState<Client[]>([]);

    const [engins, setEngins] = useState<Engin[]>([]);

    const [client, setClient] = useState("");

    const [dateDebut, setDateDebut] = useState("");

    const [dateFin, setDateFin] = useState("");

    const [selectedEngin, setSelectedEngin] = useState("");

    const [details, setDetails] = useState<DetailLocation[]>([]);

    const [loading, setLoading] = useState(false);


    // =========================================
    // NB JOURS
    // =========================================

    const nbJours = useMemo(() => {

        if (!dateDebut || !dateFin) {

            return 0;
        }

        const debut = new Date(dateDebut);

        const fin = new Date(dateFin);

        const difference =
            fin.getTime() - debut.getTime();

        const jours =
            Math.ceil(
                difference / (1000 * 60 * 60 * 24)
            ) + 1;

        return jours > 0 ? jours : 0;

    }, [dateDebut, dateFin]);


    // =========================================
    // TOTAL GENERAL
    // =========================================

    const montantTotal = useMemo(() => {

        return details.reduce(
            (total, item) =>
                total + item.prix_total,
            0
        );

    }, [details]);


    // =========================================
    // FETCH DATA
    // =========================================

    useEffect(() => {

        const loadData = async () => {

            try {

                const clientsResponse =
                    await api.get("users/clients/");

                const enginsResponse =
                    await api.get("engins/");

                setClients(clientsResponse.data);

                setEngins(enginsResponse.data);

            } catch (error) {

                console.log(error);
            }
        };

        loadData();

    }, []);


    // =========================================
    // ADD ENGIN
    // =========================================

    const addEngin = () => {

        if (!selectedEngin) {

            return;
        }

        if (!nbJours) {

            alert(
                "Veuillez sélectionner les dates"
            );

            return;
        }

        const engin = engins.find(
            (e) =>
                e.id === Number(selectedEngin)
        );

        if (!engin) {

            return;
        }

        const exist = details.find(
            (item) =>
                item.engin === engin.id
        );

        if (exist) {

            alert(
                "Engin déjà ajouté"
            );

            return;
        }

        const prixJour =
            Number(engin.prix_jour);

        const total =
            prixJour * nbJours;

        const newDetail: DetailLocation = {

            engin: engin.id,

            engin_nom: engin.nom,

            prix_jour: prixJour,

            quantite: 1,

            nb_jours: nbJours,

            prix_total: total,
        };

        setDetails([
            ...details,
            newDetail
        ]);

        setSelectedEngin("");
    };


    // =========================================
    // REMOVE ENGIN
    // =========================================

    const removeEngin = (
        enginId: number
    ) => {

        setDetails(
            details.filter(
                (item) =>
                    item.engin !== enginId
            )
        );
    };

// =========================================
// SUBMIT
// =========================================

const handleSubmit = async (
    e: React.FormEvent
) => {

    e.preventDefault();

    try {

        setLoading(true);

        // =====================
        // CREATE LOCATION
        // =====================

        const locationResponse =
            await api.post(
                "locations/",
                {
                    utilisateur: client,
                    date_debut: dateDebut,
                    date_fin: dateFin,
                    montant_total:
                        montantTotal,
                }
            );

        const locationId =
            locationResponse.data.id;

        // =====================
        // CREATE DETAILS
        // =====================

        for (const detail of details) {

            await api.post(
                "detail-locations/",
                {
                    location: locationId,

                    engin: detail.engin,

                    prix_jour:
                        detail.prix_jour,

                    quantite:
                        detail.quantite,

                    nb_jours:
                        detail.nb_jours,

                    prix_total:
                        detail.prix_total,
                }
            );
        }

        alert(
            "Location enregistrée"
        );

        navigate("/locations");

    } catch (error: unknown) {

    console.log(error);

    const err =
        error as {
            response?: {
                data?: {
                    non_field_errors?: string[];
                    error?: string;
                };
            };
        };

    alert(

        err.response?.data?.non_field_errors?.[0]

        ||

        err.response?.data?.error

        ||

        "Erreur lors de l'enregistrement"
    );
}

     finally {

        setLoading(false);
    }
};

    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-5xl mx-auto">

                <div className="bg-white rounded-3xl shadow-sm p-8">

                    {/* HEADER */}

                    <div className="mb-8">

                        <h1 className="text-4xl font-bold text-slate-800">

                            Nouvelle Location

                        </h1>

                        <p className="text-slate-500 mt-2">

                            Ajouter plusieurs engins
                            dans une même location

                        </p>

                    </div>


                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-8"
                    >

                        {/* CLIENT */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">

                                Client

                            </label>

                            <select
                                value={client}
                                onChange={(e) =>
                                    setClient(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-slate-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >

                                <option value="">
                                    Sélectionner
                                </option>

                                {clients.map((c) => (

                                    <option
                                        key={c.id}
                                        value={c.id}
                                    >

                                        {c.nom} {c.prenom}

                                    </option>
                                ))}

                            </select>

                        </div>


                        {/* DATES */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">

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

                            <div>

                                <label className="block text-sm font-medium text-slate-700 mb-2">

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
                                    required
                                />

                            </div>

                        </div>


                        {/* ENGINS */}

                        <div className="bg-slate-50 rounded-3xl p-6">

                            <h2 className="text-xl font-bold text-slate-800 mb-4">

                                Ajouter des engins

                            </h2>

                            <div className="flex gap-4">

                                <select
                                    value={selectedEngin}
                                    onChange={(e) =>
                                        setSelectedEngin(
                                            e.target.value
                                        )
                                    }
                                    className="flex-1 border border-slate-300 rounded-2xl px-4 py-3"
                                >

                                    <option value="">
                                        Choisir un engin
                                    </option>

                                    {engins
                                        .filter(
                                            (engin) =>
                                                engin.statut_location ===
                                                "disponible"
                                        )
                                        .map((engin) => (

                                            <option
                                                key={engin.id}
                                                value={engin.id}
                                            >

                                                {engin.nom}
                                                {" - "}
                                                {
                                                    engin.prix_jour
                                                }
                                                {" Ar"}

                                            </option>
                                        ))}

                                </select>

                                <button
                                    type="button"
                                    onClick={addEngin}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-2xl"
                                >

                                    Ajouter

                                </button>

                            </div>

                        </div>


                        {/* DETAILS */}

                        <div className="space-y-4">

                            {details.map((detail) => (

                                <div
                                    key={detail.engin}
                                    className="bg-white border border-slate-200 rounded-2xl p-5 flex justify-between items-center"
                                >

                                    <div>

                                        <h3 className="font-bold text-slate-800">

                                            {
                                                detail.engin_nom
                                            }

                                        </h3>

                                        <p className="text-slate-500 text-sm mt-1">

                                            {
                                                detail.prix_jour
                                            }
                                            {" Ar/jour"}
                                            {" • "}
                                            {
                                                detail.nb_jours
                                            }
                                            {" jours"}

                                        </p>

                                    </div>

                                    <div className="flex items-center gap-6">

                                        <div className="text-right">

                                            <p className="text-sm text-slate-500">

                                                Total

                                            </p>

                                            <p className="font-bold text-blue-700 text-lg">

                                                {
                                                    detail.prix_total
                                                }
                                                {" Ar"}

                                            </p>

                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeEngin(
                                                    detail.engin
                                                )
                                            }
                                            className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-xl"
                                        >

                                            Retirer

                                        </button>

                                    </div>

                                </div>
                            ))}

                        </div>


                        {/* TOTAL */}

                        <div className="bg-slate-900 text-white rounded-3xl p-6 flex justify-between items-center">

                            <div>

                                <p className="text-slate-300">

                                    Montant Total

                                </p>

                                <h2 className="text-3xl font-bold mt-1">

                                    {montantTotal} Ar

                                </h2>

                            </div>

                            <button
                                type="submit"
                                disabled={
                                    loading
                                }
                                className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl font-medium transition"
                            >

                                {loading
                                    ? "Enregistrement..."
                                    : "Enregistrer"}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddLocation;
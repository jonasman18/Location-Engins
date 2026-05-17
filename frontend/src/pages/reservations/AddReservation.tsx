import { useEffect, useState } from "react";

import api from "../../api/axios";


interface Client {

    id: number;

    nom: string;
}


interface Engin {

    id: number;

    nom: string;

    prix_jour: number;
}


export default function AddReservation() {

    const [clients, setClients] = useState<Client[]>([]);

    const [engins, setEngins] = useState<Engin[]>([]);

    const [selectedPrix, setSelectedPrix] = useState<number>(0);

    const [formData, setFormData] = useState({

        client: '',

        engin: '',

        date_debut: '',

        date_fin: '',

        montant_total: 0,

        statut: 'en_attente',
    });


    // =========================
    // FETCH CLIENTS
    // =========================

    const fetchClients = async () => {

        try {

            const response = await api.get(
                'users/clients/'
            );

            setClients(response.data);

        } catch (error) {

            console.log(error);
        }
    };


    // =========================
    // FETCH ENGINS
    // =========================

    const fetchEngins = async () => {

        try {

            const response = await api.get(
                'engins/'
            );

            setEngins(response.data);

        } catch (error) {

            console.log(error);
        }
    };


    // =========================
    // USE EFFECT
    // =========================

    useEffect(() => {

    const loadData = async () => {

        await fetchClients();

        await fetchEngins();
    };

    loadData();

}, []);


    // =========================
    // CALCUL MONTANT
    // =========================

    const calculerMontant = (

        debut: string,

        fin: string,

        prix: number

    ) => {

        if (!debut || !fin || prix <= 0) {

            return 0;
        }

        const date1 = new Date(debut);

        const date2 = new Date(fin);

        const difference =
            date2.getTime() - date1.getTime();

        const jours =
            difference / (1000 * 3600 * 24);

        if (jours <= 0) {

            return 0;
        }

        return jours * prix;
    };


    // =========================
    // HANDLE CHANGE
    // =========================

    const handleChange = (

        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >

    ) => {

        const { name, value } = e.target;

        const updatedData = {

            ...formData,

            [name]: value
        };


        // =========================
        // CHANGEMENT ENGIN
        // =========================

        if (name === 'engin') {

            const enginChoisi = engins.find(

                (engin) =>
                    engin.id === Number(value)
            );

            if (enginChoisi) {

                setSelectedPrix(
                    enginChoisi.prix_jour
                );

                updatedData.montant_total =
                    calculerMontant(

                        updatedData.date_debut,

                        updatedData.date_fin,

                        enginChoisi.prix_jour
                    );
            }
        }


        // =========================
        // CHANGEMENT DATES
        // =========================

        if (

            name === 'date_debut' ||

            name === 'date_fin'

        ) {

            updatedData.montant_total =
                calculerMontant(

                    name === 'date_debut'
                        ? value
                        : updatedData.date_debut,

                    name === 'date_fin'
                        ? value
                        : updatedData.date_fin,

                    selectedPrix
                );
        }

        setFormData(updatedData);
    };


    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (

        e: React.FormEvent

    ) => {

        e.preventDefault();

        try {

            await api.post(
                'reservations/',
                formData
            );

            alert(
                "Réservation créée avec succès"
            );

            setFormData({

                client: '',

                engin: '',

                date_debut: '',

                date_fin: '',

                montant_total: 0,

                statut: 'en_attente',
            });

        } catch (error) {

            console.log(error);

            alert(
                "Erreur lors de la réservation"
            );
        }
    };


    return (

        <div className="p-8">

            <div className="bg-white rounded-3xl shadow-sm p-8 max-w-2xl">

                <h1 className="text-3xl font-bold mb-8 text-slate-800">

                    Nouvelle Réservation

                </h1>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* CLIENT */}

                    <select
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-2xl px-5 py-4"
                    >

                        <option value="">
                            Choisir client
                        </option>

                        {clients.map((client) => (

                            <option
                                key={client.id}
                                value={client.id}
                            >

                                {client.nom}

                            </option>
                        ))}

                    </select>


                    {/* ENGIN */}

                    <select
                        name="engin"
                        value={formData.engin}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-2xl px-5 py-4"
                    >

                        <option value="">
                            Choisir engin
                        </option>

                        {engins.map((engin) => (

                            <option
                                key={engin.id}
                                value={engin.id}
                            >

                                {engin.nom}
                                {" - "}
                                {engin.prix_jour}
                                {" Ar/j"}

                            </option>
                        ))}

                    </select>


                    {/* DATE DEBUT */}

                    <input
                        type="date"
                        name="date_debut"
                        value={formData.date_debut}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-2xl px-5 py-4"
                    />


                    {/* DATE FIN */}

                    <input
                        type="date"
                        name="date_fin"
                        value={formData.date_fin}
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-2xl px-5 py-4"
                    />


                    {/* MONTANT */}

                    <div className="bg-slate-100 rounded-2xl p-5">

                        <p className="text-slate-500 mb-2">

                            Montant Total

                        </p>

                        <h2 className="text-3xl font-bold text-blue-700">

                            {formData.montant_total} Ar

                        </h2>

                    </div>


                    {/* BUTTON */}

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-4 rounded-2xl transition w-full"
                    >

                        Enregistrer

                    </button>

                </form>

            </div>

        </div>
    );
}
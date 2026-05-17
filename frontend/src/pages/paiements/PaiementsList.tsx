import {
    useEffect,
    useState
} from "react";

import api from "../../api/axios";

import { Link } from "react-router-dom";


interface Paiement {

    id: number;

    client_nom: string;

    montant: string;

    mode_paiement: string;

    reference_transaction: string;

    date_paiement: string;
}


function PaiementsList() {

    const [paiements, setPaiements] =
        useState<Paiement[]>([]);


    useEffect(() => {

        const fetchPaiements =
            async () => {

                try {

                    const response =
                        await api.get(
                            "paiements/"
                        );

                    setPaiements(
                        response.data
                    );

                } catch (error) {

                    console.log(error);
                }
            };

        fetchPaiements();

    }, []);


    // =========================================
// FORMAT DATE
// =========================================

const formatDate = (
    date: string
) => {

    return new Date(
        date
    ).toLocaleDateString(
        "fr-FR",
        {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );
};

    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-4xl font-bold text-slate-800">

                            Paiements

                        </h1>

                        <p className="text-slate-500 mt-2">

                            Gestion des paiements

                        </p>

                    </div>

                    <Link to="/paiements/add">

                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl"
                        >

                            Nouveau Paiement

                        </button>

                    </Link>

                </div>


                {/* TABLE */}

                <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-slate-900 text-white">

                            <tr>

                                <th className="text-left px-6 py-4">
                                    Client
                                </th>

                                <th className="text-left px-6 py-4">
                                    Montant
                                </th>

                                <th className="text-left px-6 py-4">
                                    Mode
                                </th>

                                <th className="text-left px-6 py-4">
                                    Référence
                                </th>

                                <th className="text-left px-6 py-4">
                                    Date
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {paiements.map(
                                (paiement) => (

                                    <tr
                                        key={paiement.id}
                                        className="border-b border-slate-100"
                                    >

                                        <td className="px-6 py-4 font-medium">

                                            {
                                                paiement.client_nom
                                            }

                                        </td>

                                        <td className="px-6 py-4 text-blue-700 font-bold">

                                            {
                                                paiement.montant
                                            }
                                            {" Ar"}

                                        </td>

                                        <td className="px-6 py-4">

                                            {
                                                paiement.mode_paiement
                                            }

                                        </td>

                                        <td className="px-6 py-4">

                                            {
                                                paiement.reference_transaction
                                            }

                                        </td>

                                        <td className="px-6 py-4 text-slate-600 whitespace-nowrap">

                                            {
                                                formatDate(
                                                    paiement.date_paiement
                                                )
                                            }

                                        </td>

                                    </tr>
                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default PaiementsList;
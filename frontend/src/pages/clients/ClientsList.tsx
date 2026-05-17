import { useEffect, useState } from "react";
import api from "../../api/axios";

interface Client {

    id: number;

    nom: string;

    email: string;

    telephone: string;

    adresse: string;

    role: string;

    date_creation: string;
}

function ClientsList() {

    const [clients, setClients] = useState<Client[]>([]);

    const fetchClients = async () => {

        try {

            const response = await api.get('users/clients/');

            setClients(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        const loadData = async () => {

            await fetchClients();
        };

        loadData();

    }, []);

    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-7xl mx-auto">

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-slate-800">
                        Liste des clients
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Tous les utilisateurs enregistrés
                    </p>

                </div>

                <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-slate-900 text-white">

                                <tr>

                                    <th className="px-6 py-4 text-left">
                                        Nom
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Email
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Téléphone
                                    </th>

                                    <th className="px-6 py-4 text-left">
                                        Adresse
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {clients.map((client) => (

                                    <tr
                                        key={client.id}
                                        className="border-b hover:bg-slate-50 transition"
                                    >

                                        <td className="px-6 py-4 font-medium">
                                            {client.nom}
                                        </td>

                                        <td className="px-6 py-4">
                                            {client.email}
                                        </td>

                                        <td className="px-6 py-4">
                                            {client.telephone}
                                        </td>

                                        <td className="px-6 py-4">
                                            {client.adresse}
                                        </td>

                                    
                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ClientsList;
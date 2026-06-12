import { useEffect, useMemo, useState } from "react";
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

    const [clients, setClients] =
        useState<Client[]>([]);

    const [search, setSearch] =
        useState("");

    // =========================================
    // PAGINATION
    // =========================================

    const [currentPage, setCurrentPage] =
        useState(1);

    const itemsPerPage = 4;

    // =========================================
    // FETCH CLIENTS
    // =========================================

    const fetchClients = async () => {

        try {

            const response =
                await api.get(
                    "users/clients/"
                );

            setClients(
                response.data
            );

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

    // =========================================
    // FILTER
    // =========================================

    const filteredClients =
        useMemo(() => {

            return clients.filter(
                (client) => {

                    const value =
                        search.toLowerCase();

                    return (

                        client.nom
                            .toLowerCase()
                            .includes(value)

                        ||

                        client.email
                            .toLowerCase()
                            .includes(value)

                        ||

                        client.telephone
                            .toLowerCase()
                            .includes(value)

                        ||

                        client.adresse
                            .toLowerCase()
                            .includes(value)
                    );
                }
            );

        }, [clients, search]);

    // =========================================
    // PAGINATION LOGIC
    // =========================================

    const totalPages =
        Math.ceil(
            filteredClients.length /
            itemsPerPage
        );

    const startIndex =
        (currentPage - 1) *
        itemsPerPage;

    const currentClients =
        filteredClients.slice(
            startIndex,
            startIndex + itemsPerPage
        );

    // =========================================
    // CHANGE PAGE
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

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-slate-800">

                        Liste des clients

                    </h1>

                    <p className="text-slate-500 mt-2">

                        Tous les utilisateurs enregistrés

                    </p>

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

                                {currentClients.length > 0 ? (

                                    currentClients.map(
                                        (client) => (

                                            <tr
                                                key={client.id}
                                                className="
                                                    border-b
                                                    border-slate-100
                                                    hover:bg-slate-50
                                                    transition
                                                "
                                            >

                                                <td className="px-6 py-4 font-medium text-slate-800">

                                                    {client.nom}

                                                </td>

                                                <td className="px-6 py-4 text-slate-600">

                                                    {client.email}

                                                </td>

                                                <td className="px-6 py-4 text-slate-600">

                                                    {client.telephone}

                                                </td>

                                                <td className="px-6 py-4 text-slate-600">

                                                    {client.adresse}

                                                </td>

                                            </tr>
                                        )
                                    )

                                ) : (

                                    <tr>

                                        <td
                                            colSpan={4}
                                            className="
                                                text-center
                                                py-10
                                                text-slate-500
                                            "
                                        >

                                            Aucun client trouvé

                                        </td>

                                    </tr>
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

                {/* PAGINATION */}

                {filteredClients.length > 0 && (

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

export default ClientsList;
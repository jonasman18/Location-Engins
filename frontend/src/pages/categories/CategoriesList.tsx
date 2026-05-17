import { useEffect, useState } from "react";

import api from "../../api/axios";

import { Link } from "react-router-dom";


interface Categorie {

    id: number;

    nom: string;

    description: string;
}


function CategoriesList() {

    const [categories, setCategories] = useState<Categorie[]>([]);


    const fetchCategories = async () => {

        try {

            const response = await api.get('categories/');

            setCategories(response.data);

        } catch (error) {

            console.log(error);
        }
    };


    useEffect(() => {

        const loadData = async () => {

            await fetchCategories();
        };

        loadData();

    }, []);


    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-7xl mx-auto">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-4xl font-bold text-slate-800">
                            Liste des catégories
                        </h1>

                        <p className="text-slate-500 mt-2">
                            Gestion des catégories d'engins
                        </p>

                    </div>

                    <Link to="/categories/add">

                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl transition font-medium shadow-sm"
                        >

                            Ajouter Catégorie

                        </button>

                    </Link>

                </div>


                {/* Table */}

                <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-slate-900 text-white">

                                <tr>

                                    <th className="text-left px-6 py-4">
                                        ID
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Nom
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Description
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {categories.map((cat) => (

                                    <tr
                                        key={cat.id}
                                        className="border-b border-slate-100 hover:bg-slate-50 transition"
                                    >

                                        <td className="px-6 py-4 font-medium text-slate-700">
                                            #{cat.id}
                                        </td>

                                        <td className="px-6 py-4 font-semibold text-slate-800">
                                            {cat.nom}
                                        </td>

                                        <td className="px-6 py-4 text-slate-600">
                                            {cat.description}
                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex gap-3">

                                                <button
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
                                                >
                                                    Modifier
                                                </button>

                                                <button
                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl transition"
                                                >
                                                    Supprimer
                                                </button>

                                            </div>

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

export default CategoriesList;
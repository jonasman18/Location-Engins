import { useState } from "react";

import api from "../../api/axios";


function AddCategory() {

    const [nom, setNom] = useState<string>('');

    const [description, setDescription] = useState<string>('');


    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        try {

            await api.post('categories/', {
                nom,
                description,
            });

            alert('Catégorie ajoutée avec succès');

            setNom('');

            setDescription('');

        } catch (error) {

            console.log(error);

            alert("Erreur lors de l'ajout");
        }
    };


    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-3xl mx-auto">

                {/* Header */}

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-slate-800">
                        Ajouter une catégorie
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Créer une nouvelle catégorie d'engins
                    </p>

                </div>


                {/* Form Card */}

                <div className="bg-white rounded-3xl shadow-sm p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* Nom */}

                        <div>

                            <label className="block text-slate-700 font-medium mb-2">
                                Nom de la catégorie
                            </label>

                            <input
                                type="text"
                                placeholder="Ex: Terrassement"
                                value={nom}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setNom(e.target.value)}
                                className="w-full border border-slate-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* Description */}

                        <div>

                            <label className="block text-slate-700 font-medium mb-2">
                                Description
                            </label>

                            <textarea
                                placeholder="Description de la catégorie..."
                                value={description}
                                rows={5}
                                onChange={(
                                    e: React.ChangeEvent<HTMLTextAreaElement>
                                ) => setDescription(e.target.value)}
                                className="w-full border border-slate-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* Button */}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition"
                        >

                            Ajouter la catégorie

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddCategory;
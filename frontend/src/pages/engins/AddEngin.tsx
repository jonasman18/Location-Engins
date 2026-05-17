import { useEffect, useState } from "react";

import api from "../../api/axios";
import toast from "react-hot-toast";

interface Categorie {

    id: number;

    nom: string;
}


interface FormDataType {

    nom: string;

    categorie: string;

    description: string;

    prix_jour: string;

    etat: string;
}


function AddEngin() {

    const [categories, setCategories] = useState<Categorie[]>([]);

    const [formData, setFormData] = useState<FormDataType>({
        nom: '',
        categorie: '',
        description: '',
        prix_jour: '',
        etat: 'disponible',
    });


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


    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        try {

            await api.post('engins/', formData);

            toast.success('Engin ajouté avec succès');

            setFormData({
                nom: '',
                categorie: '',
                description: '',
                prix_jour: '',
                etat: 'disponible',
            });

        } catch (error) {

            console.log(error);

            toast.error("Erreur lors de l'ajout");
        }
    };


    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-3xl mx-auto">

                {/* Header */}

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-slate-800">
                        Ajouter un engin
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Ajouter un nouvel engin de location
                    </p>

                </div>


                {/* Card */}

                <div className="bg-white rounded-3xl shadow-sm p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* Nom */}

                        <div>

                            <label className="block text-slate-700 font-medium mb-2">
                                Nom de l'engin
                            </label>

                            <input
                                type="text"
                                name="nom"
                                placeholder="Ex: Bulldozer CAT"
                                value={formData.nom}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* Catégorie */}

                        <div>

                            <label className="block text-slate-700 font-medium mb-2">
                                Catégorie
                            </label>

                            <select
                                name="categorie"
                                value={formData.categorie}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >

                                <option value="">
                                    Choisir catégorie
                                </option>

                                {categories.map((cat) => (

                                    <option
                                        key={cat.id}
                                        value={cat.id}
                                    >
                                        {cat.nom}
                                    </option>
                                ))}

                            </select>

                        </div>


                        {/* Description */}

                        <div>

                            <label className="block text-slate-700 font-medium mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                placeholder="Description de l'engin..."
                                value={formData.description}
                                onChange={handleChange}
                                rows={5}
                                className="w-full border border-slate-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* Prix */}

                        <div>

                            <label className="block text-slate-700 font-medium mb-2">
                                Prix par jour
                            </label>

                            <input
                                type="number"
                                name="prix_jour"
                                placeholder="Prix journalier"
                                value={formData.prix_jour}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>


                        {/* Etat */}

                        <div>

                            <label className="block text-slate-700 font-medium mb-2">
                                Etat
                            </label>

                            <select
                                name="etat"
                                value={formData.etat}
                                onChange={handleChange}
                                className="w-full border border-slate-300 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >

                                <option value="disponible">
                                    Disponible
                                </option>

                                <option value="maintenance">
                                    Maintenance
                                </option>

                                <option value="indisponible">
                                    Indisponible
                                </option>

                            </select>

                        </div>


                        {/* Button */}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold transition"
                        >

                            Ajouter l'engin

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddEngin;
import { useEffect, useState } from "react";

import api from "../../api/axios";
import toast from "react-hot-toast";

import {
    useNavigate,
    useParams
} from "react-router-dom";


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

function EditEngin() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [categories, setCategories] =
        useState<Categorie[]>([]);

    const [formData, setFormData] =
        useState<FormDataType>({
            nom: "",
            categorie: "",
            description: "",
            prix_jour: "",
            etat: "disponible",
        });

    // =====================================
    // FETCH CATEGORIES
    // =====================================

    const fetchCategories = async () => {

        try {

            const response =
                await api.get("categories/");

            setCategories(
                response.data
            );

        } catch (error) {

            console.log(error);
        }
    };

    // =====================================
    // FETCH ENGIN
    // =====================================

    const fetchEngin = async () => {

        try {

            const response =
                await api.get(
                    `engins/${id}/`
                );

            setFormData({

                nom: response.data.nom,

                categorie:
                    response.data.categorie.toString(),

                description:
                    response.data.description,

                prix_jour:
                    response.data.prix_jour,

                etat:
                    response.data.etat,
            });

        } catch (error) {

            console.log(error);
        }
    };

    // =====================================
    // LOAD DATA
    // =====================================

    useEffect(() => {

        const loadData = async () => {

            await fetchCategories();

            await fetchEngin();
        };

        void loadData();

    }, []);

    // =====================================
    // HANDLE CHANGE
    // =====================================

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    // =====================================
    // SUBMIT
    // =====================================

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            await api.put(
                `engins/${id}/`,
                formData
            );

            toast.success("Engin modifié avec succès");
            navigate("/engins");

        } catch (error) {

            console.log(error);

            alert(
                "Erreur lors de la modification"
            );
        }
    };

    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-3xl mx-auto">

                {/* HEADER */}

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-slate-800">

                        Modifier Engin

                    </h1>

                    <p className="text-slate-500 mt-2">

                        Mise à jour des informations

                    </p>

                </div>

                {/* CARD */}

                <div className="bg-white rounded-3xl shadow-sm p-8">

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* NOM */}

                        <div>

                            <label className="block text-slate-700 font-medium mb-2">

                                Nom de l'engin

                            </label>

                            <input
                                type="text"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                className="
                                    w-full
                                    border
                                    border-slate-300
                                    rounded-2xl
                                    px-5
                                    py-4
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>

                        {/* CATEGORIE */}

                        <div>

                            <label className="block text-slate-700 font-medium mb-2">

                                Catégorie

                            </label>

                            <select
                                name="categorie"
                                value={formData.categorie}
                                onChange={handleChange}
                                className="
                                    w-full
                                    border
                                    border-slate-300
                                    rounded-2xl
                                    px-5
                                    py-4
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
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

                        {/* DESCRIPTION */}

                        <div>

                            <label className="block text-slate-700 font-medium mb-2">

                                Description

                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={5}
                                className="
                                    w-full
                                    border
                                    border-slate-300
                                    rounded-2xl
                                    px-5
                                    py-4
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>

                        {/* PRIX */}

                        <div>

                            <label className="block text-slate-700 font-medium mb-2">

                                Prix par jour

                            </label>

                            <input
                                type="number"
                                name="prix_jour"
                                value={formData.prix_jour}
                                onChange={handleChange}
                                className="
                                    w-full
                                    border
                                    border-slate-300
                                    rounded-2xl
                                    px-5
                                    py-4
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>

                        {/* ETAT */}

                        <div>

                            <label className="block text-slate-700 font-medium mb-2">

                                Etat

                            </label>

                            <select
                                name="etat"
                                value={formData.etat}
                                onChange={handleChange}
                                className="
                                    w-full
                                    border
                                    border-slate-300
                                    rounded-2xl
                                    px-5
                                    py-4
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            >

                                <option value="disponible">
                                    Disponible
                                </option>

                                <option value="loue">
                                    Loué
                                </option>

                                <option value="en_maintenance">
                                    En maintenance
                                </option>

                            </select>

                        </div>

                        {/* BUTTON */}

                        <button
                            type="submit"
                            className="
                                w-full
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                py-4
                                rounded-2xl
                                font-semibold
                                transition
                            "
                        >

                            Modifier l'engin

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default EditEngin;
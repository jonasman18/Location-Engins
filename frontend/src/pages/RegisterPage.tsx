import { useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function RegisterPage() {

    const [formData, setFormData] = useState({

        nom: '',
        email: '',
        telephone: '',
        adresse: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if(formData.password !== formData.confirmPassword){

            alert("Les mots de passe ne correspondent pas");

            return;
        }

        try{

            await api.post(
                'users/register/',
                {
                    nom: formData.nom,
                    email: formData.email,
                    telephone: formData.telephone,
                    adresse: formData.adresse,
                    password: formData.password,
                }
            );

            alert("Compte créé avec succès");

        }catch(error){

            console.log(error);

            alert("Erreur lors de l'inscription");
        }
    };

    return (

        <div className="min-h-screen bg-slate-100 flex justify-center items-center p-6">

            <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl p-10">

                <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">

                    Inscription

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        name="nom"
                        placeholder="Nom complet"
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-2xl px-5 py-4"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-2xl px-5 py-4"
                    />

                    <input
                        type="text"
                        name="telephone"
                        placeholder="Téléphone"
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-2xl px-5 py-4"
                    />

                    <textarea
                        name="adresse"
                        placeholder="Adresse"
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-2xl px-5 py-4"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Mot de passe"
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-2xl px-5 py-4"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirmer mot de passe"
                        onChange={handleChange}
                        className="w-full border border-slate-300 rounded-2xl px-5 py-4"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl transition"
                    >

                        Créer un compte

                    </button>

                </form>

                <p className="text-center mt-6 text-slate-500">

                    Déjà un compte ?

                    <Link
                        to="/login"
                        className="text-blue-600 ml-2"
                    >

                        Connexion

                    </Link>

                </p>

            </div>

        </div>
    );
}
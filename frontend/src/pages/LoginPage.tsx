import { useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../api/axios";


function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");

    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<string>("");


    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        setError("");

        try {

            const response = await api.post(
                "users/login/",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem(
                "access",
                response.data.access
            );

            localStorage.setItem(
                "refresh",
                response.data.refresh
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            if (response.data.role === "admin") {

                navigate("/admin-dashboard");

            } else {

                navigate("/client-dashboard");
            }

        } catch (err) {

            setError(
                "Email ou mot de passe incorrect"
            );

            console.log(err);
        }
    };


    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white p-10 rounded-3xl shadow-lg w-full max-w-md">

                <h1 className="text-3xl font-bold mb-8 text-center text-slate-800">

                    Connexion

                </h1>

                {error && (

                    <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-5">

                        {error}

                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
                    >

                        Se connecter

                    </button>

                </form>

            </div>

        </div>
    );
}

export default LoginPage;
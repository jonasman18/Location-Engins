import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

interface Reservation {

    id: number;

    client_nom: string;

    engin_nom: string;

    date_debut: string;

    date_fin: string;

    montant_total: number;

    statut: string;
}

export default function ReservationsList() {

    const [reservations, setReservations] = useState<Reservation[]>([]);

    // =========================
    // FETCH RESERVATIONS
    // =========================

    const fetchReservations = async () => {

        try {

            const response = await api.get(
                'reservations/'
            );

            setReservations(response.data);

        } catch (error) {

            console.log(error);
        }
    };


    // =========================
    // CONFIRMER
    // =========================

    const confirmerReservation = async (
        id: number
    ) => {

        try {

            await api.patch(
                `reservations/${id}/confirmer/`
            );

            fetchReservations();

        } catch (error) {

            console.log(error);
        }
    };


    // =========================
    // ANNULER
    // =========================

    const annulerReservation = async (
        id: number
    ) => {

        try {

            await api.patch(
                `reservations/${id}/annuler/`
            );

            fetchReservations();

        } catch (error) {

            console.log(error);
        }
    };


    // =========================
    // TERMINER
    // =========================

    const terminerReservation = async (
        id: number
    ) => {

        try {

            await api.patch(
                `reservations/${id}/terminer/`
            );

            fetchReservations();

        } catch (error) {

            console.log(error);
        }
    };


    // =========================
    // DELETE
    // =========================

    const deleteReservation = async (
        id: number
    ) => {

        const confirmDelete = window.confirm(
            "Supprimer cette réservation ?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(
                `reservations/${id}/`
            );

            fetchReservations();

        } catch (error) {

            console.log(error);
        }
    };


    // =========================
    // USE EFFECT
    // =========================

    useEffect(() => {

    const loadReservations = async () => {

        try {

            const response = await api.get(
                'reservations/'
            );

            setReservations(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    loadReservations();

}, []);

    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-4xl font-bold text-slate-800">

                            Réservations

                        </h1>

                        <p className="text-slate-500 mt-2">

                            Gestion des réservations des clients

                        </p>

                    </div>

                    <Link to="/reservations/add">

                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl transition shadow-sm"
                        >

                            Nouvelle réservation

                        </button>

                    </Link>

                </div>


                {/* TABLE */}

                <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-slate-900 text-white">

                                <tr>

                                    <th className="text-left px-6 py-4">
                                        Client
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Engin
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Début
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Fin
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Montant
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Statut
                                    </th>

                                    <th className="text-left px-6 py-4">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {reservations.map((reservation) => (

                                    <tr
                                        key={reservation.id}
                                        className="border-b border-slate-100 hover:bg-slate-50 transition"
                                    >

                                        <td className="px-6 py-4 font-medium text-slate-800">

                                            {reservation.client_nom}

                                        </td>

                                        <td className="px-6 py-4 text-slate-600">

                                            {reservation.engin_nom}

                                        </td>

                                        <td className="px-6 py-4 text-slate-600">

                                            {reservation.date_debut}

                                        </td>

                                        <td className="px-6 py-4 text-slate-600">

                                            {reservation.date_fin}

                                        </td>

                                        <td className="px-6 py-4 font-bold text-blue-700">

                                            {reservation.montant_total} Ar

                                        </td>

                                        <td className="px-6 py-4">

                                            <span
                                                className={`px-4 py-2 rounded-full text-sm font-medium ${
                                                    reservation.statut === "confirmee"
                                                        ? "bg-green-100 text-green-700"
                                                        : reservation.statut === "annulee"
                                                        ? "bg-red-100 text-red-700"
                                                        : reservation.statut === "terminee"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                }`}
                                            >

                                                {reservation.statut}

                                            </span>

                                        </td>

                                        <td className="px-6 py-4">

                                            <div className="flex flex-wrap gap-3">

                                                {/* EN ATTENTE */}

                                                {reservation.statut === "en_attente" && (

                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                confirmerReservation(
                                                                    reservation.id
                                                                )
                                                            }
                                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition"
                                                        >

                                                            Confirmer

                                                        </button>

                                                        <button
                                                            onClick={() =>
                                                                annulerReservation(
                                                                    reservation.id
                                                                )
                                                            }
                                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition"
                                                        >

                                                            Annuler

                                                        </button>
                                                    </>
                                                )}


                                                {/* CONFIRMEE */}

                                                {reservation.statut === "confirmee" && (

                                                    <button
                                                        onClick={() =>
                                                            terminerReservation(
                                                                reservation.id
                                                            )
                                                        }
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
                                                    >

                                                        Terminer

                                                    </button>
                                                )}


                                                {/* DELETE */}

                                                <button
                                                    onClick={() =>
                                                        deleteReservation(
                                                            reservation.id
                                                        )
                                                    }
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
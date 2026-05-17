// src/pages/paiements/AddPaiement.tsx

import {
    useEffect,
    useMemo,
    useState
} from "react";

import toast from "react-hot-toast";
import api from "../../api/axios";

import {
    useNavigate
} from "react-router-dom";


// =========================================
// INTERFACES
// =========================================

interface Location {

    id: number;

    utilisateur_nom: string;

    montant_total: string;

    montant_paye: string;

    reste_a_payer: string;

    statut_paiement: string;
}


// =========================================
// COMPONENT
// =========================================

function AddPaiement() {

    const navigate = useNavigate();


    // =========================================
    // STATES
    // =========================================

    const [locations, setLocations] =
        useState<Location[]>([]);

    const [location, setLocation] =
        useState("");

    const [typePaiement, setTypePaiement] =
        useState("total");

    const [montantManuel, setMontantManuel] =
        useState("");

    const [modePaiement, setModePaiement] =
        useState("espece");

    const [
        referenceTransaction,
        setReferenceTransaction
    ] = useState("");

    const [loading, setLoading] =
        useState(false);


    // =========================================
    // FETCH LOCATIONS
    // =========================================

    useEffect(() => {

        const fetchLocations =
            async () => {

                try {

                    const response =
                        await api.get(
                            "locations/"
                        );

                    setLocations(
                        response.data
                    );

                } catch (error) {

                    console.log(error);
                }
            };

        fetchLocations();

    }, []);


    // =========================================
    // LOCATIONS DISPONIBLES
    // =========================================

    const availableLocations =
        useMemo(() => {

            return locations.filter(
                (loc) =>
                    Number(
                        loc.reste_a_payer
                    ) > 0
            );

        }, [locations]);


    // =========================================
    // LOCATION SELECTED
    // =========================================

    const selectedLocation =
        useMemo(() => {

            return locations.find(
                (loc) =>
                    loc.id ===
                    Number(location)
            );

        }, [location, locations]);


    // =========================================
    // MONTANT PAYE
    // =========================================

    const montantPaye =
        useMemo(() => {

            if (!selectedLocation) {

                return 0;
            }

            return Number(
                selectedLocation.montant_paye ?? 0
            );

        }, [selectedLocation]);


    // =========================================
    // RESTE A PAYER
    // =========================================

    const resteAPayer =
        useMemo(() => {

            if (!selectedLocation) {

                return 0;
            }

            // Aucun paiement encore
            if (montantPaye <= 0) {

                return Number(
                    selectedLocation.montant_total
                );
            }

            // Paiement partiel
            return Number(
                selectedLocation.reste_a_payer ?? 0
            );

        }, [
            selectedLocation,
            montantPaye
        ]);


    // =========================================
    // MONTANT AUTO
    // =========================================

    const montant =
        useMemo(() => {

            if (
                !selectedLocation
            ) {

                return "";
            }

            // =====================
            // PAIEMENT TOTAL
            // =====================

            if (
                typePaiement ===
                "total"
            ) {

                return String(
                    resteAPayer
                );
            }

            // =====================
            // ACOMPTE
            // =====================

            if (
                typePaiement ===
                "moitie"
            ) {

                return String(
                    Math.ceil(
                        resteAPayer / 2
                    )
                );
            }

            // =====================
            // PERSONNALISE
            // =====================

            return montantManuel;

        }, [
            selectedLocation,
            typePaiement,
            montantManuel,
            resteAPayer
        ]);


    // =========================================
    // SUBMIT
    // =========================================

    const handleSubmit =
        async (
            e: React.FormEvent
        ) => {

            e.preventDefault();

            try {

                setLoading(true);

                await api.post(
                    "paiements/",
                    {
                        location,
                        montant,
                        mode_paiement:
                            modePaiement,
                        reference_transaction:
                            referenceTransaction,
                    }
                );

                toast.success("Paiement enregistré");

                navigate(
                    "/paiements"
                );

            } catch (error) {

                console.log(error);

                toast.error("Erreur lors du paiement");

            } finally {

                setLoading(false);
            }
        };


    return (

        <div className="min-h-screen bg-slate-100 p-8">

            <div className="max-w-3xl mx-auto">

                <div className="bg-white rounded-3xl shadow-sm p-8">

                    {/* HEADER */}

                    <div className="mb-8">

                        <h1 className="text-4xl font-bold text-slate-800">

                            Nouveau Paiement

                        </h1>

                        <p className="text-slate-500 mt-2">

                            Enregistrer un paiement client

                        </p>

                    </div>


                    {/* FORM */}

                    <form
                        onSubmit={
                            handleSubmit
                        }
                        className="space-y-6"
                    >

                        {/* LOCATION */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">

                                Location

                            </label>

                            <select
                                value={location}
                                onChange={(e) =>
                                    setLocation(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-slate-300 rounded-2xl px-4 py-3"
                                required
                            >

                                <option value="">
                                    Sélectionner une location
                                </option>

                                {availableLocations.map(
                                    (loc) => (

                                        <option
                                            key={
                                                loc.id
                                            }
                                            value={
                                                loc.id
                                            }
                                        >

                                            {
                                                loc.utilisateur_nom
                                            }

                                            {" - "}

                                            {Number(loc.montant_paye) > 0
                                                ? `${loc.reste_a_payer} Ar restant`
                                                : `${loc.montant_total} Ar`
                                            }

                                        </option>
                                    )
                                )}

                            </select>

                        </div>


                        {/* INFOS */}

                        {selectedLocation && (

                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">

                                {/* TOTAL */}

                                <div className="flex justify-between">

                                    <span className="text-slate-500">

                                        Montant total

                                    </span>

                                    <span className="font-bold text-slate-800">

                                        {
                                            selectedLocation.montant_total
                                        }
                                        {" Ar"}

                                    </span>

                                </div>


                                {/* PAYE */}

                                {montantPaye > 0 && (

                                    <div className="flex justify-between">

                                        <span className="text-slate-500">

                                            Déjà payé

                                        </span>

                                        <span className="font-bold text-green-700">

                                            {
                                                selectedLocation.montant_paye
                                            }
                                            {" Ar"}

                                        </span>

                                    </div>

                                )}


                                {/* RESTE */}

                                {montantPaye > 0 && (

                                    <div className="flex justify-between">

                                        <span className="text-slate-500">

                                            Reste à payer

                                        </span>

                                        <span className="font-bold text-red-600">

                                            {
                                                selectedLocation.reste_a_payer
                                            }
                                            {" Ar"}

                                        </span>

                                    </div>

                                )}


                                {/* STATUT */}

                                <div className="flex justify-between">

                                    <span className="text-slate-500">

                                        Statut

                                    </span>

                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            selectedLocation.statut_paiement ===
                                            "paye"
                                                ? "bg-green-100 text-green-700"
                                                : selectedLocation.statut_paiement ===
                                                  "partiel"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >

                                        {
                                            selectedLocation.statut_paiement
                                        }

                                    </span>

                                </div>

                            </div>
                        )}


                        {/* TYPE */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">

                                Type de paiement

                            </label>

                            <select
                                value={
                                    typePaiement
                                }
                                onChange={(e) =>
                                    setTypePaiement(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-slate-300 rounded-2xl px-4 py-3"
                            >

                                <option value="total">

                                    Paiement Total

                                </option>

                                <option value="moitie">

                                    Acompte 50%

                                </option>

                                <option value="personnalise">

                                    Personnalisé

                                </option>

                            </select>

                        </div>


                        {/* MONTANT */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">

                                Montant

                            </label>

                            <input
                                type="number"
                                placeholder="Montant"
                                value={montant}
                                onChange={(e) =>
                                    setMontantManuel(
                                        e.target.value
                                    )
                                }
                                disabled={
                                    typePaiement !==
                                    "personnalise"
                                }
                                className="w-full border border-slate-300 rounded-2xl px-4 py-3 disabled:bg-slate-100"
                                required
                            />

                        </div>


                        {/* MODE */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">

                                Mode de paiement

                            </label>

                            <select
                                value={
                                    modePaiement
                                }
                                onChange={(e) =>
                                    setModePaiement(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-slate-300 rounded-2xl px-4 py-3"
                            >

                                <option value="espece">

                                    Espèce

                                </option>

                                <option value="mobile_money">

                                    Mobile Money

                                </option>

                                <option value="virement">

                                    Virement

                                </option>

                            </select>

                        </div>


                        {/* REFERENCE */}

                        <div>

                            <label className="block text-sm font-medium text-slate-700 mb-2">

                                Référence transaction

                            </label>

                            <input
                                type="text"
                                placeholder="Référence transaction"
                                value={
                                    referenceTransaction
                                }
                                onChange={(e) =>
                                    setReferenceTransaction(
                                        e.target.value
                                    )
                                }
                                className="w-full border border-slate-300 rounded-2xl px-4 py-3"
                            />

                        </div>


                        {/* BUTTON */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-medium transition disabled:opacity-50"
                        >

                            {loading
                                ? "Enregistrement..."
                                : "Enregistrer le paiement"}

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default AddPaiement;
// src/App.tsx

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

/* =========================================
PUBLIC PAGES
========================================= */

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

/* =========================================
ADMIN PAGES
========================================= */

import AdminDashboard from "./pages/AdminDashboard";

import CategoriesList from "./pages/categories/CategoriesList";
import AddCategory from "./pages/categories/AddCategory";

import EnginsList from "./pages/engins/EnginsList";
import AddEngin from "./pages/engins/AddEngin";
import EditEngin from "./pages/engins/EditEngin";

import ClientsList from "./pages/clients/ClientsList";

import ReservationsList from "./pages/reservations/ReservationsList";
import AddReservation from "./pages/reservations/AddReservation";

import LocationsList from "./pages/locations/LocationsList";
import AddLocation from "./pages/locations/AddLocation";

import PaiementsList from "./pages/paiements/PaiementsList";
import AddPaiement from "./pages/paiements/AddPaiement";

import MaintenancesList from "./pages/maintenances/MaintenancesList";
import AddMaintenance from "./pages/maintenances/AddMaintenance";
import EditMaintenance from "./pages/maintenances/EditMaintenance";

/* =========================================
CLIENT PAGES
========================================= */

import ClientDashboard from "./pages/ClientDashboard";

/* =========================================
ROUTES
========================================= */

import AdminRoute from "./routes/AdminRoute";
import ClientRoute from "./routes/ClientRoute";

/* =========================================
LAYOUTS
========================================= */

import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";
import SharedLayout from "./layouts/SharedLayout";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =========================================
                PUBLIC
                ========================================= */}

                <Route
                    path="/"
                    element={<HomePage />}
                />

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                {/* =========================================
                PAGES COMMUNES
                ACCESSIBLES ADMIN + CLIENT
                ========================================= */}

                <Route element={<SharedLayout />}>

                    {/* ENGINS */}

                    <Route
                        path="/engins"
                        element={<EnginsList />}
                    />

                    {/* RESERVATIONS */}

                    <Route
                        path="/reservations"
                        element={<ReservationsList />}
                    />

                    <Route
                        path="/reservations/add"
                        element={<AddReservation />}
                    />

                    {/* AJOUT PAIEMENT */}

                    <Route
                        path="/paiements/add"
                        element={<AddPaiement />}
                    />

                    <Route
                        path="/paiements"
                        element={<PaiementsList />}
                    />

                </Route>

                {/* =========================================
                ADMIN LAYOUT
                ========================================= */}

                <Route
                    element={
                        <AdminRoute>
                            <AdminLayout />
                        </AdminRoute>
                    }
                >

                    {/* DASHBOARD */}

                    <Route
                        path="/admin-dashboard"
                        element={<AdminDashboard />}
                    />

                    {/* ENGINS */}

                    <Route
                        path="/engins/add"
                        element={<AddEngin />}
                    />

                    <Route
                        path="/engins/edit/:id"
                        element={<EditEngin />}
                    />

                    {/* CATEGORIES */}

                    <Route
                        path="/categories"
                        element={<CategoriesList />}
                    />

                    <Route
                        path="/categories/add"
                        element={<AddCategory />}
                    />

                    {/* CLIENTS */}

                    <Route
                        path="/clients"
                        element={<ClientsList />}
                    />

                    {/* LOCATIONS */}

                    <Route
                        path="/locations"
                        element={<LocationsList />}
                    />

                    <Route
                        path="/locations/add"
                        element={<AddLocation />}
                    />

                    {/* MAINTENANCES */}

                    <Route
                        path="/maintenances"
                        element={<MaintenancesList />}
                    />

                    <Route
                        path="/maintenances/add"
                        element={<AddMaintenance />}
                    />

                    <Route
                        path="/maintenances/edit/:id"
                        element={<EditMaintenance />}
                    />

                </Route>

                {/* =========================================
                CLIENT LAYOUT
                ========================================= */}

                <Route
                    element={
                        <ClientRoute>
                            <ClientLayout />
                        </ClientRoute>
                    }
                >

                    {/* DASHBOARD */}

                    <Route
                        path="/client-dashboard"
                        element={<ClientDashboard />}
                    />

                </Route>


                {/* =========================================
                404
                ========================================= */}

                <Route
                    path="*"
                    element={

                        <div className="min-h-screen flex items-center justify-center bg-slate-100">

                            <div className="text-center">

                                <h1 className="text-7xl font-black text-slate-800 mb-4">

                                    404

                                </h1>

                                <p className="text-slate-500 text-lg">

                                    Page introuvable

                                </p>

                            </div>

                        </div>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
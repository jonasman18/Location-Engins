import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CategoriesList from "./pages/categories/CategoriesList";
import AddCategory from "./pages/categories/AddCategory";
import EnginsList from "./pages/engins/EnginsList";
import AddEngin from "./pages/engins/AddEngin";
import ClientsList from "./pages/clients/ClientsList";
import ReservationsList from "./pages/reservations/ReservationsList";
import AddReservation from "./pages/reservations/AddReservation";
import LocationsList from "./pages/locations/LocationsList";
import AddLocation from "./pages/locations/AddLocation";
import PaiementsList from "./pages/paiements/PaiementsList";
import AddPaiement from "./pages/paiements/AddPaiement";
import MaintenancesList from "./pages/maintenances/MaintenancesList";
import AddMaintenance from "./pages/maintenances/AddMaintenance";

function App() {

    return (

        <BrowserRouter>

            <Routes>
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
                <Route
                    path="/categories"
                    element={<CategoriesList />}
                />
                <Route
                    path="/categories/add"
                    element={<AddCategory />}
                />
                <Route
                    path="/engins"
                    element={<EnginsList />}
                />
                <Route
                    path="/engins/add"
                    element={<AddEngin />}
                />
                <Route
                    path="/clients"
                    element={<ClientsList />}
                />
                <Route
                    path="/reservations"
                    element={<ReservationsList />}
                />
                <Route
                    path="/reservations/add"
                    element={<AddReservation />}
                />
                <Route
                    path="/locations"
                    element={<LocationsList />}
                />
                <Route
                    path="/locations/add"
                    element={<AddLocation />}
                />
                <Route
                path="/paiements"
                element={<PaiementsList />}
                />

                <Route
                path="/paiements/add"
                element={<AddPaiement />}
                />

                <Route
                path="/maintenances"
                element={<MaintenancesList />}
                />

                <Route
                path="/maintenances/add"
                element={<AddMaintenance />}
                />  
            </Routes>

        </BrowserRouter>
    );
}

export default App;
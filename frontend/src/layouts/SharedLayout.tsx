// src/layouts/SharedLayout.tsx

import AdminLayout from "./AdminLayout";
import ClientLayout from "./ClientLayout";

export default function SharedLayout() {

    const role = sessionStorage.getItem("role");

    if (role === "admin") {

        return <AdminLayout />;
    }

    return <ClientLayout />;
}
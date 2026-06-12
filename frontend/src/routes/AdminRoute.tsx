import { Navigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

function AdminRoute({ children }: Props) {

    const token = sessionStorage.getItem("access");

    const role = sessionStorage.getItem("role");

    if (!token) {

        return <Navigate to="/login" />;
    }

    if (role !== "admin") {

        return <Navigate to="/" />;
    }

    return children;
}

export default AdminRoute;
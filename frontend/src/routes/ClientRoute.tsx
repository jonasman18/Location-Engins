import { Navigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
}

function ClientRoute({ children }: Props) {

    const token = sessionStorage.getItem("access");

    const role = sessionStorage.getItem("role");

    if (!token) {

        return <Navigate to="/login" />;
    }

    if (role !== "client") {

        return <Navigate to="/" />;
    }

    return children;
}

export default ClientRoute;
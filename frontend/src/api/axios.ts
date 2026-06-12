import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});


// =========================================
// REQUEST
// =========================================

api.interceptors.request.use((config) => {

    const token = sessionStorage.getItem("access");

    if (token) {

        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
});


// =========================================
// RESPONSE
// =========================================

api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest = error.config;

        // ACCESS EXPIRE

        if (

            error.response?.status === 401 &&
            !originalRequest._retry

        ) {

            originalRequest._retry = true;

            try {

                const refresh =
                    sessionStorage.getItem("refresh");

                const response =
                    await axios.post(
                        "http://127.0.0.1:8000/api/token/refresh/",
                        {
                            refresh,
                        }
                    );

                const newAccess =
                    response.data.access;

                sessionStorage.setItem(
                    "access",
                    newAccess
                );

                originalRequest.headers.Authorization =
                    `Bearer ${newAccess}`;

                return api(originalRequest);

            } catch (refreshError) {

                sessionStorage.clear();

                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
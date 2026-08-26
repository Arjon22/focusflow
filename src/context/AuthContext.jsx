import {
    createContext,
    useState,
} from "react";

import {
    registerUser,
    loginUser,
} from "../services/api";


const AuthContext = createContext();


// ========================
// Restore User
// ========================

const getSavedUser = () => {

    const savedUser =
        sessionStorage.getItem(
            "focusflow_current_user"
        );

    if (!savedUser) {
        return null;
    }

    try {

        return JSON.parse(savedUser);

    } catch (error) {

        console.error(
            "Failed to restore user:",
            error
        );

        sessionStorage.removeItem(
            "focusflow_current_user"
        );

        return null;
    }
};


// ========================
// Auth Provider
// ========================

export function AuthProvider({
    children,
}) {

    const [user, setUser] =
        useState(getSavedUser);


    // ========================
    // Register
    // ========================

    const register = async (
        email,
        password
    ) => {

        try {

            const response =
                await registerUser(
                    email,
                    password
                );


            if (
                response.message ===
                "Email already registered"
            ) {

                return {
                    success: false,
                    message:
                        "An account with this email already exists.",
                };
            }


            const loggedInUser = {

                id:
                    response.user_id,

                email:
                    response.email,
            };


            sessionStorage.setItem(
                "focusflow_current_user",
                JSON.stringify(
                    loggedInUser
                )
            );


            setUser(
                loggedInUser
            );


            return {

                success: true,

                user:
                    loggedInUser,
            };

        } catch (error) {

            console.error(
                "Registration failed:",
                error
            );

            return {

                success: false,

                message:
                    error.message ||
                    "Registration failed.",
            };
        }
    };


    // ========================
    // Login
    // ========================

    const login = async (
        email,
        password
    ) => {

        try {

            const response =
                await loginUser(
                    email,
                    password
                );


            if (
                response.message ===
                "Invalid email or password"
            ) {

                return {

                    success: false,

                    message:
                        "Invalid email or password.",
                };
            }


            const loggedInUser = {

                id:
                    response.user_id,

                email:
                    response.email,
            };


            sessionStorage.setItem(
                "focusflow_current_user",
                JSON.stringify(
                    loggedInUser
                )
            );


            setUser(
                loggedInUser
            );


            return {

                success: true,

                user:
                    loggedInUser,
            };

        } catch (error) {

            console.error(
                "Login failed:",
                error
            );

            return {

                success: false,

                message:
                    error.message ||
                    "Login failed.",
            };
        }
    };


    // ========================
    // Logout
    // ========================

    const logout = () => {

        sessionStorage.removeItem(
            "focusflow_current_user"
        );

        setUser(null);
    };


    return (

        <AuthContext.Provider
            value={{

                user,

                register,

                login,

                logout,
            }}
        >

            {children}

        </AuthContext.Provider>
    );
}


export {
    AuthContext,
};
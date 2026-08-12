import {
    createContext,
    useState,
} from "react";

const AuthContext = createContext();

const USERS_KEY =
    "focusflow_users";

const CURRENT_USER_KEY =
    "focusflow_current_user";


// ========================
// Restore User
// ========================

const getSavedUser = () => {

    const savedUser =
        localStorage.getItem(
            CURRENT_USER_KEY
        );

    if (!savedUser) {
        return null;
    }

    try {

        return JSON.parse(
            savedUser
        );

    } catch (error) {

        console.error(
            "Failed to restore user:",
            error
        );

        localStorage.removeItem(
            CURRENT_USER_KEY
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

    const register = (
        email,
        password
    ) => {

        const normalizedEmail =
            email.trim().toLowerCase();


        const savedUsers =
            JSON.parse(
                localStorage.getItem(
                    USERS_KEY
                ) || "[]"
            );


        const existingUser =
            savedUsers.find(
                (existingUser) =>
                    existingUser.email ===
                    normalizedEmail
            );


        if (existingUser) {

            return {
                success: false,

                message:
                    "An account with this email already exists.",
            };
        }


        const newUser = {

            id:
                Date.now().toString(),

            email:
                normalizedEmail,

            password,
        };


        const updatedUsers = [

            ...savedUsers,

            newUser,
        ];


        localStorage.setItem(

            USERS_KEY,

            JSON.stringify(
                updatedUsers
            )
        );


        // Automatically login
        const loggedInUser = {

            id:
                newUser.id,

            email:
                newUser.email,
        };


        localStorage.setItem(

            CURRENT_USER_KEY,

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
    };


    // ========================
    // Login
    // ========================

    const login = (
        email,
        password
    ) => {

        const normalizedEmail =
            email.trim().toLowerCase();


        const savedUsers =
            JSON.parse(
                localStorage.getItem(
                    USERS_KEY
                ) || "[]"
            );


        const existingUser =
            savedUsers.find(
                (savedUser) =>

                    savedUser.email ===
                        normalizedEmail &&

                    savedUser.password ===
                        password
            );


        if (!existingUser) {

            return {

                success: false,

                message:
                    "Invalid email or password.",
            };
        }


        const loggedInUser = {

            id:
                existingUser.id,

            email:
                existingUser.email,
        };


        localStorage.setItem(

            CURRENT_USER_KEY,

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
    };


    // ========================
    // Logout
    // ========================

    const logout = () => {

        localStorage.removeItem(
            CURRENT_USER_KEY
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
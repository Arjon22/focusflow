import { useState } from "react";
import {
    Link,
    useNavigate,
} from "react-router-dom";

import toast from "react-hot-toast";

import {
    useAuth,
} from "../context/useAuth";


function Register() {

    const {
        register,
    } = useAuth();

    const navigate =
        useNavigate();


    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");


    const handleSubmit = (event) => {

        event.preventDefault();


        if (
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {

            toast.error(
                "Please fill in all fields."
            );

            return;
        }


        if (password !== confirmPassword) {

            toast.error(
                "Passwords do not match."
            );

            return;
        }


        const result =
            register(
                email,
                password
            );


        if (!result.success) {

            toast.error(
                result.message
            );

            return;
        }


        toast.success(
            "Account created! 🌸"
        );


        navigate("/tasks");
    };


    return (

        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-header">

                    <div className="auth-icon">
                        🌸
                    </div>

                    <h1>
                        Create Account
                    </h1>

                    <p>
                        Start organizing your
                        day with FocusFlow.
                    </p>

                </div>


                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(event) =>
                            setEmail(
                                event.target.value
                            )
                        }
                    />


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(event) =>
                            setPassword(
                                event.target.value
                            )
                        }
                    />


                    <label>
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        placeholder="Repeat your password"
                        value={confirmPassword}
                        onChange={(event) =>
                            setConfirmPassword(
                                event.target.value
                            )
                        }
                    />


                    <button
                        type="submit"
                        className="auth-button"
                    >
                        ✨ Create Account
                    </button>

                </form>


                <div className="auth-footer">

                    <span>
                        Already have an account?
                    </span>

                    <Link to="/login">
                        Sign in
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Register;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/useAuth";

function Login() {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (event) => {

        event.preventDefault();

        if (!email.trim() || !password) {
            toast.error(
                "Please enter email and password."
            );

            return;
        }


        const result =
            login(email, password);


        if (!result.success) {

            toast.error(
                result.message
            );

            return;
        }


        toast.success(
            "Welcome back! 🌸"
        );

        navigate("/tasks");
    };


    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-header">

                    <div className="auth-icon">
                        🔐
                    </div>

                    <h1>
                        Welcome Back
                    </h1>

                    <p>
                        Sign in to continue
                        using FocusFlow.
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
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) =>
                            setPassword(
                                event.target.value
                            )
                        }
                    />


                    <button
                        type="submit"
                        className="auth-button"
                    >
                        🔐 Sign In
                    </button>

                </form>


                <div className="auth-footer">

                    <span>
                        Don't have an account?
                    </span>

                    <Link to="/register">
                        Create one
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Login;
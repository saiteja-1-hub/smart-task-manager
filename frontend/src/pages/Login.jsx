import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    CheckSquare,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight
} from "lucide-react";

import {
    useAuth
} from "../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();

    const {
        login,
        loading
    } = useAuth();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] =
        useState(false);

    const [error, setError] =
        useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            await login(form);

            navigate("/");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                error.message ||
                "Invalid email or password."
            );

        }
    };

    return (
        <div className="auth-page">

            <div className="auth-brand-side">

                <div className="auth-brand">

                    <div className="auth-logo">
                        <CheckSquare size={25} />
                    </div>

                    SmartTodo

                </div>

                <div className="auth-promotion">

                    <span>
                        SMART TASK MANAGEMENT
                    </span>

                    <h1>
                        Organize your day.
                        <br />
                        <em>
                            Get things done.
                        </em>
                    </h1>

                    <p>
                        Manage your tasks,
                        track your progress and
                        stay focused on what
                        matters.
                    </p>

                </div>

            </div>

            <div className="auth-form-side">

                <div className="auth-form">

                    <div className="mobile-auth-brand">
                        <div className="auth-logo">
                            <CheckSquare size={22} />
                        </div>

                        SmartTodo
                    </div>

                    <h2>
                        Welcome back 👋
                    </h2>

                    <p className="auth-description">
                        Sign in to continue
                        to your workspace.
                    </p>

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                    >

                        <div className="form-field">

                            <label>
                                Email
                            </label>

                            <div className="auth-input">

                                <Mail size={17} />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="form-field">

                            <label>
                                Password
                            </label>

                            <div className="auth-input">

                                <Lock size={17} />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Enter password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    type="button"
                                    className="password-eye"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >
                                    {showPassword
                                        ? <EyeOff size={17} />
                                        : <Eye size={17} />
                                    }
                                </button>

                            </div>

                        </div>

                        <button
                            className="auth-submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Signing in..."
                                : "Sign in"
                            }

                            {!loading && (
                                <ArrowRight size={17} />
                            )}

                        </button>

                    </form>

                    <p className="auth-switch">
                        Don't have an account?

                        <Link to="/register">
                            Create account
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
};

export default Login;
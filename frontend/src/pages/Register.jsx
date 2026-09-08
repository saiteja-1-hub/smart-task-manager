import {
    useState
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    CheckSquare,
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight
} from "lucide-react";

import {
    useAuth
} from "../context/AuthContext";

const Register = () => {

    const navigate = useNavigate();

    const {
        register,
        loading
    } = useAuth();

    const [form, setForm] = useState({
        name: "",
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

            const data =
                await register(form);

            if (data.token) {

                navigate("/");

            } else {

                navigate("/login");

            }

        } catch (error) {

            setError(
                error.response?.data?.message ||
                error.message ||
                "Registration failed."
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
                        BUILD BETTER HABITS
                    </span>

                    <h1>
                        Plan your work.
                        <br />
                        <em>
                            Achieve more.
                        </em>
                    </h1>

                    <p>
                        Turn your plans into
                        organized actions with
                        SmartTodo.
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
                        Create your account
                    </h2>

                    <p className="auth-description">
                        Start organizing your
                        tasks today.
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
                                Name
                            </label>

                            <div className="auth-input">

                                <User size={17} />

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

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
                                    placeholder="At least 6 characters"
                                    value={form.password}
                                    onChange={handleChange}
                                    minLength={6}
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
                                ? "Creating account..."
                                : "Create account"
                            }

                            {!loading && (
                                <ArrowRight size={17} />
                            )}

                        </button>

                    </form>

                    <p className="auth-switch">

                        Already have an account?

                        <Link to="/login">
                            Sign in
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
};

export default Register;
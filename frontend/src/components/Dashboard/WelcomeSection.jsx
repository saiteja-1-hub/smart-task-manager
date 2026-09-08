import { CalendarDays, Plus, Sparkles } from "lucide-react";

const WelcomeSection = ({ user, onCreateTask }) => {
    const getFirstName = () => {
        if (!user) return "there";

        if (user.name) {
            return user.name.split(" ")[0];
        }

        if (user.username) {
            return user.username.split(" ")[0];
        }

        if (user.email) {
            return user.email.split("@")[0];
        }

        return "there";
    };

    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour < 12) {
            return "Good morning";
        }

        if (hour < 17) {
            return "Good afternoon";
        }

        return "Good evening";
    };

    const formattedDate = new Intl.DateTimeFormat("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date());

    return (
        <section className="welcome-section">
            <div className="welcome-content">
                <div className="welcome-badge">
                    <Sparkles size={15} />
                    <span>Stay productive</span>
                </div>

                <h1>
                    {getGreeting()}, {getFirstName()}! 👋
                </h1>

                <p>
                    Organize your day, focus on what matters, and get things
                    done one task at a time.
                </p>

                <div className="welcome-date">
                    <CalendarDays size={17} />
                    <span>{formattedDate}</span>
                </div>

                <button
                    type="button"
                    className="primary-button welcome-add-button"
                    onClick={onCreateTask}
                >
                    <Plus size={19} />
                    <span>Create New Task</span>
                </button>
            </div>

            <div className="welcome-decoration">
                <div className="decoration-circle circle-one"></div>
                <div className="decoration-circle circle-two"></div>

                <div className="decoration-card">
                    <div className="decoration-icon">
                        <Sparkles size={28} />
                    </div>

                    <div>
                        <strong>Make today count</strong>
                        <span>Small progress is still progress.</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WelcomeSection;
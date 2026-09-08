 
import {
    Bell,
    CheckSquare,
    Plus,
    User,
} from "lucide-react";

const Navbar = ({
    onProfileClick,
    onCreateTask,
}) => {
    return (
        <header className="navbar">
            <div className="navbar-container">

                {/* Logo */}
                <div className="navbar-brand">
                    <div className="navbar-logo">
                        <CheckSquare size={21} />
                    </div>

                    <div className="navbar-title">
                        <span>Smart</span>
                        <strong>Todo</strong>
                    </div>
                </div>

                {/* Navigation Actions */}
                <div className="navbar-actions">

                    {/* Create Task */}
                    <button
                        type="button"
                        className="navbar-create-button"
                        onClick={() => {
                            if (onCreateTask) {
                                onCreateTask();
                            }
                        }}
                    >
                        <Plus size={18} />
                        <span>Create Task</span>
                    </button>

                    {/* Notifications */}
                    <button
                        type="button"
                        className="navbar-icon-button"
                        aria-label="Notifications"
                    >
                        <Bell size={19} />

                        <span className="notification-dot" />
                    </button>

                    {/* Profile */}
                    <button
                        type="button"
                        className="navbar-profile-button"
                        onClick={() => {
                            if (onProfileClick) {
                                onProfileClick();
                            }
                        }}
                        aria-label="Open profile"
                    >
                        <div className="navbar-avatar">
                            <User size={18} />
                        </div>
                    </button>

                </div>
            </div>
        </header>
    );
};

export default Navbar;
 

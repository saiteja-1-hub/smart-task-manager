import {
    Mail,
    ShieldCheck,
    User
} from "lucide-react";

import Modal from "./Modal";
import { useAuth } from "../../context/AuthContext";

const ProfileModal = ({
    isOpen,
    onClose
}) => {

    const { user } = useAuth();

    const name =
        user?.name ||
        user?.username ||
        "User";

    const email =
        user?.email ||
        "No email";

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="My profile"
            subtitle="Your account information."
        >

            <div className="profile-modal-content">

                <div className="profile-header">

                    <div className="large-avatar">
                        {name
                            .charAt(0)
                            .toUpperCase()
                        }
                    </div>

                    <h3>
                        {name}
                    </h3>

                    <p>
                        {email}
                    </p>

                </div>

                <div className="profile-details">

                    <div className="profile-detail">

                        <div className="profile-detail-icon">
                            <User size={17} />
                        </div>

                        <div>
                            <span>
                                Name
                            </span>

                            <strong>
                                {name}
                            </strong>
                        </div>

                    </div>

                    <div className="profile-detail">

                        <div className="profile-detail-icon">
                            <Mail size={17} />
                        </div>

                        <div>
                            <span>
                                Email
                            </span>

                            <strong>
                                {email}
                            </strong>
                        </div>

                    </div>

                    <div className="profile-detail">

                        <div className="profile-detail-icon">
                            <ShieldCheck size={17} />
                        </div>

                        <div>
                            <span>
                                Account
                            </span>

                            <strong>
                                Active
                            </strong>
                        </div>

                    </div>

                </div>

                <div className="modal-footer">

                    <button
                        className="button-primary full-width"
                        onClick={onClose}
                    >
                        Done
                    </button>

                </div>

            </div>

        </Modal>
    );
};

export default ProfileModal;
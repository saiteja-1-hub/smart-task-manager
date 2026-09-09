import {
    Mail,
    ShieldCheck,
    User,
} from "lucide-react";

import Modal from "./Modal";

const ProfileModal = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Profile"
        >
            <div className="profile-modal-content">

                {/* Profile Header */}
                <div className="profile-header">
                    <div className="profile-avatar">
                        <User size={32} />
                    </div>

                    <div className="profile-info">
                        <h3>Task Manager User</h3>
                        <p>Shared Workspace</p>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="profile-details">

                    <div className="profile-detail-item">
                        <div className="profile-detail-icon">
                            <User size={18} />
                        </div>

                        <div>
                            <span>Name</span>
                            <strong>Task Manager User</strong>
                        </div>
                    </div>

                    <div className="profile-detail-item">
                        <div className="profile-detail-icon">
                            <Mail size={18} />
                        </div>

                        <div>
                            <span>Email</span>
                            <strong>Shared Workspace</strong>
                        </div>
                    </div>

                    <div className="profile-detail-item">
                        <div className="profile-detail-icon">
                            <ShieldCheck size={18} />
                        </div>

                        <div>
                            <span>Access</span>
                            <strong>Shared Task Manager</strong>
                        </div>
                    </div>

                </div>

                {/* Information */}
                <div className="profile-notice">
                    <ShieldCheck size={18} />

                    <p>
                        This task manager is running in
                        shared workspace mode. No login or
                        authentication is required.
                    </p>
                </div>

            </div>
        </Modal>
    );
};

export default ProfileModal;
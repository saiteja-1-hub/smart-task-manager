import {
    AlertTriangle
} from "lucide-react";

import Modal from "./Modal";

const ConfirmDeleteModal = ({
    isOpen,
    onClose,
    onConfirm,
    task,
    loading
}) => {

    if (!task) {
        return null;
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Delete task?"
            subtitle="This action cannot be undone."
        >

            <div className="delete-confirmation">

                <div className="delete-icon">
                    <AlertTriangle size={25} />
                </div>

                <p>
                    Are you sure you want to delete
                    <strong>
                        {" "}{task.title}
                    </strong>
                    ?
                </p>

                <div className="modal-footer">

                    <button
                        className="button-secondary"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        className="button-danger"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading
                            ? "Deleting..."
                            : "Delete task"
                        }
                    </button>

                </div>

            </div>

        </Modal>
    );
};

export default ConfirmDeleteModal;
import { AlertCircle, X } from "lucide-react";

const ErrorMessage = ({
    message,
    onClose
}) => {

    if (!message) {
        return null;
    }

    return (
        <div className="error-banner">

            <AlertCircle size={18} />

            <span>{message}</span>

            {onClose && (
                <button
                    onClick={onClose}
                >
                    <X size={16} />
                </button>
            )}

        </div>
    );
};

export default ErrorMessage;
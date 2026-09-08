import { LoaderCircle } from "lucide-react";

const Loading = ({ text = "Loading..." }) => {
    return (
        <div className="loading-container">
            <div className="loading-spinner">
                <LoaderCircle size={32} />
            </div>

            <p>{text}</p>
        </div>
    );
};

export default Loading;
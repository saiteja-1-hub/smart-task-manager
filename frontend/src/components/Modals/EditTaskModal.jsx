import {
    useEffect,
    useState
} from "react";

import Modal from "./Modal";
import { useTasks } from "../../context/TaskContext";

const EditTaskModal = ({
    isOpen,
    onClose,
    task
}) => {

    const { editTask } = useTasks();

    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "medium",
        status: "pending",
        due_date: ""
    });

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    useEffect(() => {

        if (!task) {
            return;
        }

        setForm({
            title: task.title || "",
            description: task.description || "",
            priority:
                task.priority || "medium",
            status:
                task.status || "pending",
            due_date: task.due_date
                ? task.due_date.split("T")[0]
                : ""
        });

    }, [task]);

    if (!task) {
        return null;
    }

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            await editTask(
                task.id,
                form
            );

            onClose();

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to update task."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Edit task"
            subtitle="Update your task details."
        >

            <form
                className="modal-form"
                onSubmit={handleSubmit}
            >

                {error && (
                    <div className="form-error">
                        {error}
                    </div>
                )}

                <div className="form-field">

                    <label>
                        Task title
                    </label>

                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-field">

                    <label>
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows="4"
                    />

                </div>

                <div className="form-two-column">

                    <div className="form-field">

                        <label>
                            Priority
                        </label>

                        <select
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                        >

                            <option value="low">
                                Low
                            </option>

                            <option value="medium">
                                Medium
                            </option>

                            <option value="high">
                                High
                            </option>

                        </select>

                    </div>

                    <div className="form-field">

                        <label>
                            Status
                        </label>

                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                        >

                            <option value="pending">
                                Pending
                            </option>

                            <option value="in_progress">
                                In progress
                            </option>

                            <option value="completed">
                                Completed
                            </option>

                        </select>

                    </div>

                </div>

                <div className="form-field">

                    <label>
                        Due date
                    </label>

                    <input
                        type="date"
                        name="due_date"
                        value={form.due_date}
                        onChange={handleChange}
                    />

                </div>

                <div className="modal-footer">

                    <button
                        type="button"
                        className="button-secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="button-primary"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : "Save changes"
                        }
                    </button>

                </div>

            </form>

        </Modal>
    );
};

export default EditTaskModal;
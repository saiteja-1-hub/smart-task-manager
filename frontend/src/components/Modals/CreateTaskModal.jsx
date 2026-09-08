
import { useEffect, useState } from "react";

import {
    X,
    Plus,
    ClipboardList,
    AlignLeft,
    Flag,
    CalendarDays,
    Tag,
} from "lucide-react";

import Modal from "./Modal";

const CreateTaskModal = ({
    isOpen,
    onClose,
    onCreate,
    categories = [],
    loading = false,
}) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "MEDIUM",
        dueDate: "",
        categoryId: "",
    });

    const [error, setError] = useState("");

    // Reset form whenever modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData({
                title: "",
                description: "",
                priority: "MEDIUM",
                dueDate: "",
                categoryId: "",
            });

            setError("");
        }
    }, [isOpen]);

    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };

    // Create task
    const handleSubmit = async (event) => {
        event.preventDefault();

        const title = formData.title.trim();

        // Validate title
        if (!title) {
            setError("Task title is required.");
            return;
        }

        if (title.length < 2) {
            setError(
                "Task title must contain at least 2 characters."
            );
            return;
        }

        // Data sent to backend
        const taskData = {
            title,
            description: formData.description.trim(),

            // IMPORTANT:
            // Backend expects uppercase priority values
            priority: formData.priority,

            // Backend controller expects category_id
            category_id: formData.categoryId || null,

            // Backend controller expects due_date
            due_date: formData.dueDate || null,

            // Backend will use TODO when status is not supplied
            status: "TODO",
        };

        try {
            setError("");

            await onCreate(taskData);
        } catch (err) {
            console.error("Create task error:", err);

            const message =
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                err?.message ||
                "Unable to create task.";

            setError(message);
        }
    };

    // Don't render when closed
    if (!isOpen) {
        return null;
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="task-modal">

                {/* =========================================
                    MODAL HEADER
                ========================================= */}

                <div className="modal-header">

                    <div className="modal-title-wrapper">

                        <div className="modal-icon">
                            <ClipboardList size={21} />
                        </div>

                        <div>
                            <h2>Create New Task</h2>

                            <p>
                                Add something important to
                                your task list.
                            </p>
                        </div>

                    </div>

                    <button
                        type="button"
                        className="modal-close-button"
                        onClick={onClose}
                        disabled={loading}
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* =========================================
                    ERROR MESSAGE
                ========================================= */}

                {error && (
                    <div className="form-error">
                        {error}
                    </div>
                )}

                {/* =========================================
                    CREATE TASK FORM
                ========================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="task-form"
                >

                    {/* =====================================
                        TITLE
                    ===================================== */}

                    <div className="form-group">

                        <label htmlFor="task-title">
                            Task Title <span>*</span>
                        </label>

                        <div className="input-wrapper">

                            <ClipboardList size={18} />

                            <input
                                id="task-title"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="What do you need to do?"
                                maxLength={150}
                                autoFocus
                                disabled={loading}
                            />

                        </div>

                    </div>

                    {/* =====================================
                        DESCRIPTION
                    ===================================== */}

                    <div className="form-group">

                        <label htmlFor="task-description">
                            Description
                        </label>

                        <div className="textarea-wrapper">

                            <AlignLeft size={18} />

                            <textarea
                                id="task-description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Add some details about this task..."
                                rows={4}
                                maxLength={1000}
                                disabled={loading}
                            />

                        </div>

                    </div>

                    {/* =====================================
                        PRIORITY + CATEGORY
                    ===================================== */}

                    <div className="form-row">

                        {/* =================================
                            PRIORITY
                        ================================= */}

                        <div className="form-group">

                            <label htmlFor="task-priority">

                                <Flag size={15} />

                                Priority

                            </label>

                            <select
                                id="task-priority"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                disabled={loading}
                            >

                                <option value="LOW">
                                    Low
                                </option>

                                <option value="MEDIUM">
                                    Medium
                                </option>

                                <option value="HIGH">
                                    High
                                </option>

                            </select>

                        </div>

                        {/* =================================
                            CATEGORY
                        ================================= */}

                        <div className="form-group">

                            <label htmlFor="task-category">

                                <Tag size={15} />

                                Category

                            </label>

                            <select
                                id="task-category"
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                disabled={loading}
                            >

                                <option value="">
                                    No Category
                                </option>

                                {categories.length > 0 ? (
                                    categories.map(
                                        (category) => {

                                            const id =
                                                category.id ??
                                                category._id ??
                                                category.category_id;

                                            const name =
                                                category.name ??
                                                category.category_name ??
                                                category.title;

                                            return (
                                                <option
                                                    key={id}
                                                    value={id}
                                                >
                                                    {name}
                                                </option>
                                            );
                                        }
                                    )
                                ) : (
                                    <option
                                        value=""
                                        disabled
                                    >
                                        No categories available
                                    </option>
                                )}

                            </select>

                        </div>

                    </div>

                    {/* =====================================
                        DUE DATE
                    ===================================== */}

                    <div className="form-group">

                        <label htmlFor="task-due-date">

                            <CalendarDays size={15} />

                            Due Date

                        </label>

                        <div className="input-wrapper">

                            <CalendarDays size={18} />

                            <input
                                id="task-due-date"
                                type="date"
                                name="dueDate"
                                value={formData.dueDate}
                                onChange={handleChange}
                                disabled={loading}
                            />

                        </div>

                    </div>

                    {/* =====================================
                        ACTION BUTTONS
                    ===================================== */}

                    <div className="modal-actions">

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={loading}
                        >

                            {loading ? (
                                <>
                                    <span className="button-spinner"></span>

                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus size={18} />

                                    Create Task
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>
        </Modal>
    );
};

export default CreateTaskModal;


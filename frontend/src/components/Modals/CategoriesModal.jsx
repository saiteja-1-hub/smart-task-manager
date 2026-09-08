import {
    useEffect,
    useState
} from "react";

import {
    Plus,
    Trash2
} from "lucide-react";

import Modal from "./Modal";
import categoryService from "../../services/categoryService";

const CategoriesModal = ({
    isOpen,
    onClose
}) => {

    const [categories, setCategories] =
        useState([]);

    const [name, setName] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const loadCategories = async () => {

        try {

            const data =
                await categoryService
                    .getCategories();

            setCategories(data);

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {

        if (isOpen) {
            loadCategories();
        }

    }, [isOpen]);

    const handleCreate = async (e) => {

        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        setLoading(true);

        try {

            const category =
                await categoryService
                    .createCategory({
                        name: name.trim()
                    });

            setCategories((current) => [
                ...current,
                category
            ]);

            setName("");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to create category."
            );

        } finally {

            setLoading(false);

        }
    };

    const handleDelete = async (id) => {

        try {

            await categoryService
                .deleteCategory(id);

            setCategories((current) =>
                current.filter(
                    (category) =>
                        category.id !== id
                )
            );

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to delete category."
            );

        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Categories"
            subtitle="Organize your tasks with categories."
        >

            <div className="category-content">

                <form
                    className="category-create"
                    onSubmit={handleCreate}
                >

                    <input
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        placeholder="New category..."
                    />

                    <button
                        type="submit"
                        className="button-primary"
                        disabled={loading}
                    >
                        <Plus size={16} />
                        Add
                    </button>

                </form>

                <div className="category-list">

                    {!categories.length && (
                        <div className="category-empty">
                            No categories yet.
                        </div>
                    )}

                    {categories.map(
                        (category) => (

                            <div
                                className="category-item"
                                key={category.id}
                            >

                                <span>
                                    {category.name}
                                </span>

                                <button
                                    onClick={() =>
                                        handleDelete(
                                            category.id
                                        )
                                    }
                                >
                                    <Trash2 size={15} />
                                </button>

                            </div>

                        )
                    )}

                </div>

            </div>

        </Modal>
    );
};

export default CategoriesModal;
import api from "./api";

const categoryService = {
    getCategories: async () => {
        const response = await api.get("/categories");

        const data = response.data;

        if (Array.isArray(data)) {
            return data;
        }

        if (Array.isArray(data.categories)) {
            return data.categories;
        }

        if (Array.isArray(data.data)) {
            return data.data;
        }

        if (Array.isArray(data.data?.categories)) {
            return data.data.categories;
        }

        return [];
    },

    createCategory: async (categoryData) => {
        const response = await api.post("/categories", categoryData);

        return (
            response.data?.category ||
            response.data?.data?.category ||
            response.data?.data ||
            response.data
        );
    },

    updateCategory: async (id, categoryData) => {
        const response = await api.put(
            `/categories/${id}`,
            categoryData
        );

        return (
            response.data?.category ||
            response.data?.data?.category ||
            response.data?.data ||
            response.data
        );
    },

    deleteCategory: async (id) => {
        const response = await api.delete(`/categories/${id}`);

        return response.data;
    },
};

export default categoryService;
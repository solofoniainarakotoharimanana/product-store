import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            return {
                success: false,
                message: "Please fill in all fields."
            }
        }

        const res = await fetch("/api/products", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newProduct)
        })

        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }))//data same name of the controller data name
        
        return {success: true, message: "Product created successfully"}
    },
    fetchProducts: async () => {
        const res = await fetch('/api/products', {
            method: "GET"
        });

        const data = await res.json();
        set({ products: data.data })
        
        return {success: true, message: "Products fetched successfully"}
    },
    getProduct: async (idProduct) => {
        const res = await fetch(`/api/products/${idProduct}`, {
            method: "GET"
        })
        const data = await res.json()
        set({ products: data.data })
        // console.log("DATA >>>", data)
        return {success: true,data: data.data, message: "Product fetched successfully"}
    },
    deleteProduct: async (productId) => {
        const res = await fetch(`/api/products/${productId}`, {
            method: "DELETE"
        })

        const data = await res.json();
        if (!data.success) {
            return {success: false, message: data.message}
        }
        set(state => ({ products: state.products.filter(product => product._id !== productId) }));

        return {success: true, message: data.message}
    },
    updateProduct: async (productId) => {
        const res = await fetch(`/api/products/${productId}`, {
            method: "PUT"
        })

        const data = res.json();
        return {success: true, message: "Product updated successfully"}
    }
}))
const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path = path
        this.products = []
        this.currentId = 1
        this.loadProducts()
    }

    loadProducts() {
        if (fs.existsSync(this.path)) {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                this.currentId = this.products[this.products.length - 1].id + 1
            }
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2))
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos os campos são obrigatórios")
            return
        }

        const codeExists = this.products.some(product => product.code === code)
        if (codeExists) {
            console.error(`O código ${code} já está em uso.`)
            return
        }

        const newProduct = {
            id: this.currentId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct)
        this.saveProducts()
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id)
        if (product) {
            return product
        } else {
            console.error("Produto não encontrado")
            return null
        }
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id)
        if (productIndex === -1) {
            console.error("Produto não encontrado")
            return
        }
        const updatedProduct = { ...this.products[productIndex], ...updatedFields, id }
        this.products[productIndex] = updatedProduct
        this.saveProducts()
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id)
        if (productIndex === -1) {
            console.error("Produto não encontrado")
            return;
        }
        this.products.splice(productIndex, 1)
        this.saveProducts()
    }
}

module.exports = ProductManager

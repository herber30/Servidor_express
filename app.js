const express = require('express')
const ProductManager = require('./ProductManager')

const app = express()
const PORT = 3000
const productManager = new ProductManager('products.json')

// endpoint listar produtos
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : null
        const products = productManager.getProducts()

        if (limit && limit > 0) {
            return res.json(products.slice(0, limit))
        }

        res.json(products)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter os produtos' })
    }
})

// endpoint buscar produto
app.get('/products/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid)
        const product = productManager.getProductById(pid)

        if (product) {
            return res.json(product)
        } else {
            return res.status(404).json({ error: 'Produto não encontrado' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao obter o produto' })
    }
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})

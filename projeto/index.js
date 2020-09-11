console.log('--------------------------------------')
console.log('     Projeto Carrinho de Compras     ')
console.log('--------------------------------------')

const db = require('./database')
const read = require('readline-sync')

const produtos = db.produtos

produtos.sort((a, b) => a.preco - b.preco)
console.table(produtos)

const carrinho = []

class Pedido {
    constructor(carrinho) {
        this.productos = carrinho
        this.data = new Date()
        this.subtotal = 0
    }
    calcularSubtotal() {
        this.subtotal = this.productos.reduce((acumulador, item) => acumulador + (item.preco * item.quantidade), 0)
    }

}

let compra = 'S'

do {

    const idProdutos = parseInt(read.question
        ("Informe o ID do produto desejado: "))

    const quantidade = parseInt(read.question
        ("Informe a quantidade do produto desejado: "))

    const desconto = parseInt(read.question
        ("Voce possui cupom de desconto? (S/N) "))

    function procurar(produto) {
        return produto.id === idProdutos
    }

    const produtoEncontrado = produtos.find(procurar)

    if (!produtoEncontrado) {
        return 'Erro. Produto não encontrado'
    } else {
        const produtoPedido = {
            ...produtoEncontrado,
            quantidade: quantidade
        }
        carrinho.push(produtoPedido)
    }

    compra = read.question('Deseja comprar mais algum item? (S/N)')

} while (compra.toUpperCase() === 'S')

const pedido = new Pedido(carrinho)
console.table(pedido.productos)

pedido.calcularSubtotal()

console.log(`O valor subtotal do seu pedido é R$${pedido.subtotal.toFixed(2)}`)

const cupom = parseInt(read.question("Digite o valor do cupom de desconto: "))

const valorDesconto = (cupom > 0 && cupom <= 15) ? pedido.subtotal * (cupom / 100) : 0

console.log('O valor do desconto é R$', valorDesconto.toFixed(2))

const valorTotal = pedido.subtotal - valorDesconto

console.log('O valor total da sua compra é R$', valorTotal.toFixed(2))

const dia = pedido.data.getDate()
const mes = pedido.data.getMonth() + 1
const ano = pedido.data.getFullYear()

console.log('A compra foi realizada em ', dia, '/', mes, '/', ano)
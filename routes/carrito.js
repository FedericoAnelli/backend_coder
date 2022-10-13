var express = require('express');
var router = express.Router();

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const hour = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();


const carrito = [
    {
        id: 1,
        timestamp: `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`,
        productos: [
            {
                id: 1,
                title: 'Escuadra',
                timestamp: `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`,
                description: 'Escuadra de 30 cm',
                code: '123456',
                price: 123.45,
                stock: 10,
                thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
            },
            {
                id: 2,
                title: 'Calculadora',
                timestamp: `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`,
                description: 'Calculadora científica',
                code: '234567',
                price: 234.56,
                stock: 12,
                thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
            },
        ]
    },
];

let id = 1;
let selectedProducts = [];

router.post('/' , (req, res) => {
    const producto = req.body;
    producto.id = id++;
    carrito.push(producto);
    res.render("productos", {carrito});
});

router.delete('/:id', (req, res) => {
    const producto = carrito.find(p => p.id == req.params.id);
    const index = carrito.indexOf(producto);
    carrito.splice(index, 1);
    res.render("productos", {carrito});
});

router.get('/:id/carrito' , (req, res) => {
    const carritoSeleccionado = carrito.find(p => p.id == req.params.id);
    console.log(carritoSeleccionado.productos);
    selectedProducts = carritoSeleccionado.productos;
    res.render("productos", {selectedProducts});
});

router.post('/:id/carrito' , (req, res) => {
    const producto = carrito.find(p => p.id == req.params.id);
    producto.title = req.body.title;
    producto.price = req.body.price;
    producto.thumbnail = req.body.thumbnail;
    res.render("productos", {carrito});
});

router.delete('/:id/carrito/:id_producto' , (req, res) => {
    const producto = carrito.find(p => p.id == req.params.id);
    const index = carrito.indexOf(producto);
    carrito.splice(index, 1);
    res.render("productos", {carrito});
});


module.exports = router;
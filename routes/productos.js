var express = require('express');
var router = express.Router();

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const hour = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();

const productos = [

    {
        id: 1,
        timestamp: `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`,
        title: 'Escuadra',
        description: 'Escuadra de 30 cm',
        code: '123456',
        price: 123.45,
        stock: 10,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    },
    {
        id: 2,
        timestamp: `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`,
        title: 'Calculadora',
        description: 'Calculadora científica',
        code: '234567',
        price: 234.56,
        stock: 12,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
    },
    {
        id: 3,
        timestamp: `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`,
        title: 'Globo Terráqueo',
        description: 'Globo terráqueo de 30 cm',
        code: '345678',
        price: 345.67,
        stock: 10,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
    }
];

let id = 4;
let selectedProducts = [];

router.get('/', (__, res) => {
    selectedProducts = productos;
    res.render("productos", {selectedProducts});
});

router.get('/:id', (req, res) => {
    const producto = productos.find(p => p.id == req.params.id);
    selectedProducts = [producto];
    console.log(selectedProducts);
    res.render("productos", {selectedProducts});
    }
);

router.post('/', (req, res) => {
    const producto = req.body;
    producto.id = id++;
    productos.push(producto);
    res.redirect('/productos');
});

router.put('/:id', (req, res) => {
    const producto = productos.find(p => p.id == req.params.id);
    producto.title = req.body.title;
    producto.price = req.body.price;
    producto.thumbnail = req.body.thumbnail;
    res.redirect('/productos');
});

router.delete('/:id', (req, res) => {
    const producto = productos.find(p => p.id == req.params.id);
    const index = productos.indexOf(producto);
    productos.splice(index, 1);
    res.redirect('/productos');
});

module.exports = router;
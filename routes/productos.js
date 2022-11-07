
var express = require('express');
const createHttpError = require('http-errors');
var router = express.Router();
const isAdmin = true;

let ProductosDAOMongoDB = require('../DAOs/productos/ProductosDAOMongoDB');
ProductosDAOMongoDB = new ProductosDAOMongoDB();

const DB = require('../DB/db');
const db = new DB();

if (!db.tableExists('productos')) {
    db.createTable('productos');
}

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
    {
        id: 3,
        title: 'Globo Terráqueo',
        timestamp: `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`,
        description: 'Globo terráqueo',
        code: '345678',
        price: 345.67,
        stock: 23,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
    }
];


let id = 4;
let selectedProducts = [];

router.get('/', (__, res) => {
    try{
        selectedProducts = db.getAll('productos');
        res.render("productos", {selectedProducts});
    }
    catch(err){
        res.status(500).send(err);
    }
});

router.get('/:id', (req, res) => {
    const producto = productos.find(p => p.id == req.params.id);
    selectedProducts = [producto];
    res.render("productos", {selectedProducts});
    }
);

router.post('/', (req, res) => {
    if (isAdmin) {
        const producto = req.body;
        producto.id = id++;
        try{
        db.update('productos', producto.id, producto);
        ProductosDAOMongoDB.save(producto);
        selectedProducts = ProductosDAOMongoDB.getAll();
        res.render("productos", {selectedProducts});
        } catch (err) {
            console.log(err);
        }
    }
    else {
        res.status(401).send("No autorizado");
    }
});

router.put('/:id', (req, res) => {
    if (isAdmin) {
    const producto = productos.find(p => p.id == req.params.id);
    producto.title = req.body.title;
    producto.price = req.body.price;
    producto.thumbnail = req.body.thumbnail;
    res.redirect('/productos');
    }
    else {
        res.status(401).send("No autorizado");
    }
});

router.delete('/:id', (req, res) => {
    if (isAdmin) {
    const producto = productos.find(p => p.id == req.params.id);
    const index = productos.indexOf(producto);
    productos.splice(index, 1);
    res.redirect('/productos');
    }
    else {
        res.status(401).send("No autorizado");
    }
});

module.exports = router;
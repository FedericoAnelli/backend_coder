var express = require('express');
var router = express.Router();

const productos = [

    {
        id: 1,
        title: 'Escuadra',
        price: 123.45,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    },
    {
        id: 2,
        title: 'Calculadora',
        price: 234.56,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
    },
    {
        id: 3,
        title: 'Globo Terráqueo',
        price: 345.67,
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
    }
];

let id = 4;

router.get('/', (__, res) => {
    res.render("productos", {productos});
});

router.get('/:id', (req, res) => {
    const producto = productos.find(p => p.id == req.params.id);
    res.render("productos", {producto});
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
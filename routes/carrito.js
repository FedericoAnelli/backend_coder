var express = require('express');
var router = express.Router();

const productos = [];

let id = 1;

router.post('/' , (req, res) => {
    const producto = req.body;
    producto.id = id++;
    productos.push(producto);
    res.render("productos", {productos});
});

router.delete('/:id', (req, res) => {
    const producto = productos.find(p => p.id == req.params.id);
    const index = productos.indexOf(producto);
    productos.splice(index, 1);
    res.render("productos", {productos});
});

router.get('/:id/productos' , (req, res) => {
    const producto = productos.find(p => p.id == req.params.id);
    res.render("productos", {producto});
});

router.post('/:id/productos' , (req, res) => {
    const producto = productos.find(p => p.id == req.params.id);
    producto.title = req.body.title;
    producto.price = req.body.price;
    producto.thumbnail = req.body.thumbnail;
    res.render("productos", {productos});
});

router.delete('/:id/productos/:id_producto' , (req, res) => {
    const producto = productos.find(p => p.id == req.params.id);
    const index = productos.indexOf(producto);
    productos.splice(index, 1);
    res.render("productos", {productos});
});


module.exports = router;
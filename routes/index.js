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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {productos});
});

router.post('/', (req, res) => {
  const producto = req.body;
  producto.id = id++;
  productos.push(producto);
  res.redirect('/');
});

module.exports = router;

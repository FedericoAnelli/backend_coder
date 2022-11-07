var express = require('express');
var router = express.Router();
const isAdmin = true;
const DB = require('../DB/db');
const db = new DB();

let ProductosDAOMongoDB = require('../DAOs/productos/ProductosDAOMongoDB');
ProductosDAOMongoDB = new ProductosDAOMongoDB();
let CarritosDAOMongoDB = require('../DAOs/carritos/CarritosDAOMongoDB');
CarritosDAOMongoDB = new CarritosDAOMongoDB();

if (!db.tableExists('productos')) {
    db.createTable('productos');
}

let productos = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log()
  try{
    productos = db.getAll('productos');
    res.render("index", {productos});
}
catch(err){
    res.status(500).send(err);
}
});

router.post('/', (req, res) => {
if (isAdmin) {
        const producto = req.body;
        try{
        db.insert('productos', producto);
        productos = db.getAll('productos');
        res.redirect('/');
        } catch (err) {
            console.log(err);
        }
    }
    else {
        res.status(401).send("No autorizado");
    }
});

module.exports = router;

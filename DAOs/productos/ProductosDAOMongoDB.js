const ContenedorArchivos = require('../../containers/FileContainer');
const { Schema } = require('mongoose');

class ProductosDAOMongoDB extends ContenedorArchivos {
    constructor() {
        super('productos', new Schema({
            title: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
            }));
    }
}

module.exports = ProductosDAOMongoDB;
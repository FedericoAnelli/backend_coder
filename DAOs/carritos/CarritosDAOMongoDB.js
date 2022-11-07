const { Schema } = require('mongoose');
const ContenedorArchivos = require('../../containers/FileContainer');

class CarritosDAOMongoDB extends ContenedorArchivos {
    constructor() {
        super('Carrito', new Schema({
            timestamp: { type: String, required: true },
            productos: { type: Array, required: true },
        }));
    }
}

module.exports = CarritosDAOMongoDB;
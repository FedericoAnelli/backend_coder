const { Schema } = require('mongoose');
const ContenedorArchivos = require('../../containers/FileContainer');

class CarritosDAOMongoDB extends ContenedorArchivos {
    constructor() {
        super('Carrito', new Schema({
            timestamp: { type: String, required: true },
            productos: { type: Array, required: true },
        }));
    }

    async save(carrito = {productos: []}) {
        return super.save(carrito);
    }
    
}

module.exports = CarritosDAOMongoDB;
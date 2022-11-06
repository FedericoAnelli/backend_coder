const ContenedorArchivo = require('../../containers/FileContainer');

class CarritosDAOFile extends ContenedorArchivo {
    constructor() {
        super('carritos.json');
    }

    async save(carrito = {productos: []}) {
        return super.save(carrito);
    }
}

module.exports = CarritosDAOFile;
const ContenedorArchivo = require('../../containers/FileContainer');

class ProductosDAOFile extends ContenedorArchivo {
    constructor() {
        super('productos.json');
    }
}

module.exports = ProductosDAOFile;
const ContenedorMemoria = require('../../containers/MemoryContainer');

class CarritosDAOMem extends ContenedorMemoria {
    async save(carrito = {productos: []}) {
        return super.save(carrito);
    }
}

module.exports = CarritosDAOMem;
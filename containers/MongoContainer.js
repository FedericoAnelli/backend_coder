const mongoose = require('mongoose');
const config = require('../config');

await mongoose.connect(config.mongoDB.URI);
class MongoContainer {
    constructor(modelName, schema) {
        this.collection = mongoose.model(modelName, schema);
    }

    async list(id) {
        const buscado = await this.collection.findById(id);
        return buscado;
    }

    async listAll() {
        const objs = await this.collection.find();
        return objs;
    }

    async save(obj) {
        const result = await this.collection.create(obj);
        return result;
    }

    async update(obj) {
        const buscado = await this.collection.findById(obj.id);
        if (!buscado) {
            throw new Error('Objeto no encontrado');
        } else {
            await buscado.updateOne(obj);
        }
    }

    async delete(id) {
        const buscado = await this.collection.findById(id);
        if (!buscado) {
            throw new Error('Objeto no encontrado');
        } else {
            await buscado.deleteOne();
        }
    }
}
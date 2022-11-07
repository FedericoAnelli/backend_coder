const fs = require('fs');
const config = require('../config');

class FileContainer {

    constructor (path) {
        this.path = `/Users/fanelli/Desktop/Desarrollo/backend/express-hbs/`;
    }

    async list (id) {
        const objs = await this.listAll();
        const buscado = objs.find(obj => obj.id == id);
        return buscado;
    }

    async listAll () {
        try {
            const data = await fs.promises.readFile(this.path);
            return JSON.parse(data);
        }
        catch (err) {
            return [];
        }
    }

    async save (obj) {
        const objs = await this.listAll();
        let newID;
        if (objs.length == 0) {
            newID = 1;
        }
        else {
            newID = objs[objs.length - 1].id + 1;
        }
        const newObj = [...objs, {...obj, id: newID}];
        objs.push(newObj);

        try{
            await fs.writeFile(this.path, JSON.stringify(newObj, null, 2));
            return newObj;
        }
        catch (err) {
            throw new Error(err);
        }
    }

    async update (obj) {
        const objs = await this.listAll();
        const index = objs.findIndex(obj => obj.id == id);
        if (index == -1) {
            throw new Error('Objeto no encontrado');
        } else {
            objs[index] = obj;
            try {
                await fs.writeFile(this.path, JSON.stringify(objs, null, 2));
            } catch (err) {
                throw new Error(err);
            }
            }
        }

    async delete (id) {
        const objs = await this.listAll();
        const index = objs.findIndex(obj => obj.id == id);
        if (index == -1) {
            throw new Error('Objeto no encontrado');
        } else {
            objs.splice(index, 1);
            try {
                await fs.writeFile(this.path, JSON.stringify(objs, null, 2));
            } catch (err) {
                throw new Error(err);
            }
        }
    }

}

module.exports = FileContainer;
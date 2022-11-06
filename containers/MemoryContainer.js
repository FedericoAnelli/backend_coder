class MemoryContainer{

    constructor() {
        this.elements = [];
    }

    list(id) {
        const elem = this.elements.find(elem => elem.id == id);
        if (!elem)
        {
            throw new Error('Elemento no encontrado');
        } else {
            return elem;
        }
    }

    listAll() {
        return [...this.elements];
    }

    save(obj) {
        let newID;
        if (this.elements.length == 0) {
            newID = 1;
        }
        else {
            newID = this.elements[this.elements.length - 1].id + 1;
        }
        const newObj = {...obj, id: newID};
        this.elements.push(newObj);
        return newObj;
    }

    update(obj) {
        const index = this.elements.findIndex(elem => elem.id == obj.id);
        if (index == -1) {
            throw new Error('Elemento no encontrado');
        } else {
            this.elements[index] = obj;
        }
    }

    delete(id) {
        const index = this.elements.findIndex(elem => elem.id == id);
        if (index == -1) {
            throw new Error('Elemento no encontrado');
        } else {
            this.elements.splice(index, 1);
        }
    }
}

module.exports = MemoryContainer;
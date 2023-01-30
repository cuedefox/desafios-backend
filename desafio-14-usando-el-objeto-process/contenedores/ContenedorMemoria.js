class ContenedorMemoria {

    constructor() {
        this.elementos = []
    }

    listar(id) {
        const elem = this.elementos.find(elem => elem.id == id);
        if (!elem) {
            return undefined;
        } else {
            return elem;
        }
    }

    listarAll() {
        return [...this.elementos];
    }

    guardar(elem) {
        let newId;
        if (this.elementos.length == 0) {
            newId = 1;
        } else {
            newId = this.elementos[this.elementos.length - 1].id + 1;
        }

        const newElem = { id: newId, ...elem };
        this.elementos.push(newElem);
        return newElem;
    }

    agregarProducto(elem, id) {
        const elems = this.listarAll();
        const index = elems.findIndex(o => o.id == id);
        
        if (index == -1) {
            return undefined;
        } else {
            this.elementos[index].productos.push(elem);
            return this.elementos[index].productos;
        }
    }

    actualizar(id, elem) {
        const index = this.elementos.findIndex(p => p.id == id);
        
        if (index == -1) {
            return undefined;
        } else {
            this.elementos[index] = elem;
            return elem;
        }
    }

    borrar(id) {
        const index = this.elementos.findIndex(elem => elem.id == id);

        if (index == -1) {
            return undefined;
        } else {
            return this.elementos.splice(index, 1);
        }
    }

    borrarProducto(id, id_prod) {
        const index = this.elementos.findIndex(p => p.id == id);
        
        if (index == -1) {
            return 0; // No se encontro el carrito
        }

        const indexProd = this.elementos[index].productos.findIndex(o => o.id == id_prod);

        if (indexProd == -1) {
            return 0; // No se encontro el producto
        }

        this.elementos[index].productos.splice(indexProd, 1);
        return 1;
    }

    borrarAll() {
        this.elementos = []
    }
}

export default ContenedorMemoria
import fs from 'fs';

export default class CartManager {
    constructor(path) {
        this.path = path;
    }

    writeFile = async data => {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
        } catch (error) {
            console.log(error);
        }
    }

    addCart = async () => {
        try {
            let carts = await this.getCarts();
            const newCart = {
                id: carts.length > 0 ? carts[carts.length - 1].id + 1 : 1,
                products: []
            }
            carts.push(newCart);
            await this.writeFile(carts);
            return {code: 200, status: `Carrito agregado con id: ${newCart.id}`};
        } catch (error) {
            console.log(error);
        }
    }

    getCarts = async() => {
        try {
            const carts = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(carts);
        } catch (error) {
            if(error.message.includes('no such file or directory')) return [];
            console.log(error);
        }
    }

    getProductsOfCartById = async id => {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(cart => cart.id === id);
            return cart ? cart.products : false;
        } catch (error) {
            console.log(error);
        }
    }

    addProductToCart = async (cid, pid) => {
        try {
          const carts = await this.getCarts();
          let cart = carts.find((cart) => cart.id === cid);
          if (!cart) {
            return {code: 404, status: 'carrito no encontrado'};
          }
          let productExist = cart.products.find((product) => product.product === pid);
          if (productExist) {
            productExist.quantity += 1;
          } else {
            cart.products.push({ product: pid, quantity: 1 });
          }
          await this.writeFile(carts);
          return {code: 200, status: 'producto agregado al carrito'};
        } catch (error) {
          console.log(error);
        }
      };
      
}
const Contenedor = require('./contenedor');

const products = new Contenedor('products.txt');

const test = async () => {
	let save = await products.save({
        title: 'coderhouse',
        price: 12354,
        thumbnail: 'https:asdl31231'
    });
    console.log(save)
};

test();
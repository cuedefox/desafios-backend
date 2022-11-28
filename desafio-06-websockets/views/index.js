const socket = io();

const $formAddProduct = document.querySelector('#form-add-product');
const $listProducts = document.querySelector('#list-products');
const $nameInput = document.querySelector('#name-product');
const $priceInput = document.querySelector('#price-product');
const $imgInput = document.querySelector('#img-product');
const $tableProducts = document.querySelector('#table-products');

$formAddProduct.addEventListener('submit', e => {
	e.preventDefault();
	if ($nameInput.value == '') return alert('El producto debe tener un nombre');
	if ($priceInput.value == '') return alert('El producto debe tener un Precio');
	if ($imgInput.value == '') return alert('El producto debe tener una imagen');
	const newProduct = {
		name: $nameInput.value,
		price: $priceInput.value,
		img: $imgInput.value
	};
	socket.emit('newProduct', newProduct);
	e.target.reset();
	location.href = '/';
});

const renderProducts = products => {
	if (products.length > 0) $tableProducts.innerHTML = '';
	products.forEach(product => {
		$tableProducts.innerHTML += `
		<tr class="text-center">
			<td class="align-middle">${product.name}</td>
			<td class="align-middle">${product.price}</td>
			<td class="align-middle">
				<img src="${product.img}" alt="${product.name}" width="100px">
			</td>
		</tr>`;
	});
};

const $chatForm = document.querySelector('#chat-form');
const $userEmail = document.querySelector('#user-email');
const $chatMessage = document.querySelector('#chat-message');
const $tableChat = document.querySelector('#table-chat');

$chatForm.addEventListener('submit', e => {
	e.preventDefault();
	if ($userEmail.value == '') return alert('Debes ingresar tu E-Mail para enviar un mensaje');
	if ($chatMessage.value == '') return alert('No estas enviando ningun mensaje');
	const newMessage = {
		userEmail: $userEmail.value,
		message: $chatMessage.value,
		date: new Date().toLocaleString()
	};
	socket.emit('newMessage', newMessage);
	e.target.reset();
});

const renderChat = messages => {
	if (messages.length > 0) $tableChat.innerHTML = '';
	messages.forEach(message => {
		$tableChat.innerHTML += `
		<div>
			<b class="text-primary">${message.userEmail}</b>
			[<span style="color: brown;">${message.date}</span>]
			: <i class="text-success">${message.message}</i>
		</div > `;
	});
	$chatMessage.focus();
};

socket.on('products', products => {
	renderProducts(products);
});

socket.on('messages', messages => {
	renderChat(messages);
});

import data from './data/productos';

const botonesAbrirCarrito = document.querySelectorAll('[data-accion="abrir-carrito"]');
const botonesCerrarCarrito = document.querySelectorAll('[data-accion="cerrar-carrito"]');
const btnAgregarAlCarrito = document.getElementById('agregar-al-carrito');
const btnComprar = document.getElementById('carrito__btn-comprar');
const ventanaCarrito = document.getElementById('carrito');
const producto = document.getElementById('producto');
const notificacion = document.getElementById('notificacion');
let carrito = [];
const formatearMoneda = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });

const renderCarrito = () => {
	ventanaCarrito.classList.add('carrito--active');

	// Eliminamos todos los productos anteriores para construir el carrito desde cero.
	const productosAnteriores = ventanaCarrito.querySelectorAll('.carrito__body .carrito__producto');
	if (productosAnteriores) {
		productosAnteriores.forEach((producto) => producto.remove());
	}

	let total = 0;

	// Comprobamos si hay productos
	if (carrito.length < 1) {
		// Ponemos la clase de carrito vacio
		ventanaCarrito.classList.add('carrito--vacio');
	} else {
		// Eliminamos la clase de carrito vacio
		ventanaCarrito.classList.remove('carrito--vacio');

		// Iteramos sobre cada producto del carrito y lo mostramos
		carrito.forEach((productoCarrito) => {
			// Iteramos sobre la lista de productos.
			data.productos.forEach((productoBaseDatos) => {
				// Obtenemos el precio del archivo de producto.js
				// Cuando el id del item del carrito sea el mismo que alguno de la lista.
				if (productoCarrito.id === productoBaseDatos.id) {
					// Tomamos el precio y creamos una nueva propiedad en el objeto del item.
					productoCarrito.precio = productoBaseDatos.precio;

					total += productoCarrito.precio * productoCarrito.cantidad;
				}
			});

			// Establecemos la ruta de la imagen que vamos a querer mostrar.
			let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].src;
			if (productoCarrito.color === 'rojo') {
				thumbSrc = './img/thumbs/rojo.jpg';
			} else if (productoCarrito.color === 'amarillo') {
				thumbSrc = './img/thumbs/amarillo.jpg';
			}
			// Creamos una plantilla del codigo HTML.
			const plantillaProducto = `
					<div class="carrito__producto-info">
						<img src="${thumbSrc}" alt="" class="carrito__thumb" />
						<div>
							<p class="carrito__producto-nombre">
								<span class="carrito__producto-cantidad">${productoCarrito.cantidad} x </span>${productoCarrito.nombre}
							</p>

							<p class="carrito__producto-propiedades">Tamaño:<span>${productoCarrito.tamaño}</span> Color:<span>${
				productoCarrito.color
			}</span></p>
						</div>
					</div>
					<div class="carrito__producto-contenedor-precio">
						<button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 16 16"
							>
								<path
									d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
								/>
							</svg>
						</button>
						<p class="carrito__producto-precio">${formatearMoneda.format(productoCarrito.precio * productoCarrito.cantidad)}</p>
					</div>
				`;

			// Creamos un div
			const itemCarrito = document.createElement('div');

			// Le agregamos la clase de carrito__producto.
			itemCarrito.classList.add('carrito__producto');

			// Le insertamos la plantilla dentro del elemento.
			itemCarrito.innerHTML = plantillaProducto;

			// Agregamos el producto a la ventana del carrito.
			ventanaCarrito.querySelector('.carrito__body').appendChild(itemCarrito);
		});
	}

	ventanaCarrito.querySelector('.carrito__total').innerText = formatearMoneda.format(total);
};

// Abrir carrito
botonesAbrirCarrito.forEach((boton) => {
	boton.addEventListener('click', (e) => {
		renderCarrito();
	});
});

// Cerrar carrito
botonesCerrarCarrito.forEach((boton) => {
	boton.addEventListener('click', (e) => {
		ventanaCarrito.classList.remove('carrito--active');
	});
});

// Agregar al carrito
btnAgregarAlCarrito.addEventListener('click', (e) => {
	// Obtenemos los datos del producto, en este caso los obtengo desde la pagina del producto.
	// pero tambien se puede hacer una peticion al servidor para validar los datos.
	const id = producto.dataset.productoId;
	const nombre = producto.querySelector('.producto__nombre').innerText;
	const cantidad = parseInt(producto.querySelector('#cantidad').value);
	const color = producto.querySelector('#propiedad-color input:checked').value;
	const tamaño = producto.querySelector('#propiedad-tamaño input:checked').value;

	// Comprobamos que haya mas de un elemento en el carrito.
	if (carrito.length > 0) {
		// Variable que usamos para saber si el producto ya esta en el carrito o no.
		let productoEnCarrito = false;

		// Por cada elemento del carrito comprobamos que no tenga el mismo id, nombre y tamaño.
		// En caso de que el condicional se cumpla es que el producto ya esta en el carrito, asi que solo aumentamos la cantidad.
		carrito.forEach((item) => {
			if (item.id === id && item.nombre === nombre && item.color === color && item.tamaño === tamaño) {
				// El producto ya esta en el carrito, aumentamos la cantidad.
				item.cantidad += cantidad;
				productoEnCarrito = true;
			}
		});

		if (!productoEnCarrito) {
			carrito.push({
				id: id,
				nombre: nombre,
				cantidad: cantidad,
				color: color,
				tamaño: tamaño,
			});
		}
	} else {
		// Si no hay ningun elemento entonces lo agregamos directamente.
		carrito.push({
			id: id,
			nombre: nombre,
			cantidad: cantidad,
			color: color,
			tamaño: tamaño,
		});
	}

	// Establecemos la ruta de la imagen que vamos a querer mostrar.
	let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].src;
	if (color === 'rojo') {
		thumbSrc = './img/thumbs/rojo.jpg';
	} else if (color === 'amarillo') {
		thumbSrc = './img/thumbs/amarillo.jpg';
	}

	notificacion.querySelector('img').src = thumbSrc;

	// Mostramos la notificacion.
	notificacion.classList.add('notificacion--active');
	// Despues de 5 segundos la ocultamos.
	setTimeout(() => notificacion.classList.remove('notificacion--active'), 5000);
});

// Botones eliminar del carrito
ventanaCarrito.addEventListener('click', (e) => {
	// Obtenemos el boton mas cercano. Esto es por si e.target es el svg o path.
	// Accedemos a su dataset y si es igual a eliminar-item-carrito ejecutamos el codigo.
	if (e.target.closest('button')?.dataset.accion === 'eliminar-item-carrito') {
		const producto = e.target.closest('.carrito__producto');
		const indexProducto = [...ventanaCarrito.querySelectorAll('.carrito__producto')].indexOf(producto);

		carrito = carrito.filter((item, index) => {
			if (index !== indexProducto) {
				return item;
			}
		});

		renderCarrito();
	}
});

// Boton enviar carrito
btnComprar.addEventListener('click', () => {
	console.log('Enviado peticion de compra!');
	console.log(carrito);
});

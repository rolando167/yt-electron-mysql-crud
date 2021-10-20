const { ipcRenderer } = require('electron');


const productForm = document.getElementById('productForm');

const productName = document.getElementById('name');
const productPrice  = document.getElementById('price');
const productDescription = document.getElementById('description');
const productsList = document.querySelector("#products");

let products = [];
let editingStatus = false;
let editProductId;

window.onload = function() {
    getProducts()
};


async function getProducts()
{
    products = await ipcRenderer.invoke('get');
    console.log(products);
    renderProducts(products);
}

function renderProducts(tasks) {
	productsList.innerHTML = "";
	tasks.forEach((t) => {
		productsList.innerHTML += `
			<div class="card card-body my-2 animated fadeInLeft">
				<h4>${t.name}</h4>
				<p>${t.description}</p>
				<h3>${t.price}$</h3>
				<p>
				<button class="btn btn-danger btn-sm" onclick="deleteProduct('${t.id}')">
					DELETE
				</button>
				<button class="btn btn-secondary btn-sm" onclick="editProduct('${t.id}')">
					EDIT
				</button>
				</p>
			</div>
		`;
	});
}

productForm.addEventListener("submit", async (e) => {
	try {
		e.preventDefault();

		const product = {
			name: productName.value,
			price: productPrice.value,
			description: productDescription.value,
		};

		if (!editingStatus) {
			const savedProduct = await ipcRenderer.invoke('add', product);
			console.log(savedProduct);
		} else {
			const productUpdated = await ipcRenderer.invoke('update', editProductId, product);
			console.log(productUpdated);

			// Reset
			editingStatus = false;
			editProductId = "";
		}

		productForm.reset();
		productName.focus();
		getProducts();
	} catch (error) {
		console.log(error);
	}
});

const editProduct = async (id) => {
	const product =  await ipcRenderer.invoke("get_one" , id);
	productName.value = product.name;
	productPrice.value = product.price;
	productDescription.value = product.description;

	editingStatus = true;
	editProductId = id;
};

const deleteProduct = async (id) => {
	const response = confirm("Are you sure you want to delete it?");
	if (response) {
		await ipcRenderer.invoke('remove_product', id)
		await getProducts();
	}
	return;
};

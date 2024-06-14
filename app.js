document.addEventListener('DOMContentLoaded', () => {
    fetch('proxyserver-c0s6fcl68-melts-projects.vercel.app/api/products') // Replace with your proxy server URL
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data);
            const productsContainer = document.getElementById('products');
            data.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.innerHTML = `
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <p><strong>Price:</strong> $${product.price}</p>
                    <button onclick="addToCart('${product.id}', '${product.title}', ${product.price})">Add to Cart</button>
                `;
                productsContainer.appendChild(productElement);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});

let cart = [];

function addToCart(id, title, price) {
    const productIndex = cart.findIndex(product => product.id === id);
    if (productIndex === -1) {
        cart.push({ id, title, price, quantity: 1 });
    } else {
        cart[productIndex].quantity += 1;
    }
    renderCart();
}

function renderCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';
    let totalCost = 0;
    cart.forEach(item => {
        totalCost += item.price * item.quantity;
        const cartItem = document.createElement('li');
       

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://meltstore-kjq6nv3uv-melts-projects.vercel.app/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched data:', data); // Debugging line
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
            console.error('Error fetching products:', error); // Debugging line
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
        cartItem.innerHTML = `
            ${item.title} - $${item.price} x ${item.quantity}
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });
    document.getElementById('total-cost').textContent = totalCost.toFixed(2);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

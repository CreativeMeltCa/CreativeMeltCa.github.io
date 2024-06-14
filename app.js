document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products');
    const cartContainer = document.getElementById('cart');
    const totalCostElement = document.getElementById('total-cost');
    let cart = [];
  
    // Fetch product data from Printify API
    fetch('https://meltstore-kjq6nv3uv-melts-projects.vercel.app/api/products')
      .then(response => response.json())
      .then(data => {
        displayProducts(data);
      })
      .catch(error => console.error('Error fetching products:', error));
  
    function displayProducts(products) {
      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
          <h3>${product.title}</h3>
          <img src="${product.images[0].src}" alt="${product.title}">
          <p>${product.description}</p>
          <p>Price: ${(product.variants[0].price / 100).toFixed(2)} USD</p>
          <button onclick="addToCart(${product.variants[0].id}, ${product.variants[0].price})">Add to Cart</button>
        `;
        productsContainer.appendChild(productDiv);
      });
    }
  
    window.addToCart = function(id, price) {
      const item = cart.find(item => item.id === id);
      if (item) {
        item.quantity++;
      } else {
        cart.push({ id, price, quantity: 1 });
      }
      updateCart();
    };
  
    function updateCart() {
      cartContainer.innerHTML = '';
      let totalCost = 0;
      cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `Item ${item.id} - Quantity: ${item.quantity}`;
        cartContainer.appendChild(cartItem);
        totalCost += item.price * item.quantity;
      });
      totalCostElement.textContent = (totalCost / 100).toFixed(2);
    }
  });
  
  // PayPal integration
  paypal.Buttons({
    createOrder: function(data, actions) {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: document.getElementById('total-cost').textContent
          }
        }]
      });
    },
    onApprove: function(data, actions) {
      return actions.order.capture().then(function(details) {
        alert('Transaction completed by ' + details.payer.name.given_name);
      });
    }
  }).render('#paypal-button-container');
  

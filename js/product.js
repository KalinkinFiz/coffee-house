function toggleProducts() {
    const productsContainer = document.querySelector('.menu-list');
    const productsToToggle = Array.from(productsContainer.querySelectorAll('.menu-list-item:nth-of-type(5), .menu-list-item:nth-of-type(6), .menu-list-item:nth-of-type(7), .menu-list-item:nth-of-type(8)'));
    const refreshBtn = document.querySelector('.refresh-btn');

    productsToToggle.forEach(product => {
        product.classList.toggle('hidden-product');
    });

    const hiddenProductsCount = productsToToggle.filter(product => product.classList.contains('hidden-product')).length;

    refreshBtn.style.display = hiddenProductsCount === productsToToggle.length ? 'none' : 'block';
}

function handleResize() {
    const screenWidth = window.innerWidth;
    const productsContainer = document.querySelector('.menu-list');
    const productsToToggle = Array.from(productsContainer.querySelectorAll('.menu-list-item:nth-of-type(5), .menu-list-item:nth-of-type(6), .menu-list-item:nth-of-type(7), .menu-list-item:nth-of-type(8)'));
    const refreshBtn = document.querySelector('.refresh-btn');

    if (screenWidth <= 768) {
        productsToToggle.forEach(product => {
            product.classList.add('hidden-product');
        });
        refreshBtn.style.display = 'block';
    } else {
        productsToToggle.forEach(product => {
            product.classList.remove('hidden-product');
        });
        refreshBtn.style.display = 'none';
    }
}

window.addEventListener('resize', () => {
    handleResize();
    toggleProducts();
});

function showProducts(category) {
    const buttons = document.querySelectorAll('.menu-button-tab');
    buttons.forEach(btn => btn.classList.remove('active'));

    const activeButton = document.getElementById(`${category}Btn`);
    activeButton.classList.add('active');

    const productList = filterProducts(category);
    displayProducts(productList);

    const refreshBtn = document.querySelector('.refresh-btn');
    refreshBtn.style.display = category === 'tea' ? 'none' : 'block';

    attachClickHandlers(productList);

    handleResize()
    toggleProducts();
}

function filterProducts(category) {
    return products.filter(product => product.category === category);
}

function displayProducts(productList) {
    const listContainer = document.getElementById("product-list");
    listContainer.innerHTML = '';

    productList.forEach(product => {
        const listItem = document.createElement("li");
        listItem.classList.add("menu-list-item");

        listItem.innerHTML = `
        <div class="menu-list-image">
            <img src="../assets/menu/${product.category}/${product.category}-${productList.indexOf(product) + 1}.png" alt="${product.name}" />
        </div>
        <div class="menu-list-item-body">
            <div class="menu-list-item-name">${product.name}</div>
            <div class="menu-list-item-description">${product.description}</div>
            <div class="menu-list-item-price">$${product.price}</div>
        </div>
        `;

        listContainer.appendChild(listItem);
    });
}

handleResize();
toggleProducts();
showProducts('coffee');


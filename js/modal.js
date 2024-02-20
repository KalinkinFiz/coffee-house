const modal = document.querySelector('.modal');
const sizeRadioButtons = document.querySelectorAll('.input-radio');
const additivesCheckboxes = document.querySelectorAll('.additives-item input');
const totalSpan = document.querySelector('.content-total-price');
const closeBtn = document.querySelector('.button-close');
const sizeLabels = document.querySelectorAll('.content-size label');
const additivesLabels = document.querySelectorAll('.content-additives label');

let selectedProduct = null;

function attachClickHandlers(productList) {
    const productCards = document.querySelectorAll('.menu-list-item');
    productCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            showModal(productList[index], productList);
        });
    });
}

attachClickHandlers(products);

function removeClickHandlers(elements, callback) {
    elements.forEach(element => {
        element.removeEventListener('click', callback);
    });
}

window.addEventListener('resize', () => {
    const activeCategory = document.querySelector('.menu-button-tab.active').id.replace('Btn', '');
    const activeProductList = filterProducts(activeCategory);
    attachClickHandlers(activeProductList);
});

function showModal(product, productList) {
    selectedProduct = product;

    const modalImage = document.querySelector('.modal-inner img');
    const modalTitle = document.querySelector('.content-title h3');
    const modalDescription = document.querySelector('.content-title span');
    const sizeLabels = document.querySelectorAll('.content-size label');
    const additivesLabels = document.querySelectorAll('.content-additives label');

    const sizeRadioButtons = document.querySelectorAll('.modal .input-radio');

    const imagePath = `../assets/menu/${selectedProduct.category.toLowerCase()}/${selectedProduct.category.toLowerCase()}-${productList.indexOf(selectedProduct) + 1}.png`;
    modalImage.src = imagePath;

    modalTitle.textContent = selectedProduct.name;
    modalDescription.textContent = selectedProduct.description;

    sizeLabels.forEach((label, index) => {
        const size = Object.keys(selectedProduct.sizes)[index];
        label.innerHTML = `<span class="form-icon">${size.toUpperCase()}</span> ${selectedProduct.sizes[size].size}`;
        label.classList.remove('selected');
        if (size === 's') {
            label.classList.add('selected');
        }
    });

    additivesLabels.forEach((label, index) => {
        label.innerHTML = `<span class="form-icon">${index + 1}</span> ${selectedProduct.additives[index].name}`;
        label.classList.remove('selected');
    });

    sizeRadioButtons.forEach(radio => {
        radio.addEventListener('click', () => {
            sizeLabels.forEach(label => {
                label.classList.remove('selected');
            });

            sizeRadioButtons.forEach(otherRadio => {
                if (otherRadio !== radio) {
                    otherRadio.checked = false;
                }
            });

            const selectedLabel = sizeLabels[Array.from(sizeRadioButtons).indexOf(radio)];
            selectedLabel.classList.add('selected');
            updateTotalPrice();
        });
    });

    updateTotalPrice();

    resetModalState();

    modal.classList.add('modal-show');
    document.body.classList.add('body');
}

function resetModalState() {
    sizeRadioButtons.forEach(radio => {
        radio.checked = false;
    });

    additivesCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

function updateTotalPrice() {
    let totalPrice = parseFloat(selectedProduct.price);

    sizeRadioButtons.forEach(radio => {
        if (radio.checked) {
            const sizeAddPrice = parseFloat(selectedProduct.sizes[radio.value]?.['add-price'] || 0);
            totalPrice = parseFloat(selectedProduct.price);
            totalPrice += sizeAddPrice;
        }
    });

    additivesCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const additive = selectedProduct.additives.find(additive => additive.name.toLowerCase() === checkbox.value.toLowerCase());
            if (additive) {
                // const additiveAddPrice = parseFloat(additive['add-price'] || additive['price'] || 0);
                totalPrice += 0.50;
            } else {
                totalPrice += 0.50;
            }
        }
    });

    totalSpan.textContent = '$' + totalPrice.toFixed(2);
}

additivesCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        updateTotalPrice();

        additivesLabels.forEach(label => {
            label.classList.remove('selected');
        });

        additivesCheckboxes.forEach((checkbox, index) => {
            const selectedLabel = additivesLabels[index];
            if (checkbox.checked) {
                selectedLabel.classList.add('selected');
            }
        });
    });
});

closeBtn.addEventListener('click', () => {
    resetModalState();
    modal.classList.remove('modal-show');
    document.body.classList.remove('body');
});

window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-show')) {
        closeModal();
    }
});

function closeModal() {
    resetModalState();
    modal.classList.remove('modal-show');
    document.body.classList.remove('body');
}

const productCards = document.querySelectorAll('.menu-list-item');
productCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        showModal(products[index], products);
    });
});
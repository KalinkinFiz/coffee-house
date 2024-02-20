const header = document.querySelector('.header');
const menulist = {
    button: document.getElementById('navigation-burger'),
    body: document.getElementById('navigation'),
};
const menuLinks = header.querySelectorAll('a');

function toggleMenu() {
    const isOpen = menulist.button.classList.toggle('active');
    menulist.body.classList.toggle('active', isOpen);
    document.body.classList.toggle('body-lock', isOpen);
}


function closeMenu() {
    menulist.button.classList.remove('active');
    menulist.body.classList.remove('active');
    document.body.classList.remove('body-lock');
}

function init() {
    menulist.button.addEventListener('click', toggleMenu);
    menuLinks.forEach(link => link.addEventListener('click', closeMenu));
}

init();
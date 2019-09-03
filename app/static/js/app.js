"use strict";

import Home from './views/pages/home.js'
import Message from './views/pages/message.js'
import About from './views/pages/about.js'

import Header from './views/components/header.js'
import Footer from './views/components/footer.js'

import Utils from './utils.js'

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/': Home,
    '/m/:id': Message,
    '/about': About
};


// This is a router.
// It takes a URL and renders the corresponding content page or 404 page.
const router = async () => {
    console.log('router call');

    // Lazy load view element:
    const header = null || document.getElementById('header');
    const content = null || document.getElementById('content');
    const footer = null || document.getElementById('footer');

    // Render the header and footer of the page
    header.innerHTML = await Header.render();
    await Header.afterRender();

    footer.innerHTML = await Footer.render();
    await Footer.afterRender();

    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL();

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? '/' + request.verb : '');

    // Get the page from our hash of supported routes.
    let page = routes[parsedURL] ? routes[parsedURL] : null;

    // For all unknown pages redirect to home
    if (!page) {
        console.log('redirect to main');
        Utils.goTo('/');
        return;
    }

    content.innerHTML = await page.render();
    await page.afterRender();
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);

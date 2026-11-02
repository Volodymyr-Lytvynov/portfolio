document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.site-nav');
    const label = toggle ? toggle.querySelector('.sr-only') : null;

    function setMenu(open) {
        if (!toggle || !nav) return;
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        nav.classList.toggle('is-open', open);
        document.body.classList.toggle('nav-open', open);
        if (label) label.textContent = open ? 'Close menu' : 'Menu';
    }

    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            setMenu(toggle.getAttribute('aria-expanded') !== 'true');
        });

        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                setMenu(false);
            });
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') setMenu(false);
        });
    }

    function onScroll() {
        if (!header) return;
        header.classList.toggle('is-stuck', window.scrollY > 8);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    document.querySelectorAll('.copy-email').forEach(function (button) {
        button.addEventListener('click', function () {
            const email = button.getAttribute('data-copy');
            const original = button.textContent;
            copyText(email).then(function (ok) {
                button.textContent = ok ? 'Copied' : 'Not copied';
                window.setTimeout(function () {
                    button.textContent = original;
                }, 1800);
            });
        });
    });
});

function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(value).then(function () {
            return true;
        }).catch(function () {
            return fallbackCopy(value);
        });
    }
    return Promise.resolve(fallbackCopy(value));
}

function fallbackCopy(value) {
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.left = '-999px';
    document.body.appendChild(field);
    field.select();
    let ok = false;
    try {
        ok = document.execCommand('copy');
    } catch (error) {
        ok = false;
    }
    document.body.removeChild(field);
    return ok;
}

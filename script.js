// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close mobile menu when pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Copy Email functionality
document.addEventListener('DOMContentLoaded', function() {
    const copyEmailBtn = document.querySelector('.btn-copy-email');
    
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = 'v.lytvynov55@gmail.com';
            
            // Use the Clipboard API if available
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(email).then(function() {
                    showCopySuccess(copyEmailBtn);
                }).catch(function(err) {
                    console.error('Failed to copy email: ', err);
                    fallbackCopyTextToClipboard(email, copyEmailBtn);
                });
            } else {
                // Fallback for older browsers or non-secure contexts
                fallbackCopyTextToClipboard(email, copyEmailBtn);
            }
        });
    }
});

// Fallback method for copying text to clipboard
function fallbackCopyTextToClipboard(text, button) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(button);
        } else {
            showCopyError(button);
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        showCopyError(button);
    }
    
    document.body.removeChild(textArea);
}

// Show success feedback
function showCopySuccess(button) {
    const iconSpan = button.querySelector('.btn-icon');
    const originalText = button.childNodes[0].textContent.trim();
    
    // Change only the text content, keeping the icon
    button.childNodes[0].textContent = 'Copied! ';
    
    setTimeout(function() {
        button.childNodes[0].textContent = originalText;
    }, 2000);
}

// Show error feedback
function showCopyError(button) {
    const iconSpan = button.querySelector('.btn-icon');
    const originalText = button.childNodes[0].textContent.trim();
    
    // Change only the text content, keeping the icon
    button.childNodes[0].textContent = 'Copy failed ';
    
    setTimeout(function() {
        button.childNodes[0].textContent = originalText;
    }, 2000);
}

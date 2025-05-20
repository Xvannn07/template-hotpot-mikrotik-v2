// DOM Elements
const btnUserLogin = document.getElementById('btnUserLogin');
const btnVoucherLogin = document.getElementById('btnVoucherLogin');
const formUserLogin = document.getElementById('formUserLogin');
const formVoucherLogin = document.getElementById('formVoucherLogin');

/**
 * Animates fade transition between two elements
 * @param {HTMLElement} showEl - Element to show
 * @param {HTMLElement} hideEl - Element to hide
 */
function fadeToggle(showEl, hideEl) {
    // Configure show element
    showEl.style.position = 'relative';
    showEl.style.pointerEvents = 'auto';
    showEl.style.opacity = '0';
    showEl.style.transform = 'translateY(10px)';
    showEl.style.transition = 'opacity 300ms ease, transform 300ms ease';
    showEl.style.zIndex = '10';
    showEl.setAttribute('aria-hidden', 'false');

    // Configure hide element
    hideEl.style.pointerEvents = 'none';
    hideEl.style.zIndex = '1';
    hideEl.setAttribute('aria-hidden', 'true');

    // Trigger reflow for animation
    void showEl.offsetWidth;

    // Animate elements
    showEl.style.opacity = '1';
    showEl.style.transform = 'translateY(0)';
    hideEl.style.opacity = '0';
    hideEl.style.transform = 'translateY(10px)';

    // Complete hide after animation
    setTimeout(() => {
        hideEl.style.position = 'absolute';
    }, 300);
}

/**
 * Updates button styles based on selection
 * @param {HTMLElement} selectedBtn - The button to be selected
 */
function updateButtonSelection(selectedBtn) {
    [btnUserLogin, btnVoucherLogin].forEach(btn => {
        if (btn === selectedBtn) {
            btn.classList.add('btn-selected');
            btn.setAttribute('aria-pressed', 'true');
        } else {
            btn.classList.remove('btn-selected');
            btn.setAttribute('aria-pressed', 'false');
        }
    });
}

/**
 * Initializes form state
 */
function initializeFormState() {
    updateButtonSelection(btnUserLogin);
    
    // Configure initial form states
    formUserLogin.style.position = 'relative';
    formUserLogin.style.opacity = '1';
    formUserLogin.style.pointerEvents = 'auto';
    formUserLogin.setAttribute('aria-hidden', 'false');

    formVoucherLogin.style.position = 'absolute';
    formVoucherLogin.style.opacity = '0';
    formVoucherLogin.style.pointerEvents = 'none';
    formVoucherLogin.setAttribute('aria-hidden', 'true');
}

/**
 * Handles smooth scroll and highlight effect
 * @param {HTMLElement} element - Element to scroll to
 */
function scrollAndHighlight(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    element.style.transition = 'background-color 0.5s ease';
    element.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';

    setTimeout(() => {
        element.style.backgroundColor = 'transparent';
    }, 1000);
}

// Event Listeners
btnUserLogin.addEventListener('click', () => {
    if (formUserLogin.style.opacity === '1') return;
    fadeToggle(formUserLogin, formVoucherLogin);
    updateButtonSelection(btnUserLogin);
});

btnVoucherLogin.addEventListener('click', () => {
    if (formVoucherLogin.style.opacity === '1') return;
    fadeToggle(formVoucherLogin, formUserLogin);
    updateButtonSelection(btnVoucherLogin);
});

// Package selection buttons
document.querySelectorAll('button').forEach(button => {
    if (button.textContent.trim() === 'Pilih Paket') {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.getElementById('contactSection');
            scrollAndHighlight(contactSection);
        });
    }
});

/**
 * 
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
function validateForm(username, password) {
    if (!username || username.trim() === '') {
      return false;
    }
    return true;
}
  
/**
 * Form Actions Member
 */

function member() {
    const username = document.getElementById('member-username');
    const password = document.getElementById('member-password');

    if (!validateForm(username.value, password.value)) {
        return false;
    }

    return doLogin(username.value, password.value);
};

/**
 * Form Actions Voucher
 */
function voucher() {
    const username = document.getElementById('voucher-username');
    const password = document.getElementById('voucher-password');

    password.value = username.value;
    username.onkeyup = function() {
        password.value += username.value;
    };

    if (!validateForm(username.value, password.value)) {
        return false;
    }

    return doLogin(username.value, password.value);
}

initializeFormState();
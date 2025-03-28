// Menu Mobile - Ativado pelo clique no nome
function setupMobileMenu() {
    const logoTitle = document.querySelector('.logo-container h1');
    const logoImg = document.querySelector('.logo-container img');
    const menu = document.querySelector('.desktop-menu');

    if (window.innerWidth <= 768) {
        // Fecha menu ao carregar
        menu.classList.remove('active');

        // Abre/fecha menu ao clicar no logo ou nome
        logoTitle.addEventListener('click', toggleMenu);
        logoImg.addEventListener('click', toggleMenu);

        // Fecha ao clicar fora
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && 
                e.target !== logoTitle && 
                e.target !== logoImg) {
                menu.classList.remove('active');
            }
        });

        // Fecha ao selecionar item
        document.querySelectorAll('.desktop-menu a').forEach(item => {
            item.addEventListener('click', () => {
                menu.classList.remove('active');
            });
        });
    }
}

function toggleMenu(e) {
    e.stopPropagation();
    const menu = document.querySelector('.desktop-menu');
    menu.classList.toggle('active');
}

// Função para aplicar o tema
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Função para trocar o tema
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

// Função para trocar o idioma
function changeLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    // Aqui você deve implementar a lógica para alterar os textos da página
    console.log('Idioma alterado para:', lang);
}

// Verifica cookies
function checkCookies() {
    if (!localStorage.getItem('cookiesAccepted')) {
        // Mostra o aviso de cookies
        const cookieNotice = document.getElementById('cookie-notice');
        if (cookieNotice) {
            cookieNotice.style.display = 'block';
        }
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    setupMobileMenu();

    // Tema
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Idioma
    const lang = localStorage.getItem('preferredLanguage') || 
                 (navigator.language.startsWith('pt') ? 'pt-BR' : 'en');
    changeLanguage(lang);

    // Ano atual e cookies
    document.getElementById('current-year').textContent = new Date().getFullYear();
    checkCookies();

    // Configura botões de tema
    document.querySelectorAll('[id^="theme-toggle"]').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    // Configura botões de idioma (adicionado esta parte que faltava)
    document.querySelectorAll('[id^="lang-toggle"]').forEach(btn => {
        btn.addEventListener('click', function() {
            const currentLang = localStorage.getItem('preferredLanguage') || 
                               (navigator.language.startsWith('pt') ? 'pt-BR' : 'en');
            const newLang = currentLang === 'pt-BR' ? 'en' : 'pt-BR';
            changeLanguage(newLang);
        });
    });
});

// Atualiza ao redimensionar
window.addEventListener('resize', function() {
    const menu = document.querySelector('.desktop-menu');
    if (window.innerWidth > 768) {
        menu.classList.remove('active');
    } else {
        setupMobileMenu();
    }
});
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

// [Mantém todas as outras funções existentes...]

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
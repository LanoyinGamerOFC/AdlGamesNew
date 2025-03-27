// Menu Hamburguer - Solução Completa
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (!hamburger || !mobileMenu) {
        console.warn('Elementos do menu mobile não encontrados!');
        return;
    }
    
    // Abrir/Fechar menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('is-active');
        mobileMenu.classList.toggle('active');
        
        // Bloquear scroll do body quando menu aberto
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Fechar menu ao clicar em links
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('is-active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('is-active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    setupMobileMenu();
    
    // Restante do seu código (ano no footer, cookies, etc)
    document.getElementById('current-year').textContent = new Date().getFullYear();
    // ... outros códigos
});

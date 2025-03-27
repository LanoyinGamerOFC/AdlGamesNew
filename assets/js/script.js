// Menu hambúrguer
document.querySelector('.hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.mobile-menu').classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.hamburger').classList.remove('active');
        document.querySelector('.mobile-menu').classList.remove('active');
    });
});

// Ano atual no footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Sistema de cookies
function checkCookies() {
    if (!localStorage.getItem('cookiesAccepted')) {
        document.querySelector('.cookie-consent').style.display = 'flex';
    }
}

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.querySelector('.cookie-consent').style.display = 'none';
}

// Verificar cookies ao carregar a página
window.addEventListener('DOMContentLoaded', checkCookies);

// Sistema de tema claro/escuro
function setupTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    const mobileToggle = document.getElementById('theme-toggle-mobile');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Atualizar texto do botão
    const themeEmoji = theme === 'dark' ? '🌞' : '🌙';
    document.getElementById('theme-toggle').textContent = themeEmoji;
    
    const mobileToggle = document.getElementById('theme-toggle-mobile');
    if (mobileToggle) {
        mobileToggle.textContent = `${themeEmoji} ${theme === 'dark' ? 'Claro' : 'Escuro'}`;
    }
}

// Sistema de internacionalização
function changeLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    document.getElementById('html-tag').setAttribute('lang', lang);
    updateTexts(lang);
}

function updateTexts(lang) {
    const translations = {
        'pt-BR': {
            'home': 'Página Inicial',
            'games': 'Jogos',
            'projects': 'Projetos',
            'account': 'Conta',
            'cookieMessage': 'Este site usa cookies para melhorar sua experiência. Ao continuar, você concorda com nosso uso de cookies.',
            'acceptCookies': 'Aceitar',
            'welcome': 'Bem-vindo à AdlGames Studio',
            'welcomeMessage': 'Criando experiências de jogo incríveis e inovadoras',
            'latestProject': 'Projeto Mais Recente',
            'comingSoon': 'Em Breve',
            'ourGames': 'Nossos Jogos',
            'stayTuned': 'Fique ligado para nossos próximos lançamentos!',
            'ourProjects': 'Nossos Projetos',
            'learnMore': 'Saiba Mais',
            'accountSection': 'Seção de Conta',
            'comingSoonFeature': 'Em breve! Estamos trabalhando nesta funcionalidade.'
        },
        'en': {
            'home': 'Home',
            'games': 'Games',
            'projects': 'Projects',
            'account': 'Account',
            'cookieMessage': 'This website uses cookies to improve your experience. By continuing, you agree to our use of cookies.',
            'acceptCookies': 'Accept',
            'welcome': 'Welcome to AdlGames Studio',
            'welcomeMessage': 'Creating amazing and innovative gaming experiences',
            'latestProject': 'Latest Project',
            'comingSoon': 'Coming Soon',
            'ourGames': 'Our Games',
            'stayTuned': 'Stay tuned for our upcoming releases!',
            'ourProjects': 'Our Projects',
            'learnMore': 'Learn More',
            'accountSection': 'Account Section',
            'comingSoonFeature': 'Coming soon! We are working on this feature.'
        }
    };
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Detectar idioma preferido do usuário
function detectUserLanguage() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        return savedLang;
    }
    
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang.startsWith('pt')) {
        return 'pt-BR';
    } else {
        return 'en';
    }
}

// Inicializar tudo quando a página carregar
window.addEventListener('DOMContentLoaded', () => {
    // Idioma
    const lang = detectUserLanguage();
    changeLanguage(lang);
    
    // Tema
    setupTheme();
    
    // Verificar se é mobile para ajustes específicos
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile');
    }
});

// Atualizar ao redimensionar
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
});
// Sistema de Tema
function setupTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Configurar listeners para todos os botões de tema
    document.querySelectorAll('[id^="theme-toggle"]').forEach(button => {
        button.addEventListener('click', toggleTheme);
    });
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Atualizar todos os botões de tema
    const themeEmoji = theme === 'dark' ? '🌞' : '🌙';
    const themeText = theme === 'dark' ? 'Tema Claro' : 'Tema Escuro';
    
    document.querySelectorAll('[id^="theme-toggle"]').forEach(button => {
        button.innerHTML = `${themeEmoji} <span data-i18n="toggleTheme">${themeText}</span>`;
    });
    
    // Atualizar textos traduzidos
    updateTexts(document.documentElement.getAttribute('lang') || 'pt-BR');
}

// Sistema de Idiomas
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
            'comingSoonFeature': 'Em breve! Estamos trabalhando nesta funcionalidade.',
            'toggleTheme': 'Alternar Tema'
        },
        'en': {
            'home': 'Home',
            'games': 'Games',
            'projects': 'Projects',
            'account': 'Account',
            'cookieMessage': 'This website uses cookies to improve your experience. By continuing, you agree with our use of cookies.',
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
            'comingSoonFeature': 'Coming soon! We are working on this feature.',
            'toggleTheme': 'Toggle Theme'
        }
    };
    
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Sistema de Cookies
function checkCookies() {
    if (!localStorage.getItem('cookiesAccepted')) {
        document.querySelector('.cookie-consent').style.display = 'flex';
    }
}

function acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    document.querySelector('.cookie-consent').style.display = 'none';
}

// Detectar preferências do usuário
function detectUserPreferences() {
    // Idioma
    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = navigator.language || navigator.userLanguage;
    const lang = savedLang || (browserLang.startsWith('pt') ? 'pt-BR' : 'en');
    changeLanguage(lang);
    
    // Tema
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
}

// Inicializar tudo quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // Ano atual no footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Configurar funcionalidades
    setupTheme();
    detectUserPreferences();
    checkCookies();
});
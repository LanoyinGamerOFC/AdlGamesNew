// Detectar país do usuário
function detectUserCountry() {
    // Verificar se já tem um idioma salvo
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) return savedLang;
    
    // Detectar idioma do navegador
    const browserLang = navigator.language || navigator.userLanguage;
    
    // Se for português (Brasil), usar pt-BR, senão inglês
    return browserLang.startsWith('pt') ? 'pt-BR' : 'en';
}

// Aplicar idioma baseado no país
document.addEventListener('DOMContentLoaded', function() {
    const lang = detectUserCountry();
    document.getElementById('html-tag').setAttribute('lang', lang);
    
    // Disparar evento para atualizar textos
    const event = new Event('languageChanged');
    document.dispatchEvent(event);
});


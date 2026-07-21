// Countdown de Carregamento
document.addEventListener('DOMContentLoaded', function() {
    const ageModal = document.getElementById('ageModal');
    const mainContent = document.getElementById('mainContent');
    const countdownEl = document.getElementById('countdown');

    // Verificar se já passou pelo countdown
    if (localStorage.getItem('siteLoaded') === 'true') {
        ageModal.style.display = 'none';
        mainContent.classList.remove('hidden');
    } else {
        // Iniciar countdown
        let count = 3;
        
        const interval = setInterval(function() {
            countdownEl.textContent = count;
            
            // Animação de escala
            countdownEl.style.animation = 'none';
            setTimeout(() => {
                countdownEl.style.animation = 'pulse 1s infinite';
            }, 10);
            
            count--;
            
            if (count < 0) {
                clearInterval(interval);
                
                // Efeito de fade out
                ageModal.style.transition = 'opacity 0.5s ease';
                ageModal.style.opacity = '0';
                
                setTimeout(() => {
                    ageModal.style.display = 'none';
                    mainContent.classList.remove('hidden');
                    localStorage.setItem('siteLoaded', 'true');
                    
                    // Track no Meta Pixel
                    if (typeof fbq !== 'undefined') {
                        fbq('track', 'ViewContent', {
                            content_type: 'product',
                            content_name: 'Curso de Massagem Tântrica',
                            currency: 'BRL'
                        });
                    }
                }, 500);
            }
        }, 1000);
    }

    // Rastreamento de scroll depth
    let scrollTracked = {
        '25': false,
        '50': false,
        '75': false,
        '100': false
    };

    window.addEventListener('scroll', function() {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercentage >= 25 && !scrollTracked['25']) {
            if (typeof fbq !== 'undefined') {
                fbq('track', 'ViewContent', { scroll_depth: '25%' });
            }
            scrollTracked['25'] = true;
        }
        
        if (scrollPercentage >= 50 && !scrollTracked['50']) {
            if (typeof fbq !== 'undefined') {
                fbq('track', 'ViewContent', { scroll_depth: '50%' });
            }
            scrollTracked['50'] = true;
        }
        
        if (scrollPercentage >= 75 && !scrollTracked['75']) {
            if (typeof fbq !== 'undefined') {
                fbq('track', 'ViewContent', { scroll_depth: '75%' });
            }
            scrollTracked['75'] = true;
        }
        
        if (scrollPercentage >= 100 && !scrollTracked['100']) {
            if (typeof fbq !== 'undefined') {
                fbq('track', 'ViewContent', { scroll_depth: '100%' });
            }
            scrollTracked['100'] = true;
        }
    });
});

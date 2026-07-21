// Verificação de Idade
document.addEventListener('DOMContentLoaded', function() {
    const ageModal = document.getElementById('ageModal');
    const mainContent = document.getElementById('mainContent');
    const btnSim = document.getElementById('btnSim');
    const btnNao = document.getElementById('btnNao');

    // Verificar se o usuário já confirmou a idade
    if (localStorage.getItem('ageConfirmed') === 'true') {
        ageModal.style.display = 'none';
        mainContent.classList.remove('hidden');
    } else {
        ageModal.style.display = 'flex';
        mainContent.classList.add('hidden');
    }

    // Botão "Não" - redireciona para Google
    btnNao.addEventListener('click', function() {
        window.location.href = 'https://www.google.com';
    });

    // Botão "Sim" - confirma a idade e mostra conteúdo
    btnSim.addEventListener('click', function() {
        localStorage.setItem('ageConfirmed', 'true');
        ageModal.style.display = 'none';
        mainContent.classList.remove('hidden');
        
        // Track no Meta Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'ViewContent', {
                content_type: 'product',
                content_name: 'Curso de Massagem Tântrica',
                currency: 'BRL'
            });
        }
    });

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

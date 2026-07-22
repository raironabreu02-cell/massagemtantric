function iniciarCheckout(button) {
    const plan = button.getAttribute('data-plan');
    const price = parseFloat(button.getAttribute('data-price'));

    console.log(`🔴 CLICOU EM: ${plan} - R$ ${price.toFixed(2)}`);

    // ============================================================
    // META PIXEL - InitiateCheckout
    // ============================================================
    if (typeof fbq !== 'undefined') {
        fbq('track', 'InitiateCheckout', {
            value: price,
            currency: 'BRL',
            content_name: `Plano ${plan}`,
            content_type: 'product'
        });
        console.log('✅ Meta Pixel: InitiateCheckout disparado');
    } else {
        console.warn('❌ Meta Pixel não carregado');
    }

    // ============================================================
    // UTIMIFY - Evento de Checkout
    // ============================================================
    try {
        if (typeof window.utimify !== 'undefined') {
            window.utimify.track('checkout_initiated', {
                plan: plan,
                price: price,
                currency: 'BRL',
                timestamp: new Date().toISOString()
            });
            console.log('✅ Utimify: Checkout iniciado');
        } else {
            console.log('⏳ Utimify carregando...');
        }
    } catch (error) {
        console.log('Utimify ainda está carregando');
    }

    // ============================================================
    // REDIRECIONAR PARA CHECKOUT
    // ============================================================
    setTimeout(() => {
        if (plan === 'Básico') {
            window.location.href = 'https://pay.wiapy.com/hhWCQBEwcEEh';
        } else if (plan === 'Premium') {
            window.location.href = 'https://pay.wiapy.com/xxZK8aNw7uYZ';
        }
    }, 500);
}

// ============================================================
// RASTREAMENTO INICIAL
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🎯 SITE CARREGADO COM SUCESSO', 'color: green; font-weight: bold; font-size: 16px');
    console.log('%c✅ Meta Pixel Ativo (ID: 2258617738296037)', 'color: green; font-weight: bold');
    console.log('%c✅ Utimify Pixel Ativo', 'color: green; font-weight: bold');
    console.log('%c✅ Clique em "Comprar Agora" para testar', 'color: blue; font-weight: bold');

    // Meta Pixel ViewContent
    if (typeof fbq !== 'undefined') {
        fbq('track', 'ViewContent', {
            content_name: 'Sexo Oral Perfeito',
            content_type: 'product'
        });
        console.log('✅ Meta Pixel: ViewContent disparado');
    }

    // Rastrear scroll
    let scrollTracked = false;
    window.addEventListener('scroll', function() {
        if (!scrollTracked) {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercentage > 50) {
                fbq('track', 'ViewContent', {
                    content_name: 'Scroll 50%',
                    content_type: 'engagement'
                });
                scrollTracked = true;
                console.log('✅ Meta Pixel: Scroll 50% rastreado');
            }
        }
    });
});

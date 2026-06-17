document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // 1. WIDGET WHATSAPP (Aplica a todas las páginas)
    // ==========================================
    const closeWa = document.getElementById('close-wa-widget');
    const openWa = document.getElementById('open-wa-widget');
    const waWidget = document.getElementById('whatsapp-widget');

    if (closeWa && openWa && waWidget) {
        closeWa.addEventListener('click', function() {
            waWidget.style.display = 'none';
            openWa.style.display = 'flex';
        });
        openWa.addEventListener('click', function() {
            openWa.style.display = 'none';
            waWidget.style.display = 'flex';
        });
    }

    // ==========================================
    // 2. CARRUSEL SWIPER (Página Inicio)
    // ==========================================
    if (document.querySelector(".spiraSwiper")) {
        var swiper = new Swiper(".spiraSwiper", {
            loop: true,
            centeredSlides: true,
            slidesPerView: "auto",
            spaceBetween: 20,
            speed: 600,
            watchSlidesProgress: true,
            slideToClickedSlide: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: false,
            },
            breakpoints: {
                992: { spaceBetween: 40 }
            }
        });
    }

    // ==========================================
    // VALIDAMOS QUE GSAP ESTÉ CARGADO
    // ==========================================
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 3. ANIMACIÓN ESFERAS - PROPUESTA DE VALOR
// ==========================================
const propuestaSection = document.getElementById('propuesta-section');

if (propuestaSection && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
        const spheres = gsap.utils.toArray(".sphere-anim");

        // Estado inicial limpio para todas las esferas
        gsap.set(spheres, {
            autoAlpha: 0,
            y: 120,
            scale: 0.75,
            zIndex: 1
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: propuestaSection,
                start: "top top",
                end: "+=2600",
                pin: true,
                scrub: 1.4,
                anticipatePin: 1,
                invalidateOnRefresh: true
            }
        });

        spheres.forEach((sphere, index) => {
            const isLast = index === spheres.length - 1;

            // Entrada de la esfera actual
            tl.to(sphere, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                zIndex: 10,
                duration: 1.2,
                ease: "power2.out"
            });

            // Pausa visual para que el usuario alcance a leer
            tl.to(sphere, {
                duration: 0.8
            });

            // Salida suave, excepto en la última esfera
            if (!isLast) {
                tl.to(sphere, {
                    autoAlpha: 0,
                    y: -120,
                    scale: 0.78,
                    zIndex: 1,
                    duration: 1.2,
                    ease: "power2.inOut"
                });
            }
        });
    });
}

// ==========================================
// ANIMACIÓN ESFERAS EN MOBILE
// Movimiento suave al hacer scroll
// ==========================================

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.matchMedia().add("(max-width: 768px)", () => {
        const mobileSpheres = gsap.utils.toArray(".sphere-anim");

        mobileSpheres.forEach((sphere) => {
            gsap.from(sphere, {
                opacity: 0,
                y: 60,
                scale: 0.92,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sphere,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    });
}

        // ==========================================
        // 4. LÍNEA DEL TIEMPO (Página Nosotros)
        // ==========================================
        const stepsContainer = document.querySelector(".steps-container");
        if (stepsContainer) {
            // Hacemos que la línea tarde más en llenarse (end: "+=1200")
            gsap.to(".steps-progress", {
                height: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: ".steps-container",
                    start: "top 40%",
                    end: "+=1200", // Distancia de scroll más larga = más lento
                    scrub: 1       // El número 1 añade una pizca de suavidad al seguir el mouse
                }
            });

            const steps = document.querySelectorAll('.step-item');
            steps.forEach((step) => {
                ScrollTrigger.create({
                    trigger: step,
                    start: "top 50%",
                    end: "bottom 50%",
                    onEnter: () => step.classList.add('active'),
                    onLeaveBack: () => step.classList.remove('active'), // Desaparece al subir
                    scrub: true
                });
            });
        }

        // ==========================================
                // 5. MISIÓN, VISIÓN, VALORES (Página Nosotros)
                // ==========================================
                const mvvSection = document.getElementById('mvv-scroll-section');
                if (mvvSection) {
                    const isMobile = window.innerWidth <= 768;

                    if (!isMobile) {
                        // VERSIÓN ESCRITORIO: Pinned (Congelado)
                        let tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: "#mvv-scroll-section",
                                start: "top top",
                                end: "+=3000",         // Aumentamos distancia para que sea más lento
                                pin: true,
                                scrub: 1,
                                anticipatePin: 1       // Mejora la transición al entrar al "pin"
                            }
                        });

                        // Los textos aparecen uno por uno
                        tl.to("#mision .mvv-column-text", { opacity: 1, y: 0, duration: 2 })
                          .to("#vision .mvv-column-text", { opacity: 1, y: 0, duration: 2 }, "+=1")
                          .to("#valores .mvv-column-text", { opacity: 1, y: 0, duration: 2 }, "+=1")
                          .to({}, {duration: 2}); // 💡 ESTA ES LA CLAVE: Mantiene todo visible un poco más antes de soltar el scroll
                    }
                    else {
                        // VERSIÓN MÓVIL: Secuencial por posición
                        const items = document.querySelectorAll('.mvv-item');
                        items.forEach((item) => {
                            const text = item.querySelector('.mvv-column-text');
                            gsap.to(text, {
                                opacity: 1,
                                y: 0,
                                scrollTrigger: {
                                    trigger: item,
                                    start: "top 75%",
                                    end: "top 25%",
                                    scrub: 1
                                }
                            });
                        });
                    }
                }

    } // AQUÍ CIERRA EL IF DE GSAP

    // ==========================================
        // 6. LÓGICA PÁGINA "CONTACTO"
        // ==========================================

        // A) Animación de texto de la Pantalla de Comandos
        const typeText = document.querySelector('.type-animation');
        const fadeInText = document.querySelector('.fade-in-text');

        if (typeText && typeof gsap !== 'undefined') {
            // Separa el texto en caracteres para animarlo tipo "hacker"
            const text = typeText.innerText;
            typeText.innerText = '';
            const splitText = text.split('').map(char => `<span>${char}</span>`).join('');
            typeText.innerHTML = splitText;

            let tlContact = gsap.timeline();
            // Escribe letra por letra
            tlContact.from('.type-animation span', {
                opacity: 0,
                display: 'none',
                stagger: 0.05,
                duration: 0.1,
                ease: "none"
            })
            // Luego hace aparecer el párrafo suavemente
            .from(fadeInText, {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power2.out"
            }, "+=0.3");
        }

        // B) Lógica del Formulario Interactivo (Selección de Videojuego)
        // ==========================================
            // LÓGICA DEL FORMULARIO MULTI-PASO Y CONDICIONAL
            // ==========================================
            const form = document.getElementById('spira-contact-form');

            if (form && typeof gsap !== 'undefined') {
                const btnNext = document.querySelectorAll('.btn-next');
                const btnPrev = document.querySelectorAll('.btn-prev'); // Seleccionamos las flechas
                const btnReview = document.getElementById('btn-review');
                const btnEdit = document.getElementById('btn-edit');
                const globalSubmit = document.getElementById('global-submit-wrapper');

                // --- LÓGICA CONDICIONAL PASO 2 ---
                const checkTelefono = document.getElementById('check-telefono');
                const phoneDetails = document.getElementById('phone-details');
                const checkCorreo = document.getElementById('check-correo');
                const emailDetails = document.getElementById('email-details');

                checkTelefono.addEventListener('change', function() {
                    if (this.checked) {
                        phoneDetails.style.display = 'block';
                        gsap.fromTo(phoneDetails, {opacity: 0, y: -10}, {opacity: 1, y: 0, duration: 0.3});
                    } else {
                        phoneDetails.style.display = 'none';
                    }
                });

                checkCorreo.addEventListener('change', function() {
                    if (this.checked) {
                        emailDetails.style.display = 'block';
                        gsap.fromTo(emailDetails, {opacity: 0, y: -10}, {opacity: 1, y: 0, duration: 0.3});
                    } else {
                        emailDetails.style.display = 'none';
                    }
                });

                // Quitar error al corregir
                form.addEventListener('input', (e) => {
                    if (e.target.classList.contains('input-error')) e.target.classList.remove('input-error');
                });

                // --- AVANZAR DE PASO ---
                btnNext.forEach(btn => {
                    btn.addEventListener('click', function() {
                        const currentStepDiv = this.closest('.form-step');
                        const nextStepId = this.getAttribute('data-next');
                        const nextStepDiv = document.getElementById(nextStepId);
                        let isValid = true;

                        // Validación PASO 1
                        if (currentStepDiv.id === 'step-1') {
                            const inputs = document.querySelectorAll('.required-step-1');
                            inputs.forEach(input => {
                                if (!input.checkValidity() || input.value.trim() === '') {
                                    isValid = false;
                                    input.classList.add('input-error');
                                }
                            });
                        }

                        // Validación PASO 2
                        if (currentStepDiv.id === 'step-2') {
                            if (!checkTelefono.checked && !checkCorreo.checked) {
                                alert('Por favor selecciona al menos un método de contacto (Teléfono o Correo).');
                                return;
                            }
                            if (checkTelefono.checked) {
                                const telInput = document.getElementById('telefono');
                                const pref = document.querySelector('input[name="pref_telefono"]:checked');
                                if (telInput.value.length < 8) {
                                    telInput.classList.add('input-error');
                                    isValid = false;
                                }
                                if (!pref) {
                                    alert('Por favor selecciona si prefieres WhatsApp, Llamadas o Ambas.');
                                    isValid = false;
                                }
                            }
                            if (checkCorreo.checked) {
                                const emailInput = document.getElementById('correo');
                                if (!emailInput.checkValidity() || emailInput.value.trim() === '') {
                                    emailInput.classList.add('input-error');
                                    isValid = false;
                                }
                            }
                        }

                        if (!isValid) return;

                        // Transición GSAP (Avanzar)
                        gsap.to(currentStepDiv, {
                            opacity: 0, y: -20, duration: 0.4,
                            onComplete: () => {
                                currentStepDiv.style.display = 'none';
                                nextStepDiv.style.display = 'block';
                                gsap.fromTo(nextStepDiv, {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5});
                            }
                        });
                    });
                });

                // --- RETROCEDER DE PASO (Botón Flecha) ---
                btnPrev.forEach(btn => {
                    btn.addEventListener('click', function() {
                        const currentStepDiv = this.closest('.form-step');
                        const prevStepId = this.getAttribute('data-prev');
                        const prevStepDiv = document.getElementById(prevStepId);

                        // Transición GSAP (Retroceder)
                        gsap.to(currentStepDiv, {
                            opacity: 0, y: 20, duration: 0.4, // Se desliza hacia abajo al regresar
                            onComplete: () => {
                                currentStepDiv.style.display = 'none';
                                prevStepDiv.style.display = 'block';
                                gsap.fromTo(prevStepDiv, {opacity: 0, y: -20}, {opacity: 1, y: 0, duration: 0.5});
                            }
                        });
                    });
                });

                // --- VISTA PREVIA ---
                        btnReview.addEventListener('click', function() {
                            const currentStepDiv = document.getElementById('step-3');
                            const summaryDiv = document.getElementById('step-summary');
                            const globalActions = document.getElementById('global-actions');

                            // Validar Checkboxes de Eventos y Textarea
                            const checkboxes = document.querySelectorAll('.checkbox-step-3:checked');
                            const textarea = document.querySelector('.required-step-3');

                            if (checkboxes.length === 0) {
                                alert('Por favor selecciona al menos un tipo de evento.');
                                return;
                            }
                            if (!textarea.checkValidity() || textarea.value.trim() === '') {
                                textarea.classList.add('input-error');
                                return;
                            }

                            // Llenar resumen dinámico
                            document.getElementById('sum-nombre').innerText = form.nombre.value;
                            document.getElementById('sum-empresa').innerText = form.empresa.value;

                            // Llenar teléfono condicional
                            if (checkTelefono.checked) {
                                const code = document.getElementById('country-code').value;
                                const tel = form.telefono.value;
                                const pref = document.querySelector('input[name="pref_telefono"]:checked').value;
                                document.getElementById('sum-telefono').innerText = `${code} ${tel} (${pref})`;
                            } else {
                                document.getElementById('sum-telefono').innerText = 'No proporcionado';
                            }

                            // Llenar correo condicional
                            if (checkCorreo.checked) {
                                document.getElementById('sum-correo').innerText = form.correo.value;
                            } else {
                                document.getElementById('sum-correo').innerText = 'No proporcionado';
                            }

                            // Llenar eventos y mensaje
                            let eventosArr = [];
                            checkboxes.forEach(chk => eventosArr.push(chk.value));
                            document.getElementById('sum-eventos').innerText = eventosArr.join(', ');
                            document.getElementById('sum-mensaje').innerText = form.mensaje.value;

                            // Animar la salida del Paso 3 y la entrada del Resumen + Botones Globales
                            gsap.to(currentStepDiv, {
                                opacity: 0, y: -20, duration: 0.4,
                                onComplete: () => {
                                    currentStepDiv.style.display = 'none';

                                    summaryDiv.style.display = 'block';
                                    globalActions.style.display = 'flex'; // Mostramos el área de botones
                                    document.getElementById('btn-edit').style.display = 'block'; // Aseguramos que el botón editar esté visible

                                    gsap.fromTo([summaryDiv, globalActions], {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.5, stagger: 0.2});
                                }
                            });
                        });

                        // --- MODO EDICIÓN (Muestra todo) ---
                        btnEdit.addEventListener('click', function() {
                            const summaryDiv = document.getElementById('step-summary');
                            const globalActions = document.getElementById('global-actions');
                            const step1 = document.getElementById('step-1');
                            const step2 = document.getElementById('step-2');
                            const step3 = document.getElementById('step-3');

                            // Hacemos que el resumen desaparezca
                            gsap.to(summaryDiv, {
                                opacity: 0, y: 20, duration: 0.4,
                                onComplete: () => {
                                    summaryDiv.style.display = 'none';

                                    // 1. Ocultamos TODAS las flechas y botones de "siguiente" usando CSS forzado
                                    document.querySelectorAll('.step-actions').forEach(el => {
                                        el.style.setProperty('display', 'none', 'important');
                                    });

                                    // 2. Mostramos todos los contenedores de inputs a la vez
                                    [step1, step2, step3].forEach(step => step.style.display = 'block');

                                    // 3. Ocultamos el botón de editar (porque ya estamos editando)
                                    document.getElementById('btn-edit').style.display = 'none';

                                    // 4. Cambiamos el texto del botón de envío para dar más claridad (opcional)
                                    document.getElementById('btn-submit').innerText = '[ GUARDAR Y ENVIAR ]';

                                    // Animar la aparición de todos los campos juntos
                                    gsap.fromTo([step1, step2, step3, globalActions], {opacity: 0}, {opacity: 1, duration: 0.8, stagger: 0.1});
                                }
                            });
                        });

                // --- ENVÍO FINAL ---
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    alert('¡Transmisión enviada con éxito! Iniciando secuencia de contacto...');
                    // form.submit(); // Descomenta cuando conectes tu backend
                });
            }

}); // AQUÍ CIERRA EL DOMContentLoaded

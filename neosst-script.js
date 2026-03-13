// Tab Switching Logic
function openTab(evt, tabName) {
    // Hide all tab content by removing active class
    var i, tabContent, tabBtns;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].classList.remove("active");
        // We handle display via CSS class strictly now
    }

    // Remove active class from all buttons
    tabBtns = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tabBtns.length; i++) {
        tabBtns[i].className = tabBtns[i].className.replace(" active", "");
    }

    // Show the current tab
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.className += " active";
}

// Ensure first tab is open by default
document.addEventListener("DOMContentLoaded", function () {
    // Manually trigger the first tab active state if not already set
    var firstTab = document.getElementById("sg-sst");
    if (firstTab && !firstTab.classList.contains("active")) {
        firstTab.classList.add("active");
    }
    reveal(); // Trigger reveal on load

    // Handle Contact Form Submission via WhatsApp
    var contactForm = document.getElementById("advancedContactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Prevent default page reload

            // Get form values
            var empresa = document.getElementById("empresa").value;
            var servicio = document.getElementById("servicio").value;
            var reto = document.getElementById("reto").value;

            // Construct WhatsApp Message
            var phoneNumber = "573183903019"; // Without '+' for wa.me link
            var message = `¡Hola Johan! Estoy interesado en una asesoría para mi empresa.\n\n` +
                          `🏢 *Empresa / Contacto:* ${empresa}\n` +
                          `🛠️ *Servicio de Interés:* ${servicio}\n` +
                          `🎯 *Nuestro mayor reto hoy es:* ${reto}\n\n` +
                          `Quedo atento a su respuesta.`;

            // Encode message for URL
            var encodedMessage = encodeURIComponent(message);

            // Redirect to WhatsApp
            var whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    }
});

// Scroll Reveal Animation
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

    // Budget Calculator Logic
document.addEventListener("DOMContentLoaded", function () {
    const calcEmployeesBtns = document.querySelectorAll('#calc-employees .calc-btn');
    const calcRiskBtns = document.querySelectorAll('#calc-risk .calc-btn');
    const btnCalculate = document.getElementById('btn-calculate');
    const btnRecalculate = document.getElementById('btn-recalculate');
    
    const formSection = document.getElementById('calc-form');
    const resultSection = document.getElementById('calc-result');
    
    const resultPlanName = document.getElementById('result-plan-name');
    const resultFeatures = document.getElementById('result-features');
    const resultPriceContainer = document.getElementById('result-price-container');
    const resultPriceInitial = document.getElementById('result-price-initial');
    const resultPriceMonthly = document.getElementById('result-price-monthly');
    const resultCta = document.getElementById('result-cta');

    let selectedEmployees = '1-2'; // Default
    let selectedRisk = 'Bajo'; // Default

    // Handle button selections
    function handleSelection(btns, type) {
        btns.forEach(btn => {
            btn.addEventListener('click', function() {
                btns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                if (type === 'employees') {
                    selectedEmployees = this.getAttribute('data-val');
                } else if (type === 'risk') {
                    selectedRisk = this.getAttribute('data-val');
                }
            });
        });
    }

    handleSelection(calcEmployeesBtns, 'employees');
    handleSelection(calcRiskBtns, 'risk');

    // Calculation Logic
    btnCalculate.addEventListener('click', function() {
        const inputName = document.getElementById('calc-name').value.trim();
        const inputPhone = document.getElementById('calc-phone').value.trim();

        if (!inputName || !inputPhone) {
            alert('Por favor, complete su nombre y número de WhatsApp para ver su plan ideal.');
            return;
        }

        let plan = '';
        let initialPrice = '';
        let monthlyPrice = '';
        let ctaText = 'Mandar WhatsApp y Recibir Cotización';
        let isCustom = false;
        let featuresHtml = '';

        // Formats numbers as COP
        const formatCOP = (num) => {
            return '$' + num.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".") + ' COP';
        };

        // Calculate based on new pricing data
        if (selectedRisk === 'Alto' || selectedEmployees === '21+') {
            plan = 'PLAN CORPORATIVO A MEDIDA';
            isCustom = true;
            initialPrice = 'Desde $2.500.000 COP';
            monthlyPrice = 'Desde ~' + formatCOP(1100000);
            featuresHtml = `
                <li><i class="fas fa-check-circle"></i> <span>Diseño e Implementación SG-SST completo</span></li>
                <li><i class="fas fa-check-circle"></i> <span>Administración in-house (min. 16h/mes)</span></li>
                <li><i class="fas fa-check-circle"></i> <span>Gestión avanzada de Tareas de Alto Riesgo (TAR)</span></li>
            `;
        } else {
            // Risk Bajo (I, II, III) and <= 20 employees
            isCustom = false;
            
            if (selectedEmployees === '1-2') {
                plan = 'PLAN MICRO (1-2 Emp)';
                initialPrice = formatCOP(690000) + ' + IVA';
                monthlyPrice = 'Consultar tarifa mensual'; // No explicit monthly rate for 1-2 in prompt, fall back to NA or custom 
            } else if (selectedEmployees === '3-5') {
                plan = 'PLAN MICRO (3-5 Emp)';
                initialPrice = formatCOP(960000) + ' + IVA';
                monthlyPrice = formatCOP(272000) + ' + IVA';
            } else if (selectedEmployees === '6-10') {
                plan = 'PLAN PEQUEÑA EMPRESA';
                initialPrice = formatCOP(1390000) + ' + IVA';
                monthlyPrice = formatCOP(344000) + ' + IVA';
            } else if (selectedEmployees === '11-15') {
                plan = 'PLAN PYME (11-15 Emp)';
                initialPrice = formatCOP(1990000) + ' + IVA';
                monthlyPrice = formatCOP(489000) + ' + IVA';
            } else if (selectedEmployees === '16-20') {
                plan = 'PLAN PYME (16-20 Emp)';
                initialPrice = 'Desde ' + formatCOP(1990000) + ' + IVA'; // Assuming base of Pyme or custom
                monthlyPrice = formatCOP(679000) + ' + IVA';
            }

            featuresHtml = `
                <li><i class="fas fa-check-circle"></i> <span>Diseño inicial: Diagnóstico, Matriz, Políticas</span></li>
                <li><i class="fas fa-check-circle"></i> <span>Administración: Outsourcing continuo del sistema</span></li>
                <li><i class="fas fa-check-circle"></i> <span>Cumplimiento Mensual de indicadores</span></li>
            `;
            
            // Fix missing monthly rate for 1-2 emp based on the "3-5" baseline
            if (selectedEmployees === '1-2') {
                monthlyPrice = 'Desde ' + formatCOP(272000) + ' + IVA';
            }
        }

        // Populate Result Card
        resultPlanName.textContent = plan;
        resultFeatures.innerHTML = featuresHtml;
        resultPriceInitial.textContent = initialPrice;
        resultPriceMonthly.textContent = monthlyPrice;
        resultCta.textContent = ctaText;
        
        // Update CTA WhatsApp message dynamically based on selection
        const message = encodeURIComponent(`Hola Johan, mi nombre es ${inputName} (WhatsApp: ${inputPhone}). Usé la calculadora de NeoSST y mi empresa (${selectedEmployees} empleados, riesgo ${selectedRisk}) requiere cotizar el ${plan}. Me gustaría conocer más detalles sobre los costos de implementación y administración.`);
        resultCta.href = `https://wa.me/573183903019?text=${message}`;

        // Switch Views with Animation
        formSection.style.opacity = 0;
        
        setTimeout(() => {
            formSection.classList.add('hidden');
            resultSection.classList.remove('hidden');
            
            // Force reflow
            void resultSection.offsetWidth;
            
            resultSection.classList.add('fade-in');
        }, 300); // Wait for opacity transition
    });

    // Recalculate Logic
    btnRecalculate.addEventListener('click', function() {
        resultSection.classList.remove('fade-in');
        resultSection.style.opacity = 0;
        
        setTimeout(() => {
            resultSection.classList.add('hidden');
            formSection.classList.remove('hidden');
            
            // Force reflow
            void formSection.offsetWidth;
            
            formSection.style.opacity = 1;
            resultSection.style.opacity = ''; // Reset inline style
        }, 300);
    });
});

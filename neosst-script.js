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
    const resultPrice = document.getElementById('result-price');
    const resultCta = document.getElementById('result-cta');

    let selectedEmployees = '1-10'; // Default
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
        let plan = '';
        let price = '';
        let ctaText = '';
        let featuresHtml = '';

        // Logic Evaluation
        if (selectedEmployees === '+50') {
            plan = 'PLAN PREMIUM';
        } else if (selectedEmployees === '11-50' && selectedRisk === 'Alto') {
            plan = 'PLAN PREMIUM';
        } else if (selectedEmployees === '11-50' && selectedRisk === 'Bajo') {
            plan = 'PLAN PROFESIONAL';
        } else if (selectedEmployees === '1-10' && selectedRisk === 'Alto') {
            plan = 'PLAN PROFESIONAL';
        } else {
            // 1-10 & Bajo
            plan = 'PLAN ESENCIAL';
        }

        // Output Generation based on Plan
        if (plan === 'PLAN ESENCIAL') {
            price = 'Desde $1.200.000 COP';
            ctaText = 'Contratar Ahora';
            featuresHtml = `
                <li><i class="fas fa-check-circle"></i> <span>Diseño documental SG-SST</span></li>
                <li><i class="fas fa-check-circle"></i> <span>Matriz legal básica</span></li>
                <li><i class="fas fa-check-circle"></i> <span>Plan de emergencias estándar</span></li>
            `;
            resultPriceContainer.style.display = 'block';
        } else if (plan === 'PLAN PROFESIONAL') {
            price = 'Desde $2.500.000 COP';
            ctaText = 'Contratar Ahora';
            featuresHtml = `
                <li><i class="fas fa-check-circle"></i> <span>Sistema Integral SG-SST + TAR</span></li>
                <li><i class="fas fa-check-circle"></i> <span>Acompañamiento comité paritario</span></li>
                <li><i class="fas fa-check-circle"></i> <span>Gestión de indicadores proactivos</span></li>
            `;
            resultPriceContainer.style.display = 'block';
        } else if (plan === 'PLAN PREMIUM') {
            price = ''; // No price for Premium
            ctaText = 'Solicitar Cotización Técnica';
            featuresHtml = `
                <li><i class="fas fa-check-circle"></i> <span>Administración total in-house</span></li>
                <li><i class="fas fa-check-circle"></i> <span>Auditorías RUC / ISO 45001</span></li>
                <li><i class="fas fa-check-circle"></i> <span>Medicina preventiva y epidemiología</span></li>
            `;
            resultPriceContainer.style.display = 'none'; // Hide price block
        }

        // Populate Result Card
        resultPlanName.textContent = plan;
        resultFeatures.innerHTML = featuresHtml;
        resultPrice.textContent = price;
        resultCta.textContent = ctaText;
        
        // Update CTA WhatsApp message dynamically based on selection
        const message = encodeURIComponent(`Hola, usé su calculadora y mi empresa (${selectedEmployees} empleados, riesgo ${selectedRisk}) requiere el ${plan}. Me gustaría ${ctaText.toLowerCase()}.`);
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

document.addEventListener('DOMContentLoaded', function() {
    // Прелоадер
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Бургер меню
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    
    burger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('nav__link')) {
                nav.classList.remove('active');
                burger.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Фиксация шапки при скролле
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Кнопка "Наверх"
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Анимация чисел в статистике
    const statNumbers = document.querySelectorAll('.stat-item__number');
    
    function animateNumbers() {
        statNumbers.forEach(number => {
            const target = +number.getAttribute('data-count');
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    number.textContent = target;
                } else {
                    number.textContent = Math.floor(current);
                }
            }, 16);
        });
    }
    
    // Запуск анимации при попадании в область видимости
    const aboutSection = document.querySelector('.about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(aboutSection);

    // Галерея сертификатов
    const certificates = document.querySelectorAll('.certificate');
    const modal = document.querySelector('.certificates__modal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.certificates__close');
    
    certificates.forEach(certificate => {
        certificate.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            modalImg.src = imgSrc;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Обработка формы
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь можно добавить отправку формы (AJAX, Fetch API и т.д.)
            alert('Спасибо! Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.');
            this.reset();
        });
    }

    // Анимация элементов при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .about__image, .certificate, .contact-item, .contacts__form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.animation = 'fadeIn 1s forwards';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Запустить при загрузке для видимых элементов
});
document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const consultBtn = document.getElementById('consultBtn');
    const modal = document.getElementById('consultModal');
    const closeBtn = document.querySelector('.modal__close');
    
    // Открываем модальное окно при клике на кнопку
    if(consultBtn) {
      consultBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    }
    
    // Закрываем при клике на крестик
    if(closeBtn) {
      closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }
    
    // Закрываем при клике вне окна
    window.addEventListener('click', function(e) {
      if(e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
    
    // Обработка формы и отправка на WhatsApp
    const consultForm = document.getElementById('consultForm');
    if(consultForm) {
      consultForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Берем значения
        const name = this.querySelector('input[type="text"]').value.trim();
        const phone = this.querySelector('input[type="tel"]').value.trim();
        const question = this.querySelector('textarea').value.trim();
        
        // Ваш номер WhatsApp (без +)
        const whatsappNumber = "77059119101";
        
        // Текст сообщения
        const message = `Здравствуйте, меня зовут ${name}.
Мой телефон: ${phone}.
Вопрос: ${question}`;
        
        // Переход на WhatsApp
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        
        // Закрываем модалку
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        this.reset();
      });
    }
});

  
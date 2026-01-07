// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : 
        '<i class="fas fa-bars"></i>';
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            if(mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Слайдшоу для игровых видео - последовательное воспроизведение
function startGamesSlider() {
    const slider = document.getElementById('gamesSlider');
    const slides = slider.querySelectorAll('.slide');
    const videos = slider.querySelectorAll('video');
    let currentIndex = 0;
    
    // Настраиваем все видео
    videos.forEach((video, index) => {
        video.loop = false;
        video.muted = true;
        video.preload = "auto";
        
        // Обработчик окончания видео
        video.addEventListener('ended', () => {
            nextVideo();
        });
        
        // Обработчик ошибок
        video.addEventListener('error', () => {
            console.error(`Ошибка загрузки видео ${index + 1}`);
            nextVideo();
        });
    });
    
    // Функция переключения на следующее видео
    function nextVideo() {
        // Скрываем текущее видео
        slides[currentIndex].classList.remove('active');
        videos[currentIndex].pause();
        
        // Переходим к следующему видео
        currentIndex = (currentIndex + 1) % slides.length;
        
        // Показываем следующее видео
        slides[currentIndex].classList.add('active');
        
        // Сбрасываем время и воспроизводим следующее видео
        const nextVideo = videos[currentIndex];
        nextVideo.currentTime = 0;
        
        // Пытаемся воспроизвести видео
        const playPromise = nextVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Автовоспроизведение заблокировано");
                // Если автовоспроизведение заблокировано, показываем controls
                nextVideo.controls = true;
            });
        }
    }
    
    // Начинаем воспроизведение первого видео
    if (videos.length > 0) {
        const playPromise = videos[0].play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Автовоспроизведение первого видео заблокировано");
                videos[0].controls = true;
            });
        }
    }
    
    // Переключаем видео при клике
    slider.addEventListener('click', () => {
        nextVideo();
    });
}

// Автослайдшоу для интерьеров
function startInteriorSlider() {
    const slides = document.querySelectorAll('#interiorSlider .slide');
    let currentSlide = 0;
    
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4000);
}

// Автослайдшоу для сайтов
function startSitesSlider() {
    const slides = document.querySelectorAll('#sitesSlider .slide');
    if (slides.length > 1) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 4000);
    }
}

// Запускаем все слайдеры после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    startGamesSlider();
    startInteriorSlider();
    startSitesSlider();
});
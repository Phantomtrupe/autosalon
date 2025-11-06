function lpCheckMediaQuery() {
    const mediaXl = window.matchMedia("(min-width: 1280px)");
    const mediaLg = window.matchMedia("(min-width: 992px) and (max-width: 1279px)");
    const mediaMd = window.matchMedia("(min-width: 768px) and (max-width: 991px)");
    const mediaSm = window.matchMedia("(min-width: 480px) and (max-width: 767px)");
    const mediaXs = window.matchMedia("(max-width: 479px)");

    if (mediaXs.matches) {
        document.documentElement.setAttribute("data-media-source", "media-xs");
    } else if (mediaSm.matches) {
        document.documentElement.setAttribute("data-media-source", "media-sm");
    } else if (mediaMd.matches) {
        document.documentElement.setAttribute("data-media-source", "media-md");
    } else if (mediaLg.matches) {
        document.documentElement.setAttribute("data-media-source", "media-lg");
    } else if (mediaXl.matches) {
        document.documentElement.setAttribute("data-media-source", "media-xl");
    }
}

// Троттлинг
function lpThrottle(func, limit) {
    let timer;
    return function() {
        if (!timer) {
            timer = setTimeout(() => {
                func();
                timer = null;
            }, limit);
        }
    };
}

// Запуск функции при загрузке страницы
lpCheckMediaQuery();

// Добавление обработчика resize с троттлингом
const lpThrottledResize = lpThrottle(lpCheckMediaQuery, 100); // вызов каждые 100 миллисекунд
window.addEventListener('resize', lpThrottledResize);
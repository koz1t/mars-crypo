import SmoothScroll from "smoothscroll-for-websites";

export function smoothScroll() {
  SmoothScroll({
    animationTime: 1000, // Увеличение времени анимации
    stepSize: 100, // Меньший шаг прокрутки
  });
}

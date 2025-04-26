export function dataCounter() {
  const counters = document.querySelectorAll("[data-counter]");

  function formatNumber(number) {
    return number.toLocaleString("en-US"); // Форматирование с запятыми
  }

  function startCounting(element) {
    let target = parseInt(element.getAttribute("data-counter").replace(/,/g, ""), 10);
    let count = 0;
    let duration = 2500; // Время анимации 
    let intervalTime = 20; // Частота обновления (каждые 20ms)
    let steps = duration / intervalTime; // Количество шагов
    let step = target / steps; // Вычисляем точный прирост числа на каждом шаге

    let interval = setInterval(() => {
      count += step;
      element.textContent = formatNumber(Math.floor(count)); // Округляем и форматируем
      if (count >= target) {
        element.textContent = formatNumber(target); // Фиксируем финальное значение
        clearInterval(interval);
      }
    }, intervalTime);
  }

  function checkVisibility() {
    counters.forEach(counter => {
      const rect = counter.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight - 100 && rect.bottom > 100) {
        if (!counter.classList.contains("counting-started")) {
          counter.classList.add("counting-started");
          startCounting(counter);
        }
      }
    });
  }

  window.addEventListener("scroll", checkVisibility);
  window.addEventListener("resize", checkVisibility);
  checkVisibility();
}

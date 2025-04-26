export function scrollTrigger() {
  const elements = document.querySelectorAll(".an1t");

  function checkVisibility() {
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
  
      // Добавляем задержку в 100px перед появлением
      if (rect.top < windowHeight - 100 && rect.bottom > 100) {
        element.classList.add("an1t--visible");
      }
    });
  }
  
  // Проверяем элементы при прокрутке и загрузке страницы
  window.addEventListener("scroll", checkVisibility);
  window.addEventListener("resize", checkVisibility);
  checkVisibility();
  
}
import { Skroll } from './vendors/skroll.min.js';

export function scrollAnimationInit() {
  new Skroll({
      mobile:true
    })
    .add(".cards__item",{
      animation:"fadeInUp",
      delay:120,
      duration:600,
      wait:250
    })
    .add(".about-section__text.text > *",{
      animation:"growInRight",
      delay:80,
      duration:500,
      easing:"cubic-bezier(0.37, 0.27, 0.24, 1.26)",
    })
    .add(".hero-section__btn",{
      animation:"fadeInDown",
      delay:200,
      duration:700,
      triggerBottom:1,
      easing:"cubic-bezier(0.37, 0.27, 0.24, 1.26)"
    })
    .add(".chart__value, .accordion__item",{
      animation:"growInLeft",
      delay:80,
      duration:500,
      easing:"cubic-bezier(0.37, 0.27, 0.24, 1.26)"
    })
    .add(".review__text",{
      animation:"growInRight",
      delay:100,
      duration:1000,
      easing:"cubic-bezier(0.37, 0.27, 0.24, 1.26)",
    })
    .add(".chart-section__title, .roadmap-section__title, .contacts-section__title, .faq-section__title",{
      animation:"zoomIn",
      duration:600
    })
    .init();
}
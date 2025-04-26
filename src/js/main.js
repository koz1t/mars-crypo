import '../scss/style.scss'

import { scrollAnimationInit } from './_scrollAnimationInit.js'; 
import { scrollTrigger } from './_scrollTrigger.js'
import { dataCounter }   from './_dataCounter.js'
import { anchorScroll }   from './_anchorScroll.js'
import { smoothScroll }   from './_smoothScroll.js'

document.addEventListener('DOMContentLoaded', function() {
  scrollAnimationInit();
  scrollTrigger();
  dataCounter();
  anchorScroll();
  smoothScroll();
})
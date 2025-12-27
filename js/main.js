/**
 * SAOTOME GLOBAL ACADEMY 早乙女塾
 * JavaScript v6.0
 * 
 * NOTE: Language class (.en) is already set by synchronous script in <head>
 * This file handles toggle interactions and other UI
 */

(function() {
  'use strict';
  
  const LANG_KEY = 'sga-lang-v6';

  // ═══════════════════════════════════════════════════════════════
  // LANGUAGE TOGGLE (toggle buttons only - class already set in head)
  // ═══════════════════════════════════════════════════════════════
  const Lang = {
    init() {
      // Check current state from html class
      const isEn = document.documentElement.classList.contains('en');
      this.updateButtons(isEn ? 'en' : 'ja');
      this.bindEvents();
    },
    
    setLanguage(lang) {
      if (lang === 'en') {
        document.documentElement.classList.add('en');
        localStorage.setItem(LANG_KEY, 'en');
      } else {
        document.documentElement.classList.remove('en');
        localStorage.setItem(LANG_KEY, 'ja');
      }
      this.updateButtons(lang);
    },
    
    updateButtons(lang) {
      document.querySelectorAll('.lang-switch button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
      });
    },
    
    bindEvents() {
      document.querySelectorAll('.lang-switch button').forEach(btn => {
        btn.addEventListener('click', () => {
          this.setLanguage(btn.dataset.lang);
        });
      });
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // MOBILE MENU
  // ═══════════════════════════════════════════════════════════════
  const MobileMenu = {
    btn: null,
    nav: null,
    isOpen: false,
    
    init() {
      this.btn = document.querySelector('.menu-btn');
      this.nav = document.querySelector('.mobile-nav');
      if (!this.btn || !this.nav) return;
      
      this.btn.addEventListener('click', () => this.toggle());
      
      // Close on link click
      this.nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => this.close());
      });
      
      // Close on escape
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && this.isOpen) this.close();
      });
    },
    
    toggle() {
      this.isOpen ? this.close() : this.open();
    },
    
    open() {
      this.isOpen = true;
      this.btn.classList.add('open');
      this.nav.classList.add('open');
      document.body.style.overflow = 'hidden';
    },
    
    close() {
      this.isOpen = false;
      this.btn.classList.remove('open');
      this.nav.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // SCROLL ANIMATIONS
  // ═══════════════════════════════════════════════════════════════
  const ScrollAnimations = {
    init() {
      const els = document.querySelectorAll('.animate');
      if (!els.length) return;
      
      // Respect reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        els.forEach(el => el.classList.add('visible'));
        return;
      }
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      
      els.forEach(el => observer.observe(el));
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // CONTACT FORM
  // ═══════════════════════════════════════════════════════════════
  const ContactForm = {
    init() {
      const form = document.querySelector('.contact-form');
      if (!form) return;
      
      form.addEventListener('submit', e => {
        e.preventDefault();
        const fd = new FormData(form);
        const subject = fd.get('subject') || 'お問い合わせ / Inquiry';
        const body = `お名前 / Name: ${fd.get('name')}\nメール / Email: ${fd.get('email')}\n\n${fd.get('message')}`;
        window.location.href = `mailto:ryohsaotome@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      });
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // INITIALIZATION
  // ═══════════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', () => {
    Lang.init();
    MobileMenu.init();
    ScrollAnimations.init();
    ContactForm.init();
  });
})();

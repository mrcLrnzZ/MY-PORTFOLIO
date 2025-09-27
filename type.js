 const typed = new Typed('#typed', {
  stringsElement: '#typed-strings',
  typeSpeed: 40,
  backDelay: 1000,
  loop: true,
  cursorChar: '_'
});

  const menuBtn = document.getElementById('btn');
            const closeMenuBtn = document.getElementById('closeMenu');
            const mobileMenu = document.getElementById('menu');
            const overlay = document.getElementById('overlay');
            const body = document.body;

            let isMenuOpen = false;

            function toggleMenu() {
                isMenuOpen = !isMenuOpen;
                
                if (isMenuOpen) {
                    openMenu();
                } else {
                    closeMenu();
                }
            }

            function openMenu() {
                mobileMenu.classList.remove('translate-x-full');
                overlay.classList.remove('hidden');
                body.style.overflow = 'hidden'; // Prevent background scrolling
                isMenuOpen = true;
                
                const menuItems = mobileMenu.querySelectorAll('a');
                menuItems.forEach((item, index) => {
                    item.style.animationDelay = `${index * 0.1}s`;
                    item.classList.add('animate-slideInRight');
                });
            }

            function closeMenu() {
                mobileMenu.classList.add('translate-x-full');
                overlay.classList.add('hidden');
                body.style.overflow = 'auto'; // Restore scrolling
                isMenuOpen = false;
                
                const menuItems = mobileMenu.querySelectorAll('a');
                menuItems.forEach(item => {
                    item.classList.remove('animate-slideInRight');
                });
            }

            menuBtn.addEventListener('click', toggleMenu);
            closeMenuBtn.addEventListener('click', closeMenu);
            overlay.addEventListener('click', closeMenu);

            const menuLinks = mobileMenu.querySelectorAll('a');
            menuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    closeMenu();
                });
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && isMenuOpen) {
                    closeMenu();
                }
            });

            window.addEventListener('resize', () => {
                if (window.innerWidth >= 640 && isMenuOpen) { // sm breakpoint
                    closeMenu();
                }
            });

            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            
// Enhanced Modal System
const form = document.querySelector("form");
const successModal = document.getElementById("successModal");
const errorModal = document.getElementById("errorModal");
const loadingModal = document.getElementById("loadingModal");
const closeModal = document.getElementById("closeModal");
const closeErrorModal = document.getElementById("closeErrorModal");
const sendAnother = document.getElementById("sendAnother");
const retrySend = document.getElementById("retrySend");

// Modal Management Functions
function showModal(modal) {
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function hideModal(modal) {
  const content = modal.querySelector('.modal-content');
  const overlay = modal;
  
  content.classList.add('closing');
  overlay.classList.add('closing');
  
  setTimeout(() => {
    modal.classList.add("hidden");
    content.classList.remove('closing');
    overlay.classList.remove('closing');
    document.body.style.overflow = "auto"; // Restore scrolling
  }, 300);
}

function showLoading() {
  showModal(loadingModal);
}

function hideLoading() {
  hideModal(loadingModal);
}

// Form Submission with Enhanced UX
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  
  // Show loading modal
  showLoading();
  
  // Disable form during submission
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  
  try {
    let formData = new FormData(form);
    
    // Add a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      form.reset();
      hideLoading();
      showModal(successModal);
      
      // Add success icon animation
      const successIcon = successModal.querySelector('.w-20.h-20');
      successIcon.classList.add('success-icon');
    } else {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Form submission error:', error);
    hideLoading();
    showModal(errorModal);
  } finally {
    // Re-enable form
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});

// Modal Event Listeners
closeModal.addEventListener("click", () => {
  hideModal(successModal);
});

closeErrorModal.addEventListener("click", () => {
  hideModal(errorModal);
});

sendAnother.addEventListener("click", () => {
  hideModal(successModal);
  // Focus on first input
  form.querySelector('input').focus();
});

retrySend.addEventListener("click", () => {
  hideModal(errorModal);
  // Trigger form submission again
  form.dispatchEvent(new Event('submit'));
});

// Close modals when clicking outside
[successModal, errorModal, loadingModal].forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      hideModal(modal);
    }
  });
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (!successModal.classList.contains("hidden")) {
      hideModal(successModal);
    } else if (!errorModal.classList.contains("hidden")) {
      hideModal(errorModal);
    } else if (!loadingModal.classList.contains("hidden")) {
      // Don't allow closing loading modal with escape
      return;
    }
  }
});

// Auto-close success modal after 5 seconds
let autoCloseTimer;
successModal.addEventListener("animationend", () => {
  if (!successModal.classList.contains("hidden")) {
    autoCloseTimer = setTimeout(() => {
      hideModal(successModal);
    }, 5000);
  }
});

// Clear timer when modal is manually closed
[closeModal, sendAnother].forEach(button => {
  button.addEventListener("click", () => {
    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
    }
  });
});

// Form validation enhancement
const inputs = form.querySelectorAll('input, textarea');
inputs.forEach(input => {
  input.addEventListener('blur', () => {
    if (input.checkValidity()) {
      input.classList.add('border-green-400');
      input.classList.remove('border-red-400');
    } else {
      input.classList.add('border-red-400');
      input.classList.remove('border-green-400');
    }
  });
  
  input.addEventListener('input', () => {
    if (input.checkValidity()) {
      input.classList.add('border-green-400');
      input.classList.remove('border-red-400');
    }
  });
});


        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe all elements with scroll-animate class
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.scroll-animate');
            animatedElements.forEach(el => {
                observer.observe(el);
            });
        });

        // Reset animations on scroll to top (optional)
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Reset animations when scrolling up significantly
            if (scrollTop < lastScrollTop - 100) {
                const animatedElements = document.querySelectorAll('.scroll-animate');
                animatedElements.forEach(el => {
                    if (el.getBoundingClientRect().top > window.innerHeight) {
                        el.classList.remove('animate');
                    }
                });
            }
            
            lastScrollTop = scrollTop;
        });
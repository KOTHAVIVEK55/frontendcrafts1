// Initialize floating background elements
function createFloatingElements() {
    const container = document.querySelector(".floating-background")
    if (!container) return
  
    // Create floating elements
    for (let i = 0; i < 30; i++) {
      const element = document.createElement("div")
      element.classList.add("floating-element")
  
      // Random size between 5px and 30px
      const size = Math.random() * 25 + 5
      element.style.width = `${size}px`
      element.style.height = `${size}px`
  
      // Random position
      element.style.left = `${Math.random() * 100}%`
      element.style.top = `${Math.random() * 100}%`
  
      // Random animation duration between 20s and 60s
      const duration = Math.random() * 40 + 20
      element.style.animationDuration = `${duration}s`
  
      // Random delay
      element.style.animationDelay = `${Math.random() * 10}s`
  
      // Random opacity
      element.style.opacity = `${Math.random() * 0.3 + 0.1}`
  
      // Add random rotation
      element.style.transform = `rotate(${Math.random() * 360}deg)`
  
      // Randomly choose between circle and square shapes
      if (Math.random() > 0.7) {
        element.style.borderRadius = "0"
      }
  
      container.appendChild(element)
    }
  
    // Add glowing particles
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement("div")
      particle.classList.add("glowing-particle")
  
      const size = Math.random() * 6 + 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
  
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`
  
      const duration = Math.random() * 20 + 10
      particle.style.animationDuration = `${duration}s`
  
      particle.style.animationDelay = `${Math.random() * 5}s`
  
      container.appendChild(particle)
    }
  }
  
  // Handle header scroll effect with subtle parallax
  function handleScroll() {
    const header = document.querySelector(".header")
    const scrollY = window.scrollY
  
    if (scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  
    // Animate sections when they come into view
    animateOnScroll()
  }
  
  // Service card hover effects with 3D tilt
  function setupServiceCards() {
    const serviceCards = document.querySelectorAll(".service-card")
    const hero = document.getElementById("hero")
    let activeIndex = null
    let mousePosition = { x: 0, y: 0 }
  
    serviceCards.forEach((card, index) => {
      card.addEventListener("mouseenter", () => {
        activeIndex = index
        updateCardStyles()
      })
  
      card.addEventListener("mouseleave", () => {
        activeIndex = null
        updateCardStyles()
        card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)"
      })
  
      // Add 3D tilt effect
      card.addEventListener("mousemove", (e) => {
        const cardRect = card.getBoundingClientRect()
        const cardCenterX = cardRect.left + cardRect.width / 2
        const cardCenterY = cardRect.top + cardRect.height / 2
  
        const angleX = (e.clientY - cardCenterY) / 25
        const angleY = (cardCenterX - e.clientX) / 25
  
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`
      })
    })
  
    if (hero) {
      hero.addEventListener("mousemove", (e) => {
        const rect = hero.getBoundingClientRect()
        mousePosition = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        }
        updateCardTransform()
      })
    }
  
    function updateCardStyles() {
      serviceCards.forEach((card, index) => {
        const imageContainer = card.querySelector(".service-image-container")
        const image = card.querySelector(".service-image")
        const outline = card.querySelector(".service-outline")
        const title = card.querySelector(".service-title")
        const description = card.querySelector(".service-description")
  
        if (activeIndex === index) {
          image.style.opacity = "1"
          image.style.transform = "scale(1.05)"
          title.style.color = "var(--green-400)"
          title.style.transform = "translateY(0)"
          description.style.opacity = "1"
          description.style.transform = "translateY(0)"
  
          // Add neon glow effect
          outline.style.opacity = "1"
          outline.style.boxShadow = "0 0 15px var(--green-400), 0 0 30px rgba(74, 222, 128, 0.3)"
        } else if (activeIndex !== null) {
          outline.style.opacity = "1"
          image.style.opacity = "0.7"
          image.style.transform = "scale(1)"
          title.style.color = "var(--white)"
          title.style.transform = "translateY(1rem)"
          description.style.opacity = "0"
          description.style.transform = "translateY(2rem)"
          outline.style.boxShadow = "none"
        } else {
          outline.style.opacity = "0"
          image.style.opacity = "0.7"
          image.style.transform = "scale(1)"
          title.style.color = "var(--white)"
          title.style.transform = "translateY(1rem)"
          description.style.opacity = "0"
          description.style.transform = "translateY(2rem)"
          outline.style.boxShadow = "none"
        }
      })
    }
  
    function updateCardTransform() {
      if (activeIndex === null) return
  
      const card = serviceCards[activeIndex]
      if (!card) return
  
      // Calculate a subtle movement based on mouse position
      const maxMovement = 20 // max pixels to move
      const heroWidth = hero.offsetWidth || 1
      const heroHeight = hero.offsetHeight || 1
  
      const xPercent = mousePosition.x / heroWidth - 0.5
      const yPercent = mousePosition.y / heroHeight - 0.5
  
      const xMove = xPercent * maxMovement
      const yMove = yPercent * maxMovement
  
      card.style.transform = `perspective(1000px) translate(${xMove}px, ${yMove}px) rotateX(${yPercent * -5}deg) rotateY(${xPercent * 5}deg)`
    }
  }
  
  // Handle contact form submission with animated feedback
  function setupContactForm() {
    const contactForm = document.getElementById("contactForm")
    const formSuccess = document.getElementById("formSuccess")
    const sendAnother = document.getElementById("sendAnother")
    const submitButton = document.querySelector(".submit-button")
  
    if (submitButton) {
      // Add loading animation to button
      submitButton.addEventListener("mouseenter", () => {
        submitButton.classList.add("button-pulse")
      })
  
      submitButton.addEventListener("mouseleave", () => {
        submitButton.classList.remove("button-pulse")
      })
    }
  
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Add loading animation
        submitButton.innerHTML = '<span class="loading-spinner"></span><span>Sending...</span>'
        contactForm.style.opacity = "0.7"
        contactForm.style.pointerEvents = "none"
  
        // Show success message after a delay
        setTimeout(() => {
          contactForm.style.display = "none"
          formSuccess.style.display = "block"
  
          // Add entrance animation for success message
          formSuccess.classList.add("success-animate")
  
          // Reset form
          contactForm.reset()
          contactForm.style.opacity = "1"
          contactForm.style.pointerEvents = "auto"
          submitButton.innerHTML =
            '<span>Send Message</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="send-icon"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>'
        }, 1500)
      })
    }
  
    if (sendAnother) {
      sendAnother.addEventListener("click", () => {
        formSuccess.classList.remove("success-animate")
        formSuccess.style.display = "none"
        contactForm.style.display = "flex"
      })
    }
  }
  
  // Set current year in footer
  function setCurrentYear() {
    const yearElement = document.getElementById("currentYear")
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear()
    }
  }
  
  // Initialize animations for elements when they come into view
  function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      ".vision-content, .vision-image-container, .trust-content, .projects-header, .project-card, .team-member, .stat-card",
    )
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
  
            // Add counter animation for stat numbers
            if (entry.target.classList.contains("stat-card")) {
              const statNumber = entry.target.querySelector(".stat-number")
              if (statNumber) {
                animateCounter(statNumber)
              }
            }
          }
        })
      },
      { threshold: 0.2 },
    )
  
    animatedElements.forEach((element, index) => {
      element.classList.add("will-animate")
      element.style.transitionDelay = `${index * 0.1}s`
      observer.observe(element)
    })
  }
  
  // Animate counter for statistics
  function animateCounter(element) {
    const target = Number.parseInt(element.textContent)
    const suffix = element.textContent.replace(/[0-9]/g, "")
    const duration = 2000
    const step = 30
    let current = 0
  
    const timer = setInterval(() => {
      current += target / (duration / step)
      if (current >= target) {
        clearInterval(timer)
        current = target
      }
      element.textContent = Math.floor(current) + suffix
    }, step)
  }
  
  // Add 3D card effect to project cards
  function setup3DCards() {
    const cards = document.querySelectorAll(".project-card")
  
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
  
        const centerX = rect.width / 2
        const centerY = rect.height / 2
  
        const angleX = (y - centerY) / 30
        const angleY = (centerX - x) / 30
  
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`
      })
  
      card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)"
      })
    })
  }
  
  // Function to animate elements on scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll(".stat-card, .project-card, .team-member, .vision-content, .trust-content")
  
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementBottom = element.getBoundingClientRect().bottom
      const isVisible = elementTop < window.innerHeight && elementBottom > 0
  
      if (isVisible) {
        element.classList.add("in-view")
      }
    })
  }
  
  // Add CSS for scroll animations
  function addAnimationStyles() {
    const style = document.createElement("style")
    style.textContent = `
          .will-animate {
              opacity: 0;
              transform: translateY(30px);
              transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          }
          .animate-in {
              opacity: 1;
              transform: translateY(0);
          }
      `
    document.head.appendChild(style)
  }
  
  // Setup custom cursor with smooth transitions
  function setupCustomCursor() {
    const cursor = document.querySelector(".custom-cursor")
    const cursorDot = document.querySelector(".cursor-dot")
    const cursorOutline = document.querySelector(".cursor-outline")
    const trail = document.querySelector(".mouse-trail")
  
    if (!cursor || !trail) return
  
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let trailX = 0
    let trailY = 0
  
    // Smooth cursor animation
    function animateCursor() {
      // Smooth follow with lerp (linear interpolation)
      const ease = 0.2
  
      cursorX += (mouseX - cursorX) * ease
      cursorY += (mouseY - cursorY) * ease
  
      // Slightly delayed trail
      trailX += (mouseX - trailX) * 0.1
      trailY += (mouseY - trailY) * 0.1
  
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`
      trail.style.left = `${trailX}px`
      trail.style.top = `${trailY}px`
  
      requestAnimationFrame(animateCursor)
    }
  
    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
  
      // Activate trail
      trail.classList.add("trail-active")
      setTimeout(() => {
        trail.classList.remove("trail-active")
      }, 100)
    })
  
    // Change cursor style on interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .service-card, .project-card, .team-member")
  
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(1.5)"
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)"
        cursorOutline.style.opacity = "0.2"
      })
  
      el.addEventListener("mouseleave", () => {
        cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"
        cursorOutline.style.opacity = "0.5"
      })
    })
  
    // Start animation
    animateCursor()
  
    // Handle cursor on page load and leave
    document.addEventListener("mouseenter", () => {
      cursor.style.opacity = "1"
      trail.style.opacity = "1"
    })
  
    document.addEventListener("mouseleave", () => {
      cursor.style.opacity = "0"
      trail.style.opacity = "0"
    })
  
    // Handle cursor on click
    document.addEventListener("mousedown", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(0.7)"
      cursorOutline.style.transform = "translate(-50%, -50%) scale(0.7)"
    })
  
    document.addEventListener("mouseup", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(1)"
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1)"
    })
  }
  
  // Initialize everything when the DOM is loaded
  document.addEventListener("DOMContentLoaded", () => {
    createFloatingElements()
    window.addEventListener("scroll", handleScroll)
    setupServiceCards()
    setupContactForm()
    setCurrentYear()
    addAnimationStyles()
    setupScrollAnimations()
    setup3DCards()
    setupCustomCursor()
  
    // Trigger initial scroll check
    handleScroll()
  })
  
  

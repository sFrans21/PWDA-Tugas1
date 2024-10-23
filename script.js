document.addEventListener("DOMContentLoaded", () => {
  // Testimonial data
  const testimonials = [
    {
      name: "John Doe",
      text: "The Odin Project helped me land my first job as a web developer. The curriculum is comprehensive and the community is super supportive!",
    },
    {
      name: "Jane Smith",
      text: "I love how The Odin Project focuses on practical skills. The projects really helped me build a strong portfolio.",
    },
    {
      name: "Mike Johnson",
      text: "The best part about The Odin Project is that it's completely free. I couldn't afford a bootcamp, but this gave me all the skills I needed.",
    },
  ];

  // Function to create testimonial cards
  function createTestimonialCard(testimonial) {
    const card = document.createElement("div");
    card.classList.add("testimonial-card");

    const text = document.createElement("p");
    text.textContent = testimonial.text;

    const name = document.createElement("h4");
    name.textContent = testimonial.name;

    card.appendChild(text);
    card.appendChild(name);

    return card;
  }

  // Add testimonial cards to the page
  const testimonialContainer = document.querySelector(".testimonial-cards");
  testimonials.forEach((testimonial) => {
    const card = createTestimonialCard(testimonial);
    testimonialContainer.appendChild(card);
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Toggle active class on navigation links
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Simple form validation for sign up (you would typically handle this server-side as well)
  const signUpButton = document.querySelector(".sign-up");
  signUpButton.addEventListener("click", () => {
    const email = prompt("Enter your email to sign up:");
    if (email && email.includes("@") && email.includes(".")) {
      alert("Thank you for signing up! Check your email for next steps.");
    } else {
      alert("Please enter a valid email address.");
    }
  });
});

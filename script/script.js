// ===============================
// Theme Toggle
// ===============================
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
    const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", mode);
  }
  
  function loadTheme() {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
    }
  }
  
  // ===============================
  // Email Validation
  // ===============================
  function setupEmailValidation() {
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    if (!emailInput || !emailError) return;
  
    emailInput.addEventListener("input", () => {
      const email = emailInput.value;
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      emailError.textContent = (!valid && email.length > 0)
        ? "Please enter a valid email address."
        : "";
    });
  }
  
  // ===============================
  // Word Count Limit
  // ===============================
  function setupWordCount() {
    const messageBox = document.getElementById("message");
    const wordCountDisplay = document.getElementById("word-count");
    const maxWords = 250;
  
    if (!messageBox || !wordCountDisplay) return;
  
    messageBox.addEventListener("input", () => {
      const words = messageBox.value.trim().split(/\s+/).filter(w => w.length > 0);
      const count = words.length;
      wordCountDisplay.textContent = `${count} / ${maxWords} words`;
      wordCountDisplay.style.color = count > maxWords ? "red" : "";
    });
  }
  
  // ===============================
  // Form Submission
  // ===============================
  function setupFormSubmission() {
    const form = document.getElementById("contact-form");
    const responseMsg = document.getElementById("form-response");
    const messageBox = document.getElementById("message");
    const maxWords = 250;
  
    if (!form || !responseMsg || !messageBox) return;
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const subject = form.querySelector("#subject")?.value.trim();
      if (!subject) {
        alert("Please enter a subject.");
        return;
      }
  
      const wordCount = messageBox.value.trim().split(/\s+/).filter(w => w.length > 0).length;
      if (wordCount > maxWords) {
        alert(`Please keep your message within ${maxWords} words.`);
        return;
      }
  
      try {
        const data = new FormData(form);
        const res = await fetch(form.action, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" }
        });
  
        if (res.ok) {
          form.reset();
          responseMsg.style.display = "block";
        } else {
          alert("Oops! There was a problem. Try again later.");
        }
      } catch (error) {
        alert("Network error. Please check your connection.");
      }
    });
  }
  
  // ===============================
  // DOM Ready
  // ===============================
  document.addEventListener("DOMContentLoaded", () => {
    loadTheme();
  
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) {
      themeToggle.addEventListener("click", toggleTheme);
    }
  
    setupEmailValidation();
    setupWordCount();
    setupFormSubmission();

    // Timeline card click logic
    document.querySelectorAll(".timeline-card").forEach(card => {
      card.addEventListener("click", () => {
        const title = card.dataset.title || "";
        const org = card.dataset.org || "";
        const loc = card.dataset.loc ? `📍 ${card.dataset.loc}` : "";
        const years = card.dataset.years || "";
        const rawDescription = card.dataset.description || "";

        // Convert \n bullets to list
        const bullets = rawDescription
          .split("\n")
          .filter(line => line.trim().length > 0)
          .map(b => `<li>${b.replace(/^[-•]\s*/, "")}</li>`)
          .join("");

        document.getElementById("modal-title").textContent = title;
        document.getElementById("modal-org").innerHTML = `${org}<br><span class="modal-loc">${loc}</span>`;
        document.getElementById("modal-years").textContent = years;
        document.getElementById("modal-description").innerHTML = `<ul>${bullets}</ul>`;

        document.getElementById("timeline-modal").classList.remove("hidden");
      });
    });

    document.getElementById("close-modal").addEventListener("click", () => {
      document.getElementById("timeline-modal").classList.add("hidden");
    });

    // Close modal when clicking outside of modal-content
    document.getElementById("timeline-modal").addEventListener("click", (e) => {
      const modalContent = document.querySelector(".modal-content");
      if (!modalContent.contains(e.target)) {
        document.getElementById("timeline-modal").classList.add("hidden");
      }
    });
    
  });
  
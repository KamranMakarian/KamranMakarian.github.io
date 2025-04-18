// ===============================
// 1. Project Data
// ===============================

const projects = [
    {
      title: "AI-Powered Resume Parsing RESTful API backend (2025)",
      description: "A demo project showcasing how to build a secure AI powered API that connects to a PostgreSQL database.",
      link: "https://github.com/KamranMakarian/AI-Powered_ResumeParser",
      tech: ["Java (Spring Boot)", "PostgreSQL", "OpenAI API"]
    },
    {
      title: "ML Modeling Assistant App (2024)",
      description: "A demo Java-based command-line tool that supports beginner machine learning practitioners with EDA, preprocessing, and model selection.",
      link: "https://github.com/KamranMakarian/ML_Modeling_Assistant_App",
      tech: ["Java"]
    },
    {
      title: "Geospatial Data Science for Solar Energy Optimization (2024)",
      description: "Supervised a development team to deliver actionable insights policymakers solar rebate distribution in Delaware.",
      link: "https://nbe-phase2.pages.dev/",
      tech: ["Geopandas", "Pygris", "Scikit-Learn", "Statsmodels", "Azure", "JavaScript", "CSS", "HTML"]
    },
    {
      title: "Energy Efficiency Investment Funds Across Delaware State (2023)",
      description: "Interactive geospatial dashboard to visualize historical distribution of Energy Efficiency Investment Fund grants across Delaware.",
      link: "https://dennis-dev.dsha-react.pages.dev/",
      tech: ["Geopandas", "Pygris", "JavaScript", "CSS", "HTML"]
    }
    // ,
    // {
    //   title: "Machine Learning for Advanced Manufacturing Process Optimization",
    //   description: "ML models for predicting fire certification test results, integrating time-series analysis, feature engineering, and statistical modeling.",
    //   link: "#",
    //   tech: ["Scipy", "Pandas", "Scikit-Learn"]
    // }
];
  
// ===============================
// 2. Render Function
// ===============================

function renderProjects(searchTerm = "") {
    const gallery = document.getElementById("project-gallery");
    if (!gallery) return;

    gallery.innerHTML = "";
  
    const filtered = projects.filter(project => {
        const combined = (
            project.title +
            project.description +
            project.tech.join(" ")
          ).toLowerCase();
      return combined.includes(searchTerm.toLowerCase());
    });

    if (filtered.length === 0) {
        gallery.innerHTML = "<p>No projects match your search.</p>";
        return;
    }
  
    filtered.forEach(project => {
      const card = document.createElement("div");
      card.classList.add("project-card");
  
      const techTags = project.tech
        .map(tag => `<span class="tag">${tag}</span>`)
        .join(" ");
  
      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tags">${techTags}</div>
        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="view-link" aria-label="View ${project.title} project on external site">View Project</a>
      `;
  
      gallery.appendChild(card);
    });
}
  
document.addEventListener("DOMContentLoaded", () => {
    renderProjects();
  
    const searchInput = document.getElementById("search-input");
    if (searchInput) {
      searchInput.addEventListener("keyup", (e) => {
        renderProjects(e.target.value);
      });
    }
  
    const clearBtn = document.getElementById("clear-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        renderProjects();
      });
    }
  });
  
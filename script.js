document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("projects.json");
    const projects = await response.json();
    const projectList = document.getElementById("project-list");
    const checkboxes = document.querySelectorAll(".filters input");
    function renderProjects(filteredProjects) {
        projectList.innerHTML = "";
        filteredProjects.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card";
            card.innerHTML = `
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">
                    <img src="${project.image}" alt="${project.title}"/>
                    <h4><strong>${project.title}</strong></h4>
                    <p>${project.description}</p>
                </a>
            `;
            projectList.appendChild(card);
        });
    }
    function filterProjects() {
    const selected = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    const isRecent = selected.includes("Recent");
    const techFilters = selected.filter(tag => tag !== "Recent");

    let filtered = projects;

    if (techFilters.length > 0) {
        filtered = projects.filter(project =>
        techFilters.some(tag => project.technologies.includes(tag))
        );
    }

    if (isRecent) {
        filtered = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    renderProjects(filtered);
    }


    checkboxes.forEach(cb => cb.addEventListener("change", filterProjects));

    renderProjects(projects); // Initial render
});

document.addEventListener('DOMContentLoaded', () => {
    const menu     = document.getElementById('mobile-menu');
    const openBtn  = document.getElementById('hamburger-btn');
    const closeBtn = document.getElementById('close-btn');
  openBtn.addEventListener('click', () => {
    menu.classList.add('open');
  });

  closeBtn.addEventListener('click', () => {
    menu.classList.remove('open');
  });
});
document.addEventListener('DOMContentLoaded', () => {
    const menu = document.getElementById('mobile-menu');
    const links = menu.querySelectorAll('a.nav-link, .contact-mobile a');
    links.forEach(link => {
        link.addEventListener('click', () => {
        menu.classList.remove('open');
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const logos = Array.from(
        document.querySelectorAll("#logo, #mobile-logo")
    );

    const darkSaved = localStorage.getItem("dark") === "true";
    if (darkSaved) {
        document.body.classList.add("dark-mode");
        logos.forEach(img => img.src = img.dataset.darkSrc);
    }

    logos.forEach(img =>
        img.addEventListener("click", e => {
        e.preventDefault();
        const nowDark = document.body.classList.toggle("dark-mode");
        localStorage.setItem("dark", nowDark);
        logos.forEach(i =>
            i.src = nowDark ? i.dataset.darkSrc : i.dataset.lightSrc
        );
        })
    );
});

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("projects.json");
  const projects = await response.json();
  const projectList = document.getElementById("project-list");
  const modal      = document.getElementById("project-modal");
  const img        = document.getElementById("modal-img");
  const title      = document.getElementById("modal-title");
  const desc       = document.getElementById("modal-desc");
  const tagsCont   = document.getElementById("modal-tags");
  const viewBtn    = document.getElementById("modal-view");
  const closeBtn   = document.getElementById("modal-close");

  function openModal(proj) {
    img.src       = proj.image;
    img.alt       = proj.title;
    title.textContent = proj.title;
    desc.textContent  = proj.extendedDescription || proj.description;
    // render tags
    tagsCont.innerHTML = "";
    (proj.tags || []).forEach(t => {
      const span = document.createElement("span");
      span.className = "tag";
      span.textContent = t;
      tagsCont.appendChild(span);
    });
    viewBtn.onclick = () => window.open(proj.link, "_blank");
    // show with animation
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  }

  // click outside content to close
  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });
  closeBtn.addEventListener("click", closeModal);

  function renderProjects(filteredProjects) {
    projectList.innerHTML = "";
    filteredProjects.forEach(proj => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.innerHTML = `
        <img src="${proj.image}" alt="${proj.title}"/>
        <h4><strong>${proj.title}</strong></h4>
        <p>${proj.description}</p>
      `;
      card.addEventListener("click", () => openModal(proj));
      projectList.appendChild(card);
    });
  }

  // ... (your existing filter code) ...
  renderProjects(projects);
});
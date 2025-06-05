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
            <img src="${project.image}" alt="${project.title}" />
            <h4><strong>${project.title}</strong></h4>
            <p>${project.description}</p>
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

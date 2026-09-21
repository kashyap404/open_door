document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.getElementById("projects");

    fetch("assets/data/projects.json")
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(projects => {
            projectsContainer.innerHTML = "";

            if (projects.length === 0) {
                projectsContainer.innerHTML = "<p class='loading'>No projects available.</p>";
                return;
            }

            projects.forEach((project, index) => {
                const item = document.createElement("a");
                item.href = `${project.link}/`;
                item.className = "project-item";
                
                // Formats index as 01, 02... 10, 11
                const indexStr = String(index + 1).padStart(2, '0');

                item.innerHTML = `
                    <span class="project-index">${indexStr}</span>
                    <span class="project-title">${project.title}</span>
                `;

                projectsContainer.appendChild(item);
            });
        })
        .catch(error => {
            console.error("Error fetching projects:", error);
            projectsContainer.innerHTML = "<p class='loading'>Failed to load projects.</p>";
        });
});
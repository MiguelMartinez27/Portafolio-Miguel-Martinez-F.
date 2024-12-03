// const githubUsername = "TU_USUARIO_DE_GITHUB";
const githubUsername = "Miguelmartinez27";
const projectContainer = document.getElementById("project-cards");

// Función para truncar texto
function truncateText(text, maxLength) {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

// Función para limitar los tópicos a un máximo de 4
function limitTopics(topics) {
  return topics
    .slice(0, 4)
    .map((topic) => `<span class="tag">${topic}</span>`)
    .join("");
}

// Función para cargar repositorios propios con tópicos
async function fetchUserRepos() {
  try {
    // Endpoint para obtener todos los repositorios del usuario
    const response = await fetch(
      `https://api.github.com/users/${githubUsername}/repos`
    );
    if (!response.ok) {
      throw new Error(
        `Error al conectar con la API de GitHub: ${response.status}`
      );
    }

    const repos = await response.json();

    // Procesar repositorios
    repos.forEach((repo) => {
      // Crear una tarjeta solo si tiene al menos un lenguaje asociado
      if (repo.topics && repo.topics.length > 0) {
        createProjectCard(repo);
      }
    });
  } catch (error) {
    console.error("Error al cargar los repositorios:", error);
    projectContainer.innerHTML = `<p>Error al cargar los proyectos. Por favor, inténtalo más tarde.</p>`;
  }
}

// Función para crear una tarjeta basada en tu diseño
function createProjectCard(repo) {
  const column = document.createElement("div");
  column.className = "column is-one-third";

  const truncatedDescription = truncateText(
    repo.description || "Sin descripción",
    100
  );

  // Obtener hasta 4 tópicos
  const limitedTopics = limitTopics(repo.topics || []);

  column.innerHTML = `
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">${repo.name}</p>
      </header>
      <div class="card-content">
        <div class="content">
          ${truncatedDescription}
          <div class="tags mt-4">
            ${limitedTopics}
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a href="${repo.html_url}" class="card-footer-item" target="_blank">Ver proyecto</a>
      </footer>
    </div>
  `;

  projectContainer.appendChild(column);
}

// Llamar a la función para cargar repositorios
fetchUserRepos();

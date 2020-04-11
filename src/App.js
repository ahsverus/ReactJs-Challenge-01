import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: "postProject",
      url: "github.com/postProject",
      techs: ["java", "spring"],
    });
    setProjects([...projects, response.data]);
  }

  async function handleRemoveRepository(id) {
    const repositorys = projects.filter((project) => project.id !== id);
    api.delete(`/repositories/${id}`);
    setProjects(repositorys);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map((project) => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
            </button>
          </li>
        ))}
        {/* <li>
          <button onClick={() => handleRemoveRepository(1)}>Remover</button>
        </li> */}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

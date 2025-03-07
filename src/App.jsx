import { useState, useEffect } from "react";

function App() {
  const [subjects, setSubjects] = useState(() => {
    const savedSubjects = localStorage.getItem("subjects");
    if (savedSubjects) {
      try {
        const parsedSubjects = JSON.parse(savedSubjects);
        return parsedSubjects.map(subject => ({
          ...subject,
          tasks: Array.isArray(subject.tasks) ? subject.tasks : [] // Asegurar que tasks sea un array
        }));
      } catch (error) {
        console.error("Error parsing localStorage data", error);
        return [];
      }
    }
    return [
      { name: "Economía Empresaria", tasks: [], color: "#FFB6C1" },
      { name: "Mecánica de Fluidos", tasks: [], color: "#ADD8E6" },
      { name: "Investigación Operativa", tasks: [], color: "#90EE90" },
      { name: "Proyecto Interdisciplinario", tasks: [], color: "#FFD700" },
      { name: "Tecnologías y Procesos de Producción", tasks: [], color: "#FFA07A" },
      { name: "Energías Convencionales", tasks: [], color: "#DDA0DD" },
    ];
  });
  const [newSubject, setNewSubject] = useState("");
  const [newTask, setNewTask] = useState({});

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    if (newSubject.trim() !== "") {
      setSubjects([...subjects, { name: newSubject, tasks: [], color: "#FFFFFF" }]);
      setNewSubject("");
    }
  };

  const addTask = (index) => {
    if (!newTask[index] || newTask[index].trim() === "") return;
    const updatedSubjects = [...subjects];
    updatedSubjects[index].tasks.push(newTask[index]);
    setSubjects(updatedSubjects);
    setNewTask({ ...newTask, [index]: "" });
  };

  const removeTask = (subjectIndex, taskIndex) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[subjectIndex].tasks.splice(taskIndex, 1);
    setSubjects(updatedSubjects);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>📚 Organizador de Materias</h1>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="Agregar materia"
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={addSubject} style={{ padding: "8px" }}>Agregar</button>
      </div>
      {subjects.map((subject, index) => (
        <div 
          key={index} 
          style={{ 
            border: "1px solid #ddd", 
            padding: "10px", 
            marginBottom: "10px", 
            backgroundColor: subject.color,
            position: "relative"
          }}
        >
          <h2>{subject.name}</h2>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <input
              value={newTask[index] || ""}
              onChange={(e) => setNewTask({ ...newTask, [index]: e.target.value })}
              placeholder="Nueva tarea"
              style={{ flex: 1, padding: "8px", backgroundColor: "#fff", color: "#000" }}
            />
            <button onClick={() => addTask(index)} style={{ padding: "8px" }}>➕</button>
          </div>
          <ul>
            {subject.tasks.map((task, taskIndex) => (
              <li key={taskIndex} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "5px", background: "#fff", color: "#000", marginBottom: "5px", borderRadius: "5px" }}>
                {task}
                <button 
                  onClick={() => removeTask(index, taskIndex)} 
                  style={{ backgroundColor: "#dc3545", color: "white", padding: "5px", border: "none", cursor: "pointer" }}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;






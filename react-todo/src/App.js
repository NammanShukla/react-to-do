import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import StatusBar from "./components/StatusBar";
import TaskManager from "./components/TaskManager";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    if (filterStatus === "Completed") return matchesSearch && task.completed;
    if (filterStatus === "Pending") return matchesSearch && !task.completed;
    return matchesSearch;
  });

  return (
    <div>
      <Header />
      <div className="centered-container">
        <Filters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        <StatusBar tasks={tasks} />
        <TaskManager tasks={filteredTasks} setTasks={setTasks} allTasks={tasks} />
      </div>
    </div>
  );
};

export default App;

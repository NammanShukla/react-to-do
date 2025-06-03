import { useState } from "react";

const TaskManager = ({ tasks, setTasks, allTasks }) => {
  const [newTask, setNewTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleAddOrEdit = () => {
    if (!newTask.trim()) return;

    if (editIndex !== null) {
      const updated = [...allTasks];
      updated[editIndex].text = newTask;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...allTasks, { text: newTask, completed: false }]);
    }

    setNewTask("");
  };

  const handleDelete = (index) => {
    const updated = [...allTasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const handleComplete = (index) => {
    const updated = [...allTasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewTask(allTasks[index].text);
  };

  const toggleSelect = (index) => {
    if (selectedTasks.includes(index)) {
      setSelectedTasks(selectedTasks.filter((i) => i !== index));
    } else {
      setSelectedTasks([...selectedTasks, index]);
    }
  };

  const deleteSelected = () => {
    const updated = allTasks.filter((_, index) => !selectedTasks.includes(index));
    setTasks(updated);
    setSelectedTasks([]);
  };

  return (
    <div className="task-container">
      <input
        type="text"
        placeholder="Enter a Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddOrEdit}>{editIndex !== null ? "Update Task" : "Add Task"}</button>

      {tasks.map((task, idx) => {
        const originalIndex = allTasks.indexOf(task);
        return (
          <div key={originalIndex} className="task-item">
            <input
              type="checkbox"
              checked={selectedTasks.includes(originalIndex)}
              onChange={() => toggleSelect(originalIndex)}
            />
            <span className={task.completed ? "completed-task": ""}style={{ flex: 1, marginLeft: "10px"}}>{task.text}</span>
            <div className="task-buttons">
              <button onClick={() => handleEdit(originalIndex)}>Edit</button>
              <button onClick={() => handleDelete(originalIndex)}>Delete</button>
              <button onClick={() => handleComplete(originalIndex)}>Complete</button>
            </div>
          </div>
        );
      })}

      {selectedTasks.length > 0 && (
        <button style={{ marginTop: "10px", backgroundColor: "#5728ea" }} onClick={deleteSelected}>
          Delete Selected
        </button>
      )}
    </div>
  );
};

export default TaskManager;

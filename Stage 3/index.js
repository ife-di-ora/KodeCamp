const express = require("express");

const app = express();
const { v4: uuidv4 } = require("uuid");

let arr = [];

app.use(express.json());

// A post endpoint to add a new task.
app.post("/", (req, res) => {
  const { title, body, status } = req.body;
  if (title.trim() && body.trim() && typeof status == "boolean") {
    arr.push({ taskID: uuidv4(), title, body, status });
    return res.status(200).json({
      message: "Task successfully added",
    });
  }
  return res.status(404).json({
    message: "Unsuccessful. Ensure Task title and Body are not empty",
  });
});

// A get endpoint to get a list of all tasks.
app.get("/", (req, res) => {
  if (arr.length > 0) {
    return res.status(200).json({ message: "success", data: arr });
  }
  return res.status(400).json({ message: "No Tasks Added Yet" });
});

//A GET endpoint to get a task by it's ID
app.get("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    const singleTask = arr.find((task) => task.taskID === id);
    if (singleTask) {
      return res.status(200).json({ message: "OK", data: singleTask });
    }
  }
  return res.status(400).json({ message: "task id not found" });
});

// A PUT endpoint to change the title and body of a task,
app.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  if (id && title.trim() && body.trim()) {
    let taskUpdated = false;
    arr.forEach((task) => {
      if (task.taskID == id) {
        task.title = title;
        task.body = body;
        taskUpdated = true;
      }
    });

    if (taskUpdated) {
      return res.status(200).json({ message: "Task updated" });
    }
    return res.status(404).json({ message: "Task not found" });
  }
  return res.status(404).json({ message: "Invalid input" });
});

// A PATCH endpoint to change the status of a task
app.patch("/:id", (req, res) => {
  const { id } = req.params;

  if (id) {
    let taskUpdated = false;

    arr.forEach((task) => {
      if (task.taskID == id) {
        task.status = !task.status;
        taskUpdated = true;
      }
    });

    if (taskUpdated) {
      return res.status(200).json({ message: "Task status updated" });
    }
    return res.status(404).json({ message: "Task not found" });
  }
  return res.status(400).json({ message: "Invalid task ID" });
});

// A DELETE endpoint to remove a task from the array of tasks.

app.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    arr = arr.filter((task) => task.taskID !== id);
    return res.status(200).json({ message: "task deleted" });
  }
  return res.status(400).json({ message: "Error Deleting Task" });
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

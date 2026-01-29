
const API_URL = "http://localhost:5000";
fetch(`${API_URL}/`)
    .then(res => res.text())
    .then(data => console.log("Backend says:", data))
    .catch(err => console.error("Error:", err));


window.addEventListener("DOMContentLoaded", function () {
    var taskName = document.getElementById("taskName");
    var taskDesc = document.getElementById("taskDesc");
    var taskDue = document.getElementById("taskDue");
    var addTaskBtn = document.getElementById("addTaskBtn");
    var taskList = document.getElementById("taskList");
    addTaskBtn.addEventListener("click", function () {
        var name = taskName.value.trim();
        var desc = taskDesc.value.trim();
        var due = taskDue.value;
        if (name === "") {
            alert("Please enter a task name");
            return;
        }
        var li = document.createElement("li");
        // Create checkbox for marking done
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        // Update text when checked
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                li.style.textDecoration = "line-through";
                li.style.opacity = "0.6";
            }
            else {
                li.style.textDecoration = "none";
                li.style.opacity = "1";
            }
        });
        li.appendChild(checkbox);
        // Add task details
        var taskContent = document.createElement("span");
        taskContent.innerHTML = "\n            <strong>Task:</strong> ".concat(name, "<br>\n            <strong>Description:</strong> ").concat(desc || "-", "<br>\n            <strong>Due:</strong> ").concat(due || "-", "\n        ");
        li.appendChild(taskContent);
        // Add Delete button
        var deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "deleteBtn";
        deleteBtn.addEventListener("click", function () {
            taskList.removeChild(li);
        });
        li.appendChild(deleteBtn);
        // Highlight overdue tasks
        if (due) {
            var today = new Date().toISOString().split("T")[0];
            if (due < today) {
                li.style.backgroundColor = "#ffe5e5"; // light red for overdue
            }
        }
        taskList.appendChild(li);
        // Clear inputs
        taskName.value = "";
        taskDesc.value = "";
        taskDue.value = "";
    });
});
fetch("http://localhost:5000/test")
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

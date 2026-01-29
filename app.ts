
fetch("http://localhost:5000/test")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        alert(data.message);
    })
    .catch(err => console.error(err));


window.addEventListener("DOMContentLoaded", () => {
    const taskName = document.getElementById("taskName") as HTMLInputElement;
    const taskDesc = document.getElementById("taskDesc") as HTMLInputElement;
    const taskDue = document.getElementById("taskDue") as HTMLInputElement;
    const addTaskBtn = document.getElementById("addTaskBtn") as HTMLButtonElement;
    const taskList = document.getElementById("taskList") as HTMLUListElement;

    addTaskBtn.addEventListener("click", () => {
        const name = taskName.value.trim();
        const desc = taskDesc.value.trim();
        const due = taskDue.value;

        if (name === "") {
            alert("Please enter a task name");
            return;
        }

        const li = document.createElement("li");

        // Create checkbox for marking done
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        // Update text when checked
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                li.style.textDecoration = "line-through";
                li.style.opacity = "0.6";
            } else {
                li.style.textDecoration = "none";
                li.style.opacity = "1";
            }
        });

        li.appendChild(checkbox);

        // Add task details
        const taskContent = document.createElement("span");
        taskContent.innerHTML = `
            <strong>Task:</strong> ${name}<br>
            <strong>Description:</strong> ${desc || "-"}<br>
            <strong>Due:</strong> ${due || "-"}
        `;
        li.appendChild(taskContent);

        // Add Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "deleteBtn";
        deleteBtn.addEventListener("click", () => {
            taskList.removeChild(li);
        });
        li.appendChild(deleteBtn);

        // Highlight overdue tasks
        if (due) {
            const today = new Date().toISOString().split("T")[0];
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

document.addEventListener("DOMContentLoaded", function () {
    // Fetch and display tasks on page load
    fetchTasks();

    // Function to fetch tasks and populate the table
    function fetchTasks() {
        fetch('http://localhost:3000/api/tasks')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(tasks => {
                displayTasks(tasks);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }

    // Function to display tasks in the table
    function displayTasks(tasks) {
        const tableBody = document.getElementById('tbody');
        tableBody.innerHTML = ''; // Clear existing rows

        tasks.forEach(task => {
            const row = tableBody.insertRow();

            const titleCell = row.insertCell();
            titleCell.textContent = task.title;

            const descriptionCell = row.insertCell();
            descriptionCell.textContent = task.description;

            const completedCell = row.insertCell();
            completedCell.textContent = task.completed ? 'Yes' : 'No';

            const actionCell = row.insertCell();
            actionCell.style.display = "flex";
            actionCell.style.gap = "5%";
            
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Update';
            updateButton.addEventListener('click', () => openUpdateForm(task));

            const markAsCompletedButton = document.createElement('button');
            markAsCompletedButton.textContent = 'Mark as Completed';
            markAsCompletedButton.addEventListener('click', () => markAsCompleted(task._id));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => deleteTask(task._id));
              
           actionCell.appendChild(updateButton) 
            actionCell.appendChild(markAsCompletedButton);
            actionCell.appendChild(deleteButton);
        });
    }

    // Function to create a new task
    document.getElementById('CreateTask').addEventListener("click", createTask);
    function createTask() {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;

        fetch('http://localhost:3000/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
        })
            .then(response => response.json())
            .then(newTask => {
                // Update the table with the new task
                fetchTasks();
                // Clear the form
                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
            })
            .catch(error => console.error('Error creating task:', error));
    }

    // Function to open the update task form
    function openUpdateForm(task) {

        const updateTaskForm = document.getElementById('updateTaskForm');
        const updateTitleInput = document.getElementById('updateTitle');
        const updateDescriptionInput = document.getElementById('updateDescription');

        // Fill the form with current task details
        updateTitleInput.value = task.title;
        updateDescriptionInput.value = task.description;

        updateTaskForm.style.display = 'block';

        // Add event listener to the update button in the form
        document.getElementById('updateTaskBtn').addEventListener('click', () => {
            updateTask(task._id, updateTitleInput.value, updateDescriptionInput.value);
            // Close the form after updating
            updateTaskForm.style.display = 'none';

        });
    }

    // Function to update a task
    function updateTask(taskId, title, description) {
        fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
        })
            .then(response => response.json())
            .then(updatedTask => {
                // Update the table with the updated task
                fetchTasks();
            })
            .catch(error => console.error('Error updating task:', error));
    }


    // Function to mark a task as completed
    function markAsCompleted(taskId) {
        fetch(`http://localhost:3000/api/tasks/${taskId}/complete`, {
            method: 'PATCH',
        })
            .then(response => response.json())
            .then(updatedTask => {
                // Update the table with the updated task
                fetchTasks();
            })
            .catch(error => console.error('Error marking task as completed:', error));
    }

    // Function to delete a task
    function deleteTask(taskId) {
        fetch(`http://localhost:3000/api/tasks/${taskId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(deletedTask => {
                // Update the table without the deleted task
                fetchTasks();
            })
            .catch(error => console.error('Error deleting task:', error));
    }
});

    function addTask(event) {
      if (event.key === "Enter") {
        const taskInput = document.getElementById("taskInput");
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
          addTaskElement("pendingList", taskText);
          taskInput.value = "";
        }
      }
    }

    function addTaskFromButton() {
      const taskInput = document.getElementById("taskInput");
      const taskText = taskInput.value.trim();

      if (taskText !== "") {
        addTaskElement("pendingList", taskText);
        taskInput.value = "";
      }
    }

    function addTaskElement(listId, taskText) {
      const list = document.getElementById(listId);
      const newTask = createTaskElement(taskText);
      list.appendChild(newTask);
    }

    function createTaskElement(taskText) {
      const li = document.createElement("li");
      li.textContent = taskText;

      li.addEventListener("click", function() {
        moveTask(this);
      });

      return li;
    }

    function moveTask(taskElement) {
      const sourceListId = taskElement.parentNode.id;
      const targetListId = getNextListId(sourceListId);

      const targetList = document.getElementById(targetListId);
      targetList.appendChild(taskElement);
    }

    function getNextListId(currentListId) {
      switch (currentListId) {
        case "pendingList":
          return "completedList";
        case "completedList":
          return "upcomingList";
        default:
          return "pendingList";
      }
    }
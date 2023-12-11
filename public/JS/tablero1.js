function agregarSprint() {
    const sprintName = document.getElementById("sprintName").value;
    if (sprintName.trim() === "") {
        alert("Por favor, ingresa un nombre de sprint.");
        return;
    }

    const sprintDiv = document.createElement("div");
    sprintDiv.classList.add("sprint");
    sprintDiv.innerText = sprintName;

    document.getElementById("sprintList").appendChild(sprintDiv);

    document.getElementById("sprintName").value = "";
}

const toggleButton = document.getElementById('toggleButton');
const dropdownMenu = document.getElementById('dropdownMenu');

toggleButton.addEventListener('click', function() {
    if (dropdownMenu.classList.contains('hidden')) {
        dropdownMenu.classList.remove('hidden');
    } else {
        dropdownMenu.classList.add('hidden');
    }
});



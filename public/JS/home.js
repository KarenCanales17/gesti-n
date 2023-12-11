// Ejemplo de cómo agregar plantillas de tarjetas al tablero de plantillas
const templateBoard = document.getElementById('template-board');

function createTemplateCard(title) {
    const templateCard = document.createElement('div');
    templateCard.className = 'template-card';
    templateCard.innerHTML = `<h2>${title}</h2>`;
    templateBoard.appendChild(templateCard);
}

function createTemplate(templateCard, text) {
    const template = document.createElement('div');
    template.className = 'template';
    template.innerText = text;
    templateCard.appendChild(template);
}

// Ejemplo de uso
createTemplateCard('Plantilla 1');
createTemplate(templateBoard.children[0], 'Elemento 1');
createTemplate(templateBoard.children[0], 'Elemento 2');
createTemplateCard('Plantilla 2');
createTemplate(templateBoard.children[1], 'Elemento 3');

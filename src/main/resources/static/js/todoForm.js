const todoControl = new TodoController();

newItemForm.addEventListener('submit', (event) => {

    event.preventDefault();

    const newItemTitle = document.querySelector('#newItemTitle');
    const newItemDescription = document.querySelector('#newItemDescription');
    const newItemTargetDate = document.querySelector('#newItemTargetDate');

    const title = newItemTitle.value;
    const description = newItemDescription.value;
    const targetDate = newItemTargetDate.value;

    newItemTitle.value = '';
    newItemDescription.value = '';
    newItemTargetDate.value = '';

    todoControl.addItem(title, description, targetDate);
});
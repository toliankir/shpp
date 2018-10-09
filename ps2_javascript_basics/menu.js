const CLASS_ACTIVE_MENU_ITEM = 'task-menu-item--active';
const CLASS_DEFAULT_MENU_ITEM = 'task-menu-item';
const CLASS_ACTIVE_TASK = 'task--active';
const CLASS_DEFAULT_TASK = 'task';

const allTasks = document.getElementsByClassName(CLASS_DEFAULT_TASK);

function buildNav() {
    const menu = document.getElementsByClassName("task-menu")[0];
    Array.from(allTasks).forEach((currentTaskElement) => {
        const newMenuItem = document.createElement('div');
        newMenuItem.className = CLASS_DEFAULT_MENU_ITEM;
        newMenuItem.innerText = currentTaskElement.getAttribute("id");
        newMenuItem.addEventListener('click', (clickedMenuItem) => {
            resetAllActiveItems();
            currentTaskElement.className = CLASS_ACTIVE_TASK;
            clickedMenuItem.target.className = CLASS_ACTIVE_MENU_ITEM;
        });
        menu.appendChild(newMenuItem);
    });

}

function resetAllActiveItems() {
    const activeMenuItem = document.getElementsByClassName(CLASS_ACTIVE_MENU_ITEM)[0];
    const activeTask = document.getElementsByClassName(CLASS_ACTIVE_TASK)[0];
    if (activeMenuItem) {
        activeMenuItem.className = CLASS_DEFAULT_MENU_ITEM;
        activeTask.className = CLASS_DEFAULT_TASK;
    }
}

function initMenu() {
        buildNav();
}


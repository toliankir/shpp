const allTasks = document.getElementsByClassName("task");
const allEl = document.getElementsByClassName("task-menu-item");

function buildTasks() {
    const tasks = document.getElementsByClassName("task");
    Array.from(tasks).forEach((el) => {
        const testElement = document.createElement("section");
        testElement.className = "task__test";
        testElement.setAttribute("id", "test"+el.getAttribute("id"));
        el.appendChild(testElement);
    });
}

function buildNav() {
    Array.from(allTasks).forEach((el) => {
        const menu = document.getElementsByClassName("task-menu")[0];
        const newMenuElement = document.createElement("div");
        newMenuElement.className = "task-menu-item";
        newMenuElement.setAttribute("data-id", el.getAttribute("id"));
        newMenuElement.innerHTML = `<div class=\"task-menu-item__inner-item\">${el.getAttribute("id")}</div>`;
        menu.appendChild(newMenuElement);
    });
}

function addNavEventListeners() {
    Array.from(allEl).forEach((el, index, arr) => {
        el.addEventListener("click", () => {

            arr.forEach((el) => {
                el.className = "task-menu-item";
                const taskToHide = document.getElementById(el.getAttribute("data-id"));
                taskToHide.className = "task";
            });

            const taskToShow = document.getElementById(el.getAttribute("data-id"));
            taskToShow.className = "task--active";

            el.classList.add("task-menu-item--active");
            if (el.previousElementSibling) {
                el.previousElementSibling.classList.add("task-menu-item--left-from-active");
            }
            if (el.nextElementSibling) {
                el.nextElementSibling.classList.add("task-menu-item--right-from-active");
            }
        });

        el.addEventListener("mouseover", () => {
                if (!el.classList.contains("task-menu-item--active")) {

                    if (el.classList.contains("task-menu-item--left-from-active")) {
                        el.classList.add("task-menu-item--over-left-from-active");
                        if (el.previousElementSibling) {
                            el.previousElementSibling.classList.add("task-menu-item--left-from-over");
                        }
                    } else if (el.classList.contains("task-menu-item--right-from-active")) {
                        el.classList.add("task-menu-item--over-right-from-active");
                        if (el.nextElementSibling) {
                            el.nextElementSibling.classList.add("task-menu-item--right-from-over");
                        }
                    } else {
                        el.classList.add("task-menu-item--over");

                        if (el.previousElementSibling) {
                            if (el.previousElementSibling.classList.contains("task-menu-item--right-from-active")) {
                                el.previousElementSibling.classList.remove("task-menu-item--right-from-active");
                                el.previousElementSibling.classList.add("task-menu-item--left-from-over-right-from-active");
                            } else {
                                el.previousElementSibling.classList.add("task-menu-item--left-from-over");
                            }
                        }

                        if (el.nextElementSibling) {
                            if (el.nextElementSibling.classList.contains("task-menu-item--left-from-active")) {
                                el.nextElementSibling.classList.remove("task-menu-item--right-from-active");
                                el.nextElementSibling.classList.add("task-menu-item--right-from-over-left-from-active");
                            } else {
                                el.nextElementSibling.classList.add("task-menu-item--right-from-over");
                            }
                        }

                    }
                }
            }
        );

        el.addEventListener("mouseout", () => {
            el.classList.remove("task-menu-item--over");
            el.classList.remove("task-menu-item--over-left-from-active");
            el.classList.remove("task-menu-item--over-right-from-active");

            if (el.previousElementSibling) {
                el.previousElementSibling.classList.remove("task-menu-item--left-from-over");
                if (el.previousElementSibling.classList.contains("task-menu-item--left-from-over-right-from-active")) {
                    el.previousElementSibling.classList.remove("task-menu-item--left-from-over-right-from-active");
                    el.previousElementSibling.classList.add("task-menu-item--right-from-active");
                }
            }
            if (el.nextElementSibling) {
                el.nextElementSibling.classList.remove("task-menu-item--right-from-over");
                if (el.nextElementSibling.classList.contains("task-menu-item--right-from-over-left-from-active")) {
                    el.nextElementSibling.classList.remove("task-menu-item--right-from-over-left-from-active");
                    el.nextElementSibling.classList.add("task-menu-item--left-from-active");
                }
            }
        });
    });
}

function initMenu() {
    buildNav();
   // addNavEventListeners();
}


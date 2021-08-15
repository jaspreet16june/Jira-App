let addBtn = document.querySelector(".add");
let body = document.querySelector("body");
let grid = document.querySelector(".grid");

let deleteBtn = document.querySelector(".delete");

let deleteMode = false;

let colors = ["pink", "blue", "green", "black"];

let allFiltersChildren = document.querySelectorAll(".filter div");

for (let i = 0; i < allFiltersChildren.length; i++) {
    allFiltersChildren[i].addEventListener("click", function (e) {
        let filterColor = e.currentTarget.classList[0];
        loadTasks(filterColor);
    });
}
console.log(localStorage.getItem("AllTickets"));
if (localStorage.getItem("AllTickets") == undefined) {

    let allTickets = {};

    allTickets = JSON.stringify(allTickets);

    localStorage.setItem("AllTickets", allTickets);
}

loadTasks();

deleteBtn.addEventListener("click", function (e) {
    if (e.currentTarget.classList.contains("delete-selected")) {
        e.currentTarget.classList.remove("delete-selected");
        deleteMode = false;
    } else {
        e.currentTarget.classList.add("delete-selected");
        deleteMode = true;
    }
})

addBtn.addEventListener("click", function () {

    deleteBtn.classList.remove("delete-selected")
    deleteMode = false;

    let preModal = document.querySelector(".modal");

    if (preModal != null) return;

    let div = document.createElement("div");
    div.classList.add("modal");

    div.innerHTML = `<div class="modal-text-container">
                    <div class="modal-inner-type-container" contenteditable="true"></div>
                </div>
                <div class="modal-filter-container">
                    <div class="modal-filter-section">
                        <div class="modal-filter pink"></div>
                        <div class="modal-filter green"></div>
                        <div class="modal-filter blue"></div>
                        <div class="modal-filter black selected"></div>
                    </div>
                </div>`;

    let ticketColor = "black";

    let allModalPriority = div.querySelectorAll(".modal-filter");

    for (let i = 0; i < allModalPriority.length; i++) {
        allModalPriority[i].addEventListener("click", function (e) {


            for (let j = 0; j < allModalPriority.length; j++) {
                allModalPriority[j].classList.remove("selected")
            }

            e.currentTarget.classList.add("selected");
            ticketColor = e.currentTarget.classList[1];

        });
    }

    let taskInnerContainer = div.querySelector(".modal-inner-type-container");
    taskInnerContainer.addEventListener("keypress", function (e) {
        if (e.key == "Enter") {
            let id = uid();
            let task = e.currentTarget.innerText;

            let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

            let ticketObj = {
                color: ticketColor,
                taskValue: task,
            }

            allTickets[id] = ticketObj;

            localStorage.setItem("AllTickets", JSON.stringify(allTickets));

            let ticketDiv = document.createElement("div");
            ticketDiv.classList.add("ticket");

            ticketDiv.setAttribute("data-id", id);


            ticketDiv.innerHTML = `<div data-id = "${id}" class="ticket-color ${ticketColor}"></div>
                <div class="ticket-id">${id}</div>
                <div data-id = "${id}" class="actual-task" contenteditable="true">${task}</div>`;

            let ticketColorDiv = ticketDiv.querySelector(".ticket-color");
            let actualTaskDiv = ticketDiv.querySelector(".actual-task");

            actualTaskDiv.addEventListener("input", function (e) {
                let updatedTask = e.currentTarget.innerText;
                let currTickedId = e.currentTarget.getAttribute("data-id");

                let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

                allTickets[currTickedId].taskValue = updatedTask;

                localStorage.setItem("AllTickets", JSON.stringify(allTickets));
            })

            ticketColorDiv.addEventListener("click", function (e) {
                // let colors = ["pink", "blue", "green", "black"];
                let currTicketId = e.currentTarget.getAttribute("data-id");

                let currColor = e.currentTarget.classList[1]; //green

                let index = -1;
                for (let i = 0; i < colors.length; i++) {
                    if (colors[i] == currColor) index = i;
                }

                index++;
                index = index % 4;

                let newColor = colors[index];

                let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

                allTickets[currTicketId].color = newColor;

                localStorage.setItem("AllTickets", JSON.stringify(allTickets));

                ticketColorDiv.classList.remove(currColor);
                ticketColorDiv.classList.add(newColor);
            });

            ticketDiv.addEventListener("click", function (e) {
                if (deleteMode) {

                    let currTicketId = e.currentTarget.getAttribute("data-id");

                    e.currentTarget.remove();

                    let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

                    delete allTickets[currTicketId];

                    localStorage.setItem("AllTickets", JSON.stringify(allTickets));
                }
            });

            grid.append(ticketDiv);
            div.remove();
        }
    })

    body.append(div);
})

function loadTasks(color) {

    let ticketsOnUi = document.querySelectorAll(".ticket");

    for (let i = 0; i < ticketsOnUi.length; i++) {
        ticketsOnUi[i].remove();
    }

    let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

    for (x in allTickets) {

        let currTicketId = x;
        let singleTicketObj = allTickets[x];

        if (color) {
            if (color != singleTicketObj.color) continue;
        }

        let ticketDiv = document.createElement("div");
        ticketDiv.classList.add("ticket");

        ticketDiv.setAttribute("data-id", currTicketId);


        ticketDiv.innerHTML = `<div data-id = "${currTicketId}" class="ticket-color ${singleTicketObj.color}"></div>
                    <div class="ticket-id">${currTicketId}</div>
                    <div data-id = "${currTicketId}" class="actual-task" contenteditable="true">${singleTicketObj.taskValue}</div>`;

        let ticketColorDiv = ticketDiv.querySelector(".ticket-color");
        let actualTaskDiv = ticketDiv.querySelector(".actual-task");

        actualTaskDiv.addEventListener("input", function (e) {
            let updatedTask = e.currentTarget.innerText;
            let currTickedId = e.currentTarget.getAttribute("data-id");

            let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

            allTickets[currTickedId].taskValue = updatedTask;

            localStorage.setItem("AllTickets", JSON.stringify(allTickets));
        })

        ticketColorDiv.addEventListener("click", function (e) {
            // let colors = ["pink", "blue", "green", "black"];
            let currTicketId = e.currentTarget.getAttribute("data-id");

            let currColor = e.currentTarget.classList[1]; //green

            let index = -1;
            for (let i = 0; i < colors.length; i++) {
                if (colors[i] == currColor) index = i;
            }

            index++;
            index = index % 4;

            let newColor = colors[index];

            let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

            allTickets[currTicketId].color = newColor;

            localStorage.setItem("AllTickets", JSON.stringify(allTickets));

            ticketColorDiv.classList.remove(currColor);
            ticketColorDiv.classList.add(newColor);
        });

        ticketDiv.addEventListener("click", function (e) {
            if (deleteMode) {

                let currTicketId = e.currentTarget.getAttribute("data-id");

                e.currentTarget.remove();

                let allTickets = JSON.parse(localStorage.getItem("AllTickets"));

                delete allTickets[currTicketId];

                localStorage.setItem("AllTickets", JSON.stringify(allTickets));
            }
        });

        grid.append(ticketDiv);
    }

}
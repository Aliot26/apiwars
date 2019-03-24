import {dataHandler} from "./data_handler.js";
import {dom} from "./dom.js";
import {getIdFromUrl} from "./format_data.js";

export {
    addListenerButtonResident,
    addListenerPaginator,
    addListenerVoteButton,
    getIdPlanetVote,
    addListenerUserModal,
    addListenerLogoutButton,
};


function addListenerButtonResident() {
    let btnArr = document.getElementsByClassName('resident');
    for (let btn of btnArr) {
        btn.addEventListener("click", function handler() {
            popUpModal('popup-resident');
            let urlPlanet = displayNamePlanetIntoResidentsWindow(btn);
            dataHandler.getUrlResidents(urlPlanet);
            dataHandler.loadResidents();
            dom.loadResidentsTable();
        });
    }
}


function displayNamePlanetIntoResidentsWindow(btn) {
    let namePlanet = btn.closest('tr').firstElementChild.textContent;
    let popupHeader = document.getElementById('popup-header');
    popupHeader.textContent = `Residents of ${namePlanet}`;
    return btn.parentElement.getAttribute('url_pl');
}


function popUpModal(elementId) {
    let popUpWindow = document.getElementById(elementId);
    let popUpClose = document.getElementsByClassName("close");
    let tableBody = document.getElementById('table-body');
    let alertToUser = document.getElementById('alert');
    if (popUpWindow.style.display === "block") {
        popUpWindow.style.display = "none";
        alertToUser.style.display = "none";
    }
    popUpWindow.style.display = "block";

    for (let i = 0; i < popUpClose.length; i++) {
        popUpClose[i].addEventListener("click", function () {
            tableBody.innerHTML = "";
            popUpWindow.style.display = "none";
            alertToUser.style.display = "none";
            // location.reload();
        })
    }

    window.onclick = function (e) {
        if (e.target === popUpWindow) {
            tableBody.innerHTML = "";
            popUpWindow.style.display = "none";
            alertToUser.style.display = "none";
        }
    }
}


function addListenerPaginator() {
    let paginationBtnArr = document.querySelectorAll('.btn-paginator');
    for (let pagBtn of paginationBtnArr) {
        if (pagBtn.getAttribute("data-url") === 'null') {
            pagBtn.setAttribute("disabled", "disabled");
        } else {
            pagBtn.addEventListener('click', function () {
                let url = pagBtn.dataset.url;
                dataHandler.loadData(url);
                setTimeout(function () {
                    dom.loadTable();
                }, 2000);
            })
        }
    }
}


function addListenerVoteButton() {
    let voteBtnArr = document.getElementsByClassName('vote-btn');
    for (let btn of voteBtnArr) {
        btn.addEventListener('click', function () {
            let params = {
                planet_id: getIdPlanetVote(btn),
                planet_name: getNamePlanetToVote(btn)
            };
            dataHandler.sendVoteData(params);
            btn.setAttribute('disabled', "disabled");
        })
    }
}

function getNamePlanetToVote(btn) {
    return btn.closest('tr').firstElementChild.textContent;
}


function getIdPlanetVote(btn) {
    let urlPlanet = btn.parentElement.previousSibling.getAttribute('url_pl');
    return getIdFromUrl(urlPlanet);
}


function addListenerUserModal(button, element) {
    button.addEventListener('click', function () {
        popUpModal(element);
        addListenerSubmitButton(element);
    })
}


function convertNameElement(element) {
    let arrName = element.split("-");
    return arrName[1];
}


function addListenerSubmitButton(element) {
    let formId = convertNameElement(element);
    let form = document.getElementById(formId);
    let dataFromForm = {};
    form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (formId === "login") {
                dataFromForm['username'] = document.getElementById('username').value;
                dataFromForm['password'] = document.getElementById('password').value;
            } else if (formId === "register") {
                dataFromForm['username'] = document.getElementById('username-reg').value;
                dataFromForm['password1'] = document.getElementById('password1').value;
                dataFromForm['password2'] = document.getElementById('password2').value;

                if (dataFromForm.password2 === dataFromForm.password1 && dataFromForm.username) {
                    dataFromForm['password'] = dataFromForm.password1;
                    dataFromForm['password1'] = undefined;
                    dataFromForm['password2'] = undefined;
                } else {
                    dom.displayMessageToUser("Fill the form correctly.", "block", formId);
                }
            }
            if (dataFromForm.username && dataFromForm.password) {
                dataHandler.loginData(dataFromForm, formId);
            } else {
                dom.displayMessageToUser("Fill the form correctly", "block", formId);
            }
        }
    )
}


function addListenerLogoutButton(buttonLogout) {
    buttonLogout.addEventListener('click', function (event) {
        event.preventDefault();
        localStorage.removeItem("apiwars");
        location.reload();
    })
}




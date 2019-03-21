import {dataHandler} from "./data_handler.js";
import {dom} from "./dom.js";
import {getIdFromUrl} from "./format_data.js";

export {addListenerButtonResident, addListenerPaginator, addListenerVoteButton, getIdPlanetVote};


function addListenerButtonResident() {
    let btnArr = document.getElementsByClassName('resident');
    for (let btn of btnArr) {
        btn.addEventListener("click", function handler() {
            popUpResidents();
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


function popUpResidents() {
    let popUpWindow = document.getElementById('popup');
    let popUpClose = document.getElementsByClassName("close");
    let tableBody = document.getElementById('table-body');
    if (popUpWindow.style.display === "block") {
        popUpWindow.style.display = "none";
    }
    popUpWindow.style.display = "block";

    for (let i = 0; i < popUpClose.length; i++) {
        popUpClose[i].addEventListener("click", function () {
            tableBody.innerHTML = "";
            popUpWindow.style.display = "none";
        })
    }

    window.onclick = function (e) {
        if (e.target === popUpWindow) {
            tableBody.innerHTML = "";
            popUpWindow.style.display = "none";
        }
    }
}


function addListenerPaginator() {
    let paginationBtnArr = document.querySelectorAll('.btn-paginator');
    for (let pagBtn of paginationBtnArr) {
        pagBtn.addEventListener('click', function () {
            let url = pagBtn.dataset.url;
            dataHandler.loadData(url);
            setTimeout(function () {
                dom.loadTable();
            }, 2000);
        })
    }
}


function addListenerVoteButton() {
    let voteBtnArr = document.getElementsByClassName('vote-btn');
    for (let btn of voteBtnArr) {
        btn.addEventListener('click', function () {
            let namePlanetVote = getNamePlanetToVote(btn);
            let idPlanetVote = getIdPlanetVote(btn);

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





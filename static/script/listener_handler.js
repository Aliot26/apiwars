import { dataHandler } from "./data_handler.js";
import {dom} from "./dom.js";
export {addListenerButtonResident, displayNamePlanetIntoResidentsWindow};


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
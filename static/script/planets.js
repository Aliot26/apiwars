import {
    formatDataDiameter,
    formatDataPopulation,
    formatDataSurface,
    formatDataResidents
} from "./format_data.js";
import {dataHandler} from "./data_handler.js";
import {
    addListenerButtonResident,
    addListenerPaginator,
    addListenerVoteButton,
    getIdPlanetVote
} from "./listener_handler.js";
import {addLoginModal} from "./login.js";

export {createTablePlanets};


function createTablePlanets(data) {
    addPaginatorButtons(data);
    let results = data.results;
    let headersList = {
        "name": "Name",
        "diameter": "Diameter",
        "climate": "Climate",
        "terrain": "Terrain",
        "surface_water": "Surface Water Percentage",
        "population": "Population",
        "residents": "Residents"
    };
    if (dataHandler.getUsername() !== null) {
        headersList['vote'] = "Vote";
    }
    let tablePlanet = document.getElementById("table-planets");
    tablePlanet.innerHTML = "";

    let headerRow = renderHeaderTablePlanets(headersList);
    tablePlanet.appendChild(headerRow);

    renderBodyTablePlanets(headersList, tablePlanet, results);
}

function renderHeaderTablePlanets(headersList) {
    let rowInTable = document.createElement('tr');
    for (let item in headersList) {
        let cellInTable = document.createElement('td');
        cellInTable.classList.add(item);
        cellInTable.innerHTML = headersList[item];
        rowInTable.appendChild(cellInTable);
    }
    return rowInTable
}

function renderBodyTablePlanets(headersList, tablePlanet, results) {
    for (let i = 0; i < results.length; i++) {
        let rowInTable = document.createElement('tr');
        for (let item in headersList) {
            let cellInTable = document.createElement('td');
            cellInTable.classList.add(item);
            if (cellInTable.className === "residents") {
                cellInTable.setAttribute('url_pl', results[i]['url']);
            }
            cellInTable.innerHTML = results[i][item];
            rowInTable.appendChild(cellInTable);
        }

        tablePlanet.appendChild(rowInTable);
    }
    addLoginModal();
    formatDataDiameter();
    formatDataPopulation();
    formatDataSurface();
    formatDataResidents();
    addListenerButtonResident();
    createVoteButton();
    addListenerVoteButton();
    addListenerPaginator();
}


function addPaginatorButtons(data) {
    let previousLink = data.previous;
    let nextLink = data.next;
    let prevBtn = document.getElementById('prev-link');
    prevBtn.setAttribute('data-url', previousLink);
    let nextBtn = document.getElementById('next-link');
    nextBtn.setAttribute('data-url', nextLink);
}


function deactivateVoteButton(btn) {
    let arrIdPlanets = dataHandler.listVotePlanetsId();
    let idPlanetVote = getIdPlanetVote(btn);
    for(let i=0; i< arrIdPlanets.length; i++){
        if(idPlanetVote===arrIdPlanets[i]){
            btn.setAttribute("disabled", "disabled");
        }
    }
}

function createVoteButton() {
    let btnArr = document.getElementsByClassName("vote");

    for (let j = 1; j < btnArr.length; j++) {
        if (btnArr[j].textContent === 'undefined') {
            btnArr[j].textContent = "";
        }

        let btn = document.createElement('button');
        btn.classList.add("btn-outline-secondary", "btn", "vote-btn");
        btn.setAttribute("data-id-vote", "vote" + j);
        btn.setAttribute("type", "submit");
        btn.textContent = "Vote";
        btnArr[j].appendChild(btn);
        deactivateVoteButton(btn);
    }
}




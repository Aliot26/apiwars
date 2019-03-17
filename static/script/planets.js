import {formatDataDiameter, formatDataPopulation, formatDataSurface, formatDataResidents} from "./format_data.js";

export {createTablePlanets};


function createTablePlanets(data) {

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
    formatDataDiameter();
    formatDataPopulation();
    formatDataSurface();
    formatDataResidents();
}
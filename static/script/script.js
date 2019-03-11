function formateDataDiameter() {
    let arrData = document.getElementsByClassName('diameter');
    for (let i = 1; i < arrData.length; i++) {
        let text = arrData[i].textContent;
        if (text !== "unknown") {
            text = text.replace(/(\w+)(\w{3})/, "$1,$2 km");
            arrData[i].textContent = text;
        }
    }
}

function formateDataPopulation() {
    let arrData = document.getElementsByClassName('population');
    for (let i = 1; i < arrData.length; i++) {
        let text = arrData[i].textContent;
        if (text !== "unknown") {
            text = text.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1,") + " people";
            arrData[i].textContent = text;
        }
    }
}

function formateDataSurface() {
    let arrData = document.getElementsByClassName('surface_water');
    for (let i = 1; i < arrData.length; i++) {
        let text = arrData[i].textContent;
        if (text !== "unknown") {
            text = text + "%";
            arrData[i].textContent = text;
        }
    }
}

function formateDataResidents() {
    let arrData = document.getElementsByClassName('residents');
    for (let i = 1; i < arrData.length; i++) {
        let text = arrData[i].textContent;
        if (text === "") {
            text = "No known residents";
            arrData[i].textContent = text;
        } else {
            let arrText = text.split(',');
            let count = arrText.length;
            arrData[i].textContent = count;
            arrData[i].innerHTML = `<button id="r${i}" type="button" class="btn btn-outline-secondary resident">${count} resident(s)</button>`;
        }
    }
}

function formateDataGender(gender) {
    switch (gender) {
        case 'male':
            gender = '<i class=\"fas fa-mars\"></i>';
            break;
        case 'female':
            gender = '<i class="fas fa-venus"></i>';
            break;
        case 'n/a':
            gender = '<i class="fas fa-genderless"></i>';
            break;
        default:
            gender = 'unknown';

    }return gender
}


function getDatabyRequest(url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                resolve(data);
            } else {
                reject(console.log("We connected to the server, but it returned an error"));
            }
        };
        xhr.send();
    });
}

function getDatabyToIndexPageRequest(url) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function () {
        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            renderTablePlanets(data);
            formateDataDiameter();
            formateDataPopulation();
            formateDataSurface();
            formateDataResidents();
            addListenerButtonResident();
        } else {
            console.log("We connected to the server, but it returned an error");
        }
    };
    xhr.send();

}

function renderTablePlanets(data) {
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
    let rowInTable = document.createElement('tr');

    for (let item in headersList) {
        let cellInTable = document.createElement('td');
        cellInTable.classList.add(item);
        cellInTable.innerHTML = headersList[item];
        rowInTable.appendChild(cellInTable);
    }
    tablePlanet.appendChild(rowInTable);

    for (let i = 0; i < results.length; i++) {
        let rowInTable = document.createElement('tr');
        for (let item in headersList) {
            let cellInTable = document.createElement('td');
            cellInTable.classList.add(item);
            if(cellInTable.className === "residents"){
                cellInTable.setAttribute('url_pl', results[i]['url']);
            }
            cellInTable.innerHTML = results[i][item];
            rowInTable.appendChild(cellInTable);
        }
        tablePlanet.appendChild(rowInTable);
    }
}


// function sendData(data) {
//     console.log(data);
//     let results = data.results;
//     console.log(results);
//     results = JSON.stringify(results);
//     let xhr = new XMLHttpRequest();
//     xhr.open("POST", "/table");
//     xhr.send(results);
// }
//
//
// function renderTablePlanets() {
//     let tableHeaderArr = ['Name', 'Diameter', 'Climate', 'Terrain',
//         'Surface Water Percentage', 'Population', 'Residants', 'Vote'];
//     let headerRow = "";
//
//     for (let j = 0; j < tableHeaderArr.length; j++) {
//         headerRow += `<th>${tableHeaderArr[j]}</th>`;
//     }
//     return '<tr>' + headerRow + '</tr>';
// }
//
// function renderHTML(data) {
//     let tablePlanet = document.getElementById('table-planets');
//     tablePlanet.insertAdjacentHTML('beforeend', renderTablePlanets());
//     let results = data.results;
//     let newRow = "";
//     for (let i = 0; i < results.length; i++) {
//         newRow += `<tr><td>${results[i].name} </td>
//             <td>${formateDataDiameter(results[i].diameter)}</td>
//             <td>${results[i].climate}</td>
//             <td>${results[i].terrain}</td>
//             <td>${formateDataSurface(results[i].surface_water)}</td>
//             <td>${formateDataPopulation(results[i].population)}</td>
//             <td>${formateDataResidents(results[i].residents.length, i)}</td>
//             <td><button type="button" class="btn btn-outline-secondary vote">vote</button></td></tr>
//             `
//     }
//     tablePlanet.insertAdjacentHTML('beforeend', newRow);
//     return data;
// }
//


function getLinkResidents(data) {
    return data['residents'];
}


function getDataResidents(data) {
    let urls = data;
    let dataResidents = [];
    for (let i = 0; i < data.length; i++) {
        getDatabyRequest(data[i])
            .then(renderHTML);
    }
}


function renderHTML(data) {
    let popupTable = document.getElementById('table-body');
    let newRow = `<tr><td>${data.name} </td>
            <td>${data.height}</td>
            <td>${data.mass}</td>
            <td>${data.hair_color}</td>
            <td>${data.skin_color}</td>
            <td>${data.eye_color}</td>
            <td>${data.birth_year}</td>
            <td>${formateDataGender(data.gender)}</td>`;
    popupTable.insertAdjacentHTML('beforeend', newRow);
}

function popUp() {

    let popUpWindow = document.getElementById('popup');
    let popUpClose = document.getElementsByClassName("close");
    let tableBody = document.getElementById('table-body');
    if (popUpWindow.style.display === "block") {
        popUpWindow.style.display = "none";
    }
    popUpWindow.style.display = "block";

    console.log(popUpClose);
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


function addListenerButtonResident() {
    let btnArr = document.getElementsByClassName('resident');
    for (let btn of btnArr) {
        btn.addEventListener("click", function handler() {
            popUp(btn);
            let namePlanet = btn.parentElement.parentElement.firstElementChild.textContent;
            let popupHeader = document.getElementById('popup-header');
            popupHeader.textContent = `Residents of ${namePlanet}`;
            console.log(namePlanet);
            let url = btn.parentElement.getAttribute('url_pl');
            getDatabyRequest(url)
                .then(getLinkResidents)
                .then(getDataResidents);

        });

    }
}

window.onload = function main() {
    getDatabyToIndexPageRequest('https://swapi.co/api/planets/?page=1');
};

function formateDataDiameter() {
    let arrData = document.getElementsByClassName('diameter');
    for (let i = 0; i < arrData.length; i++) {
        let text = arrData[i].textContent;
        text = text.replace(/(\w+)(\w{3})/, "$1,$2 km");
        arrData[i].textContent = text;
    }
}

function formateDataPopulation() {
    let arrData = document.getElementsByClassName('population');
    for (let i = 0; i < arrData.length; i++) {
        let text = arrData[i].textContent;
        if (text !== "unknown") {
            text = text.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1,") + " people";
            arrData[i].textContent = text;
        }
    }
}

function formateDataSurface() {
    let arrData = document.getElementsByClassName('sur_water');
    for (let i = 0; i < arrData.length; i++) {
        let text = arrData[i].textContent;
        if (text !== "unknown") {
            text = text + "%";
            arrData[i].textContent = text;
        }
    }
}

function formateDataResidents() {
    let arrData = document.getElementsByClassName('residents');
    for (let i = 0; i < arrData.length; i++) {
        let text = arrData[i].textContent;
        if (text === '[]') {
            text = "No known residents";
            arrData[i].textContent = text;
        } else {
            let arrText = text.split(', ');
            let count = arrText.length;
            arrData[i].textContent = count;
            arrData[i].innerHTML = `<button id="r${i}" type="button" class="btn btn-outline-secondary resident">${count} resident(s)</button>`;
        }
    }
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
// function renderTableHeader() {
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
//     tablePlanet.insertAdjacentHTML('beforeend', renderTableHeader());
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

// function checkUserLogin(){
//     let user_name = document.querySelector("span");
//     let un = user_name.textContent;
//     console.log(un);
// }

// function getResidentsLink(data, btn) {
//     let buttonId = btn.getAttribute('id');
//     buttonId = parseInt(buttonId.substring(1), 10);
//     let results = data.results;
//     let residentsLinkArr;
//     for (let i = 0; i < results.length; i++) {
//         if (buttonId === i) {
//             residentsLinkArr = data.results[i].residents;
//         }
//     }
//     return residentsLinkArr;
// }
//
//
// function getResidentsData(residentsLinkArr) {
//     let residentsData = [];
//     for (let link of residentsLinkArr) {
//         residentsData = getDatabyRequest("GET", link);
//
//     }
//     return residentsData;
// }


function getLinkResidents(data) {
    return data['residents'];
}

function getDataResidents(data) {
    let urls = data;
    console.log(data);
    let aaar = [];
    for (let i = 0; i < data.length; i++) {
        getDatabyRequestAll(data[i])
        // .then(result => {aaar.append(data[i])})
            .then(console.log);

    }
}

function getDatabyRequestAll(url) {
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

function popUp() {
    let popUpWindow = document.getElementById('popup');
    let popUpClose = document.querySelector(".close");

    popUpWindow.style.display = "block";
    popUpClose.onclick = function () {
        popUpWindow.style.display = "none";
    };
    window.onclick = function (e) {
        if (e.target === popUpWindow) {
            popUpWindow.style.display = "none";
        }
    }
}


function addListenerButtonResident() {
    let btnArr = document.getElementsByClassName('resident');
    for (let btn of btnArr) {
        btn.addEventListener("click", function handler() {
            popUp(btn);
            console.log();
            btn.setAttribute("style", "background-color: aqua");
            let url = btn.parentElement.getAttribute('url_pl');
            getDatabyRequest(url)
                .then(getLinkResidents)
                .then(getDataResidents);


        });

    }


}


window.onload = function main() {
    formateDataDiameter();
    formateDataPopulation();
    formateDataSurface();
    formateDataResidents();
    addListenerButtonResident();
    // getDatabyRequest()
    //     .then(sendData)
    // .then(renderHTML)
    // .then(addListenerButtonResident)
    // .catch(console.log("============"))


};

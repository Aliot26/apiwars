function getDatabyRequest(method, url) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                resolve(data);
                console.log(data);
            } else {
                reject(console.log("We connected to the server, but it returned an error"));
            }
        };
        xhr.send();
    });
}

function formateDataDiameter(x) {
    return x.replace(/(\w+)(\w{3})/, "$1,$2 km");
}

function formateDataPopulation(x) {
    if (x === "unknown") {
        return x;
    }
    return x.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1,") + " people";
}

function formateDataSurface(x) {
    if (x === "unknown") {
        return x;
    }
    return x + "%";
}

function formateDataResidents(x, i) {
    if (x === 0) {
        x = "No known residents";
    } else {
        x = `<button id="r${i}" type="button" class="btn btn-outline-secondary resident" data-toggle="modal" data-target="#exampleModal">${x} resident(s)</button>`;
    }
    return x
}

function renderTableHeader() {
    let tableHeaderArr = ['Name', 'Diameter', 'Climate', 'Terrain',
        'Surface Water Percentage', 'Population', 'Residants', 'Vote'];
    let headerRow = "";

    for (let j = 0; j < tableHeaderArr.length; j++) {
        headerRow += `<th>${tableHeaderArr[j]}</th>`;
    }
    return '<tr>' + headerRow + '</tr>';
}

function renderHTML(data) {
    let tablePlanet = document.getElementById('table-planets');
    tablePlanet.insertAdjacentHTML('beforeend', renderTableHeader());
    let results = data.results;
    let newRow = "";
    for (let i = 0; i < results.length; i++) {
        newRow += `<tr><td>${results[i].name} </td>
            <td>${formateDataDiameter(results[i].diameter)}</td>
            <td>${results[i].climate}</td>
            <td>${results[i].terrain}</td>
            <td>${formateDataSurface(results[i].surface_water)}</td>
            <td>${formateDataPopulation(results[i].population)}</td>
            <td>${formateDataResidents(results[i].residents.length, i)}</td>
            <td><button type="button" class="btn btn-outline-secondary">vote</button></td></tr>`
    }
    tablePlanet.insertAdjacentHTML('beforeend', newRow);
    return data;
}



function getResidentsLink(data, btn) {
    let buttonId = btn.getAttribute('id');
    buttonId = parseInt(buttonId.substring(1), 10);
    let results = data.results;
    let residentsLinkArr;
    for (let i = 0; i < results.length; i++) {
        if (buttonId === i) {
            residentsLinkArr = data.results[i].residents;
        }
    }
    return residentsLinkArr;
}


function getResidentsData(residentsLinkArr){
    let residentsData = [];
    for(let link of residentsLinkArr){
        residentsData.push(getDatabyRequest("GET", link));
    }
    return residentsData;
}

function addListenerButtonResident(data) {
    let btnArr = document.getElementsByClassName('resident');
    for (let btn of btnArr) {
        btn.addEventListener("click", function handler() {
            btn.setAttribute("style", "background-color: aqua");
            let residentsLinkArr = getResidentsLink(data, btn);
            let residentsData = getResidentsData(residentsLinkArr);

            console.log(residentsLinkArr);

            console.log(residentsData);


        });

    }


}


function main() {
    getDatabyRequest("GET", 'https://swapi.co/api/planets/')
        .then(renderHTML)
        .then(addListenerButtonResident)
        .catch(console.log("============"))
}

main();
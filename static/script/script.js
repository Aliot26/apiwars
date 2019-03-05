function getDatabyRequest() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://swapi.co/api/planets/');
    xhr.onload = function () {

        if (xhr.status === 200) {
            let data = JSON.parse(xhr.responseText);
            console.log(data);
            renderHTML(data);
        } else {
            console.log("We connected to the server, but it returned an error");
        }
    };
    xhr.send();
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

function formateDataResidents(x) {
    if (x === 0) {
        x = "No known residents";
    } else {
        x = `<button type="button" class="btn btn-outline-secondary">${x} resident(s)</button>`;
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
            <td>${formateDataResidents(results[i].residents.length)}</td>
            <td><button type="button" class="btn btn-outline-secondary">vote</button></td></tr>`
    }
    tablePlanet.insertAdjacentHTML('beforeend', newRow);
}


function main() {
    getDatabyRequest();
}

main();
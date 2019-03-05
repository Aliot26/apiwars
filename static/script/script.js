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

function renderHTML(data) {
    let tableHeaderArr = ['Name', 'Diameter', 'Climate', 'Terrain',
        'Surface Water Percentage', 'Population', 'Residants', 'Vote'];
    let tablePlanet = document.getElementById('table-planets');
    let results = data.results;
    let newRow = "";
    for (let i = 0; i < results.length; i++) {
        newRow += '<tr><td>'+results[i].name+'</td>'+
            '<td>'+results[i].diameter+'</td>'+
            '<td>'+results[i].climate+'</td>'+
            '<td>'+results[i].terrain+'</td>'+
            '<td>'+results[i].surface_water+'</td>'+
            '<td>'+results[i].population+'</td>'+
            '<td>'+results[i].residents.length+'</td>'+
            '<td>vote</td></tr>'
    }
    tablePlanet.insertAdjacentHTML('beforeend', newRow);
}


function main() {
    getDatabyRequest();
}

main();
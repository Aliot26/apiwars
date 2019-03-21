export {
    formatDataDiameter,
    formatDataPopulation,
    formatDataSurface,
    formatDataResidents,
    formatDataGender,
    getIdFromUrl
}

function formatDataDiameter() {
    let arrData = document.getElementsByClassName('diameter');

    for (let i = 1; i < arrData.length; i++) {
        let text = arrData[i].textContent;

        if (text !== "unknown") {
            text = text.replace(/(\w+)(\w{3})/, "$1,$2 km");
            arrData[i].textContent = text;
        }
    }
}


function formatDataPopulation() {
    let arrData = document.getElementsByClassName('population');

    for (let i = 1; i < arrData.length; i++) {
        let text = arrData[i].textContent;

        if (text !== "unknown") {
            text = text.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1,") + " people";
            arrData[i].textContent = text;
        }
    }
}


function formatDataSurface() {
    let arrData = document.getElementsByClassName('surface_water');
    for (let i = 1; i < arrData.length; i++) {
        let text = arrData[i].textContent;

        if (text !== "unknown") {
            text = text + "%";
            arrData[i].textContent = text;
        }
    }
}


function formatDataResidents() {
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


function formatDataGender(gender) {
    switch (gender) {
        case 'male':
            gender = '<i class="fas fa-mars"></i>';
            break;
        case 'female':
            gender = '<i class="fas fa-venus"></i>';
            break;
        case 'n/a':
            gender = '<i class="fas fa-genderless"></i>';
            break;
        default:
            gender = 'unknown';
    }
    return gender;
}


function getIdFromUrl(url) {
    let idPlanet = url.match(/\d+/);
    idPlanet = idPlanet.join();
    return idPlanet;
}




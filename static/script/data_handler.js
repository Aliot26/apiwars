export {dataHandler}

let dataHandler = {
    _dataPlanets: {},

    _dataResidents: {},

    loadData: function (url) {
        if (url === undefined) {
            url = 'https://swapi.co/api/planets/?page=1';
        }
        this._dataResidents = {};
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                dataHandler._dataPlanets = JSON.parse(xhr.responseText);
            } else {
                console.log("We connected to the server, but it returned an error");
            }
        };
        xhr.send();
    },


    init: function () {
        this.loadData();

    },


    getTable: function (callback) {
        let planets = this._dataPlanets;
        callback(planets);
    },


    getUrlResidents: function (url) {
        let results = this._dataPlanets.results;
        let urlResidentsArr = [];
        for (let planet of results) {
            if (planet.url === url) {
                urlResidentsArr = planet.residents;
            }
        }
        dataHandler.loadResidents(urlResidentsArr);
    },


    loadResidents(urlResidentsArr) {
        this._dataResidents = {};
        for (let i in urlResidentsArr) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", urlResidentsArr[i]);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    dataHandler._dataResidents[i] = JSON.parse(xhr.responseText);
                } else {
                    console.log("We connected to the server, but it returned an error");
                }
            };
            xhr.send();
        }
    },


    getResidentsTable: function (callback) {
        let residents = this._dataResidents;
        callback(residents);
    },


    getUsername: function (username) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + username.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));

        return matches ? decodeURIComponent(matches[1]) : undefined;
    },


    sendVoteData: function (params) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/vote");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                console.log(params);
            } else {
                console.log("We connected to the server, but it returned an error");
            }
        };
        xhr.send(JSON.stringify(params));
    },


    listVotePlanetsId: function (name) {
        let nameCookie = name + "=";
        let partCookie = document.cookie.split(";");
        for (let i = 0; i < partCookie.length; i++) {
            let c = partCookie[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameCookie) == 0) {
                let stringId = c.substring(nameCookie.length, c.length);
                return stringId.split(":");
            }
        }
        return null;
    }
};




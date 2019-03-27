import {dom} from "./dom.js";

export {dataHandler}

let dataHandler = {
    keyInLocalStorage: 'apiwars',

    _dataPlanets: {},

    _dataResidents: {},

    _dataStatistics: {},

    saveDataLocalStorage: function (data) {
        localStorage.setItem(this.keyInLocalStorage, JSON.stringify(data));
    },

    loadDataLocalStorage: function () {
        return JSON.parse(localStorage.getItem(this.keyInLocalStorage));
    },

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


    getUsername: function () {
        let dataFromLocalStorage = this.loadDataLocalStorage();
        if (dataFromLocalStorage) {
            return dataFromLocalStorage['username'];
        } else {
            return null;
        }
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


    listVotePlanetsId: function () {
        let dataFromStorage = this.loadDataLocalStorage();
        let stringPlanetsId = dataFromStorage['id_planets'];
        return stringPlanetsId.split(":");
    },


    loginData: function (dataFromForm, url) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/' + url);

        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            let serverResponse = JSON.parse(xhr.responseText);
            if (serverResponse['success']) {
                dom.displayMessageToUser(serverResponse['success'], "block", url);
                dataHandler.saveDataLocalStorage(serverResponse);
                setTimeout(function () {
                    location.reload();
                }, 2000);
            } else {
                dom.displayMessageToUser(serverResponse['error'], "block", url);
            }
        };
        xhr.send(JSON.stringify(dataFromForm));
    },


    loadStatisticsData: function () {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", '/statistics');
        xhr.onreadystatechange = function () {
            if (xhr.status === 200 && xhr.readyState === 4) {
                dataHandler._dataStatistics = {};
                dataHandler._dataStatistics = JSON.parse(xhr.responseText);
            } else {
                console.log("We connected to the server, but it returned an error");
            }
        };
        xhr.send();
    },


    getTableStatistics: function (callback) {
        let statistics = this._dataStatistics;
        callback(statistics);
    }


};




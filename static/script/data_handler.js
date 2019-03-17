export {dataHandler}

let dataHandler = {
    _data: {},
    loadData: function (url) {
        if (url === undefined) {
            url = 'https://swapi.co/api/planets/?page=1';
        }
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function () {
            if (xhr.status === 200) {
                dataHandler._data = JSON.parse(xhr.responseText);
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
        let planets = this._data;
        callback(planets);
    },

    getResidents: function (callback) {
        
    }

};


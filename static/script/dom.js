import {dataHandler} from "./data_handler.js";
import{createTablePlanets} from "./planets.js";
import{createTableResidents} from "./residents.js";

export {dom}

let dom = {
    loadTable: function () {
        dataHandler.getTable(this.showTable);
    },
    showTable: function (data) {
        createTablePlanets(data);
    },
    
    loadResidentsTable: function () {
        dataHandler.getResidentsTable(this.showResidentsModal);
    },

    showResidentsModal: function (dataResidents) {
        setTimeout(function () {
           createTableResidents(dataResidents);
        },1000)

    }
    
};

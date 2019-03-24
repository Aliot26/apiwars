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

    },

    displayMessageToUser: function(message, style, idForm){
        let alertToUser = document.getElementById("alert-" +idForm);
        console.log(idForm);
        alertToUser.textContent = message;
        this.showHideBlock(alertToUser, "block");
    },

    showHideBlock: function (elem, style) {
        elem.style.display = style;
    }
};



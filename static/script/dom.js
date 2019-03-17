import {dataHandler} from "./data_handler.js";
import{createTablePlanets} from "./planets.js";

export {dom}

let dom = {
    loadTable: function () {
        dataHandler.getTable(this.showTable);
    },
    showTable: function (data) {
        createTablePlanets(data);
    },
    
    loadResidentTable: function () {
        
    }

    
    
};

import { dataHandler } from "./data_handler.js";
import {dom} from "./dom.js";
import {addListenerButtonResident, addListenerPaginator} from "./listener_handler.js";

function init() {

    dataHandler.init();

    let ww = "username";
    console.log(dataHandler.getUsername(ww));

    setTimeout(function () {
        dom.loadTable();
        addListenerButtonResident();
        addListenerPaginator();


    }, 2000);



}




init();

import { dataHandler } from "./data_handler.js";
import {dom} from "./dom.js";
import {addListenerButtonResident} from "./listener_handler.js";

function init() {

    dataHandler.init();

    setTimeout(function () {
        dom.loadTable();
        addListenerButtonResident();

    }, 2000);

}

init();

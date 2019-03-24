import { dataHandler } from "./data_handler.js";
import {dom} from "./dom.js";

function init() {

    dataHandler.init();

    setTimeout(function () {
        dom.loadTable();


    }, 3000);



}




init();

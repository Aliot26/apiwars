import { dataHandler } from "./data_handler.js";
import {dom} from "./dom.js";

function init() {

    dataHandler.init();

    let ww = "username";
    console.log(dataHandler.getUsername(ww));

    setTimeout(function () {
        dom.loadTable();


    }, 3000);



}




init();

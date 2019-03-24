import {dataHandler} from "./data_handler.js";
import {dom} from "./dom.js";
import {addListenerLogoutButton, addListenerUserModal} from "./listener_handler.js";

export {addLoginModal}

function addLoginModal() {
    let dataFromLocalStorage = dataHandler.loadDataLocalStorage();
    let buttonRegister = document.getElementById('register-button');
    let buttonLogin = document.getElementById('login-button');
    let buttonLogout = document.getElementById('btn_logout');
    let greetingMessage = document.getElementById('sign');
    if (dataFromLocalStorage) {
        dom.showHideBlock(buttonRegister, "none");
        dom.showHideBlock(buttonLogin, "none");
        dom.showHideBlock(buttonLogout, "block");
        greetingMessage.textContent = "Signed in as " + dataFromLocalStorage['username'];
        addListenerLogoutButton(buttonLogout);
    } else {
        dom.showHideBlock(buttonRegister, "block");
        addListenerUserModal(buttonRegister, "popup-register");
        dom.showHideBlock(buttonLogin, "block");
        addListenerUserModal(buttonLogin, "popup-login");
        dom.showHideBlock(buttonLogout, "none");
        greetingMessage.textContent = "";
    }
}

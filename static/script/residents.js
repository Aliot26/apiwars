import {formatDataGender} from "./format_data.js";
export {createTableResidents};

function createTableResidents(dataResidents) {
    let popupTable = document.getElementById('table-body');
    for (let i in dataResidents) {
        let newRow = `<tr><td>${dataResidents[i]['name']} </td>
            <td>${dataResidents[i]['height']}</td>
            <td>${dataResidents[i]['mass']}</td>
            <td>${dataResidents[i]['hair_color']}</td>
            <td>${dataResidents[i]['skin_color']}</td>
            <td>${dataResidents[i]['eye_color']}</td>
            <td>${dataResidents[i]['birth_year']}</td>
            <td class="gender">${formatDataGender(dataResidents[i]['gender'])}</td>`;
        popupTable.insertAdjacentHTML('beforeend', newRow);
    }
}
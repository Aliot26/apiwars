export {createTableStatistics}

function createTableStatistics(dataStatistics) {
    let popupTable = document.getElementById('table-body-stat');
    for (let i in dataStatistics) {
        let newRow = `<tr><td>${dataStatistics[i]['planet_name']} </td>
            <td>${dataStatistics[i]['recived_votes']}</td>`;
        popupTable.insertAdjacentHTML('beforeend', newRow);
    }
}
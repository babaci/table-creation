const btnColAdd = document.querySelector('#btn-col-add');
const inputColAdd = document.querySelector('#text-col-add');
const iMinus = document.querySelector('#column-inputs');
const btnTableCreate = document.querySelector('#btn-table-create');
const tableHeadsLength = document.querySelectorAll('thead tr th');
const btnTable = document.querySelector('.container');
const btnTableAdd = document.querySelector('#btn-table-data');

const inputCollAddLength = () => {
    return inputColAdd.value.length;
}

const clearColAdd = () => {
    inputColAdd.value = '';
    inputColAdd.focus();
}

const tableHeadCount = () => {
    return document.querySelectorAll('thead tr th').length;
}
const addColumnAfterCheck = () => {
    if(inputCollAddLength() > 0){
        addColumn();
    }
}

const infoText = () => {
    let divLength = document.querySelectorAll('.inner-col-add').length;
    let span = document.querySelector('#column-inputs-instruction');

    if(divLength > 0){
        span.classList.add('unhide');
    } else {
        span.classList.remove('unhide');
    }
}
const addButton = () => {
    if(document.querySelectorAll('#btn-table-data').length === 0){
        let div = document.querySelector('.buttons');
        let button = document.createElement('button');

        div.appendChild(button);
        button.classList.add('btn', 'btn-outline-primary');
        button.setAttribute('id', 'btn-table-data');
        button.innerText = 'Add data';
    }
}
const removeButton = () => {
    let inputFields = document.querySelectorAll('.inner-col-add');
    let btnTableDataAdd = document.querySelector('#btn-table-data');

    if(inputFields.length === 0) {
        btnTableDataAdd.remove();
    }
}

const clearInputFields = () => {
    const inputs = document.querySelectorAll('.inner-col-add input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

const addColumn = () => {
    infoText();
    let div = document.querySelector('#column-inputs');
    let divInner = document.createElement('div');
    let i = document.createElement('i');
    let input = document.createElement('input');

    div.appendChild(divInner);
    divInner.classList.add('inner-col-add');
    divInner.appendChild(i);
    i.classList.add('fas', 'fa-minus');
    divInner.appendChild(input);
    input.classList.add('form-control');
    input.setAttribute('type', 'text');
    input.setAttribute('id', 'typeText');
    input.setAttribute('placeholder', inputColAdd.value);

    infoText();
    clearColAdd();
    addButton();
}

const addColumnOnEnter = (event) => {
    if(inputCollAddLength() > 0 && event.keyCode === 13){
        addColumn();
        clearColAdd();
    }
}

const createTable = () => {
    if(tableHeadCount() === 0) {
        let checkDiv = document.querySelectorAll('.inner-col-add');
        let checkTable = document.querySelectorAll('table th');

        if(checkDiv.length > 0 && checkTable.length === 0) {
            let div = document.querySelector('div');
            let table = document.createElement('table');
            let thead = document.createElement('thead');
            let tr = document.createElement('tr');
            let th = document.createElement('th');
            
            div.appendChild(table);
            table.classList.add('table');
            table.appendChild(thead);
            thead.appendChild(tr);
            tr.appendChild(th);
            th.setAttribute('scope', 'col');
            th.innerText = '#';

            const headers = document.querySelectorAll('.inner-col-add input');

            for (let i = 0; i < headers.length; i++) {
                
                let th = document.createElement('th');

                tr.appendChild(th);
                th.setAttribute('scope', 'col');
                th.innerText = headers[i].placeholder;
                th.style.textTransform = 'uppercase';
            }
            addButton();
        }
    } else {
        addExtraTableHead();
    }
}

const addExtraTableHead = () => {
    let tableHeadNames = document.querySelectorAll('table thead tr th');
    let inputs = document.querySelectorAll('#column-inputs input');
    let table = document.querySelector('table');
    let thead = document.querySelector('thead');
    let tr = document.querySelector('tr');
    let th = document.createElement('th');

    const headers = document.querySelectorAll('.inner-col-add input');

    for (let i = 0; i < inputs.length; i++){
        if(inputs[i].placeholder !== tableHeadNames["length"].innerText) {
           tr.appendChild(th);
            th.setAttribute('scope', 'col');
            th.innerText = headers[i].placeholder;
            th.style.textTransform = 'uppercase';
            // console.log(headers[i].placeholder, inputs[i].placeholder, tableHeadNames[i+1].innerText);
        }
    }
}

const addItemsToTable = () => {
    // if(firstName.value !== '' && lastName.value !== '' && handle.value !== '') {

    let rowNum = document.querySelectorAll('tbody tr').length + 1;        
    let table = document.querySelector('.table');
    let tbody = document.createElement('tbody');
    let tr = document.createElement('tr');
    let th = document.createElement('th');

    table.appendChild(tbody);
    tbody.appendChild(tr);
    tr.appendChild(th);
    th.setAttribute('scope', 'row');
    th.innerText = rowNum;

    const inputs = document.querySelectorAll('.inner-col-add input');
    
    for(let i = 0; i < inputs.length; i++) {
        
        let td = document.createElement('td');

        tr.appendChild(td);
        td.innerText = inputs[i].value;
    }
    clearInputFields();
    // }
}

document.addEventListener('click', function(e) {
    if(e.target.id === 'btn-table-data'){
        console.log(e.target.id);
        addItemsToTable();
    }
});

const columnHeadRemove = (e) => {
    let heads = document.querySelectorAll('thead tr th');
    for(let i = 0; i < heads.length; i++) {
        if(e.path[0].nodeName === 'I' && e.srcElement.nextSibling.placeholder === heads[i].innerText){
            e.target.parentElement.remove();
            heads[i].remove();
            infoText();
            removeButton();
            console.log(e.target);
        }
    }
    if(e.path[0].nodeName === 'I' && heads.length === 0){
            e.target.parentElement.remove();
            infoText();
            removeButton();
            console.log(e.target);
    } else if(e.path[0].nodeName === 'I' && document.querySelectorAll('thead tr th').length === 1){
        let lastTableHead = document.querySelector('thead tr th');
        lastTableHead.remove();
        removeButton();
        infoText();
        console.log(e.target);
    }
}


btnColAdd.addEventListener('click', addColumnAfterCheck);
inputColAdd.addEventListener('keypress', addColumnOnEnter);
iMinus.addEventListener('click', columnHeadRemove);
btnTableCreate.addEventListener('click', createTable);


























// const firstName = document.querySelector('#firstName');
// const lastName = document.querySelector('#lastName');
// const handle = document.querySelector('#handle');
// const button = document.querySelector('#btn-submit');
// const colName = document.querySelector('#new-column');
// const btnAddCol = document.querySelector('#btn-add-col');
// const heads = document.querySelectorAll('thead th');

// const clearInputFields = () => {
//     firstName.value = '';
//     lastName.value = '';
//     handle.value = '';

//     // Columns
//     colName.value = '';
// }

// const addColHead = () => {
//     let thead = document.querySelector('thead tr');
//     let th = document.createElement('th');
//     let div = document.querySelector('.input-fields');
//     let button = document.querySelector('.input-button');
//     let input = document.createElement('input');

//     thead.appendChild(th);
//     th.setAttribute('scope', 'col');
//     th.innerText = colName.value;

//     div.insertBefore(input, button);
//     input.setAttribute('id', colName.value);
//     input.classList.add('form-control');
//     input.setAttribute('placeholder', colName.value);

//     clearInputFields();

// }

// btnAddCol.addEventListener("click", addColHead);

// const addItemsToTable = () => {
//     if(firstName.value !== '' && lastName.value !== '' && handle.value !== '') {
//             let rowNum = document.querySelectorAll('tbody tr').length + 1;
//             let tbody = document.querySelector('tbody');
//             let tr = document.createElement('tr');
//             let th = document.createElement('th');
//             let td1 = document.createElement('td');
//             let td2 = document.createElement('td');
//             let td3 = document.createElement('td');
            
//             tbody.appendChild(tr);
//             tr.appendChild(th);
//             th.setAttribute('scope', 'row');
//             th.innerText = rowNum;
//             tr.appendChild(td1);
//             td1.innerText = firstName.value;
//             tr.appendChild(td2);
//             td2.innerText = lastName.value;
//             tr.appendChild(td3);
//             td3.innerText = handle.value;

//         clearInputFields();
//     }

// }

// button.addEventListener('click', addItemsToTable);
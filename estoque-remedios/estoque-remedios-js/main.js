'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active');

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')
}

const tempClient = {
    nome: "Dipirona",
    descricao: "Dor de cabeça",
    quantidade: "55",
}

const getLocalStrorage = () => JSON.parse(localStorage.getItem('db_medicine')) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("db_medicine", JSON.stringify(dbClient));

//CRUD - create read update delete

//DELETE
const deleteClient = (index) => {
    const dbClient = readClient();
    dbClient.splice(index, 1);
    setLocalStorage(dbClient)
}
//UPDATE
const updateClient = (index, client) => {
    const dbClient = readClient();
    dbClient[index] = client;
    setLocalStorage(dbClient);
}

//READ
const readClient = () => getLocalStrorage();

//CREATE
const createClient = (client) => {
    const dbClient = getLocalStrorage();
    dbClient.push(client);
    setLocalStorage(dbClient)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

//Interação com o layout

const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = '')
}

//Interação com o Layout
const saveClient = () => {
    if(isValidFields()){
        const client = {
            nome: document.getElementById('nome-remedio').value,
            descricao: document.getElementById('descricao-remedio').value,
            quantidade: document.getElementById('quantidade-remedio').value,
        }
        const index = document.getElementById('nome-remedio').dataset.index;
        if (index == 'new') {
            createClient(client);
            clearFields();
            updateTable();
            closeModal();   
        }else {
            updateClient(index, client);
            updateTable();
            closeModal();
        }
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.descricao}</td>
        <td>${client.quantidade}</td>
        <td>
            <button type="button" class="button green" id="edit-${index}">Editar</button>
            <button type="button" class="button red" id="delete-${index}" >Excluir</button>
        </td>
    `
    document.querySelector('#tableClient>tbody ').appendChild(newRow)
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
    const dbClient = readClient();
    clearTable();
    dbClient.forEach(createRow);
}

const fillFields = (client) => {
    document.getElementById('nome-remedio').value = client.nome;
    document.getElementById('descricao-remedio').value = client.descricao;
    document.getElementById('quantidade-remedio').value = client.quantidade;
    document.getElementById('nome-remedio').dataset.index = client.index;
}

const editClient = (index) => {
    const client = readClient()[index];
    client.index = index;
    fillFields(client);
    openModal();
}

const editDelete = (event) => {
    if (event.target.type == 'button') {

        const [action, index] = event.target.id.split('-');

        if (action == 'edit') {
            editClient(index)
        } else {
            const client = readClient()[index];
            const response = confirm (`Deseja realmente excluir o remédio ${client.nome}?`)
            if (response) {
                deleteClient(index);
                updateTable();
                
            }
        }
        
    }
}

updateTable();

//Eventos 
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal);

document.getElementById('modalClose')
    .addEventListener('click', closeModal);

document.getElementById('salvar')
    .addEventListener('click', saveClient);

document.querySelector('#tableClient>tbody')
    .addEventListener('click', editDelete)
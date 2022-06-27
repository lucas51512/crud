'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active');

const closeModal = () => document.getElementById('modal')
    .classList.remove('active');

const tempClient = {
    nome: "Nicolas",
    email: "Nicolas@gmail.com",
    celular: "18996258875",
    cidade: "Assis"
}

const getLocalStrorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient));

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

//Eventos 
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal);

document.getElementById('modalClose')
    .addEventListener('click', closeModal);
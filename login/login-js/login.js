const emailCadastrado = 'lucas@gmail.com';
const senhaCadastrada = 'admin';



const botaoLogin = document.getElementById('botao-login').addEventListener('click', (e) => {
    e.preventDefault();
    let emailEscrito = document.getElementById('email').value;
    let senhaEscrita = document.getElementById('senha').value;
    
    if (emailEscrito !== emailCadastrado || senhaEscrita !== senhaCadastrada) {
        alert('Usuario ou senha incorretos')
    }else{
        window.location.href = "../../pagina-inicial/index.html"
    }

});

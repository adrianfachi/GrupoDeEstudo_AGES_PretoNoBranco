const operacao = document.getElementById('texto-operacao');
const resultado = document.getElementById('resultado')
const tema = document.getElementById('tema')
let fezOperacao = false

const temaCheck = document.getElementById('tema-input');
temaCheck.addEventListener('change', () => {
    if(temaCheck.checked) {
        tema.setAttribute('href', 'calculadoraWhite.css');
        operacao.style.color = "#000000"
    } else {
        tema.setAttribute('href', 'calculadoraBlack.css');
        operacao.style.color = "#ffffff"
    }
})


function inserir(num){
    if(fezOperacao) {
        operacao.id = "texto-operacao"
        operacao.innerHTML = resultado.innerHTML
        operacao.style.fontSize = "50px"
        if(temaCheck.checked) {
            operacao.style.color = "#000000"
        } else { 
            operacao.style.color = "#ffffff"
        }
        resultado.innerHTML = ""
        fezOperacao = false
    }
    const numero = operacao.innerHTML
    operacao.innerHTML = numero + num
}

function deletar(){
    operacao.innerHTML = operacao.innerHTML.substring(0, operacao.innerHTML.length - 1)
}

function deletarTudo() {
    location.reload()
}

function alteraSinal () {
    const ultimoEspaco = operacao.innerHTML.lastIndexOf(" ")
    if(ultimoEspaco === -1) {
        operacao.innerHTML = eval(operacao.innerHTML + " * -1")
    } else {
        const ultimoNumero = operacao.innerHTML.substring(ultimoEspaco);
        const antesUltimoNumero = operacao.innerHTML.substring(0, ultimoEspaco);
        operacao.innerHTML = antesUltimoNumero + " " + eval(ultimoNumero + " * -1")
    }
}

function res(){
    let operacaoFinal = operacao.innerHTML

    if(operacaoFinal.includes("%")){
        operacaoFinal = operacaoFinal.replace("%", "/ 100")
    }

    if(operacao.innerHTML.length != 0){
        operacao.style.fontSize = "20px"
        operacao.style.color = "#4E505F"
        resultado.innerHTML = eval(operacaoFinal)
        fezOperacao = true
    }else{
        operacao.innerHTML = "Nada para calcular"
    }
}

document.addEventListener('keydown', function(event) {
    const tecla = event.key;

    if (!isNaN(tecla)) {
        inserir(tecla);
    }

    else if (tecla === '+') {
        inserir(' + ');
    }
    else if (tecla === '-') {
        inserir(' - ');
    }
    else if (tecla === '*') {
        inserir(' * ');
    }
    else if (tecla === '/') {
        inserir(' / ');
    }
    else if (tecla === '%') {
        inserir('%');
    }
    else if (tecla === '.' || tecla === ',') {
        inserir('.');
    }

    else if (tecla === 'Enter') {
        res();
    }

    else if (tecla === 'Backspace') {
        deletar();
        event.preventDefault();
    }

    else if (tecla === 'Escape') {
        deletarTudo();
    }
});

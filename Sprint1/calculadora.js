const operacao = document.getElementById('texto-operacao');
const resultado = document.getElementById('resultado')
const tema = document.getElementById('tema')
let fezOperacao = false
let operacaoInterna = "";

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

function formatarExpressao(expr) {
    // Substitui todos os números isolados por sua versão formatada
    return expr.replace(/(\d+(\.\d+)?)/g, function(numero) {
        console.log(numero)
        // Troca ponto por vírgula para decimais, mas mantém ponto para milhar
        let num = Number(numero.replace(',', '.'));
        if (isNaN(num)) return numero;
        return num.toLocaleString('pt-BR');
    });
}

function inserir(num){
    if(fezOperacao) {
        operacao.innerHTML = operacaoInterna
        operacao.style.fontSize = "50px"
        if(temaCheck.checked) {
            operacao.style.color = "#000000"
        } else { 
            operacao.style.color = "#ffffff"
        }
        resultado.innerHTML = ""
        fezOperacao = false
    }
    
    operacaoInterna += num
    operacao.innerHTML = formatarExpressao(operacaoInterna)
}

function deletar(){
    operacaoInterna = operacaoInterna.substring(0, operacaoInterna.length - 1)
    operacao.innerHTML = formatarExpressao(operacaoInterna)
}

function deletarTudo() {
    location.reload()
}

function alteraSinal () {
    const ultimoEspaco = operacaoInterna.lastIndexOf(" ")
    if(ultimoEspaco === -1) {
        operacaoInterna = String(eval(operacaoInterna + " * -1"))
        operacao.innerHTML = formatarExpressao(operacaoInterna)
    } else {
        const ultimoNumero = operacaoInterna.substring(ultimoEspaco);
        const antesUltimoNumero = operacaoInterna.substring(0, ultimoEspaco);
        operacaoInterna = antesUltimoNumero + " " + eval(ultimoNumero + " * -1")
        operacao.innerHTML = formatarExpressao(operacaoInterna)
    }
    console.log(operacaoInterna)
}

function res(){
    let operacaoFinal = operacaoInterna

    if(operacaoFinal.includes("%")){
        operacaoFinal = operacaoFinal.replace("%", "/ 100")
    }

    if(operacao.innerHTML.length != 0){
        operacao.style.fontSize = "20px"
        operacao.style.color = "#4E505F"
        operacaoInterna = String(eval(operacaoFinal))
        resultado.innerHTML = formatarExpressao(operacaoInterna)
        fezOperacao = true
    }else{
        operacao.innerHTML = "Nada para calcular"
    }
}

document.addEventListener('keydown', function(event) {
    
    document.querySelectorAll('input').forEach(btn => {
        btn.addEventListener('click', function() {
            this.blur() // remove o foco do botão
        })
    })

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
        event.preventDefault
    }

    else if (tecla === 'Backspace') {
        deletar();
        event.preventDefault();
    }

    else if (tecla === 'Escape') {
        deletarTudo();
        event.preventDefault
    }
});

const operacao = document.getElementById('texto-operacao');
const resultado = document.getElementById('resultado')
const tema = document.getElementById('tema')
let fezOperacao = false
let operacaoInterna = ""
let ultimaOperacao = ""

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
    return expr.replace(/(\d+(\.\d+)?)/g, function(numero) {
        let num = Number(numero.replace(',', '.'));
        if (isNaN(num)) return numero;
        return num.toLocaleString('pt-BR', {
            maximumFractionDigits: 8
        });
    });
}

function inserir(num){
    if(fezOperacao) {
        if(!isNaN(operacaoInterna)) {
            operacao.innerHTML = operacaoInterna
        } else {
            operacaoInterna = 0
            operacao.innerHTML = 0
        }   
        operacao.style.fontSize = "50px"
        if(temaCheck.checked) {
            operacao.style.color = "#000000"
        } else { 
            operacao.style.color = "#ffffff"
        }
        resultado.innerHTML = ""
        fezOperacao = false
    }
    

    if (isNaN(operacaoInterna[operacaoInterna.length -1])) {
        if (num == "+" || num == "*" || num == "/" || num == "-") {
            operacaoInterna = operacaoInterna.substring(0, operacaoInterna.length - 1)
            operacaoInterna += num
        }else {
            operacaoInterna += num
        }
    } else {
        operacaoInterna += num
    }
    operacao.innerHTML = formatarExpressao(operacaoInterna)
    ultimaOperacao = num
}

function deletar(){
    if(isNaN(operacaoInterna[operacaoInterna.length - 1])) {
        operacaoInterna = operacaoInterna.substring(0, operacaoInterna.length - ultimaOperacao.length)
        operacao.innerHTML = formatarExpressao(operacaoInterna)
    } else {
        operacaoInterna = operacaoInterna.substring(0, operacaoInterna.length - 1)
        operacao.innerHTML = formatarExpressao(operacaoInterna)
    }
}

function deletarTudo() {
    operacao.style.fontSize = "50px"
    if(temaCheck.checked) {
        operacao.style.color = "#000000"
    } else { 
        operacao.style.color = "#ffffff"
    }
    operacaoInterna = ""
    operacao.innerHTML = "0"
    resultado.innerHTML = ""
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
}

function fatorial(n) {
    if (n < 0) return NaN;
    if (n === 0) return 1;
    let r = 1;
    for (let i = 1; i <= n; i++) r *= i;
    return r;
}

function res(){
    let operacaoFinal = operacaoInterna

    operacaoFinal = operacaoFinal
        .replace(/(\d)(sin|cos|tan|log|ln|√)/g, '$1*$2')
        .replace(/\)(sin|cos|tan|log|ln|√)/g, ')*$1')
        .replace(/%/g, "/100")
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/√(\d+(\.\d+)?)/g, "Math.sqrt($1)")
        .replace(/(\d+(\.\d+)?)\^(\d+(\.\d+)?)/g, "Math.pow($1,$3)")
        .replace(/sin\(([^)]+)\)/g, "Math.sin($1*Math.PI/180)")
        .replace(/cos\(([^)]+)\)/g, "Math.cos($1*Math.PI/180)")
        .replace(/tan\(([^)]+)\)/g, "Math.tan($1*Math.PI/180)")
        .replace(/log\(([^)]+)\)/g, "Math.log10($1)")
        .replace(/ln\(([^)]+)\)/g, "Math.log($1)")
        

    operacaoFinal = operacaoFinal.replace(/(\d+)!/g, function(_, n) {
        return fatorial(Number(n));
    });

    if(operacao.innerHTML.length != 0){
        operacao.style.fontSize = "20px"
        operacao.style.color = "#4E505F"
        operacaoFinal = operacaoFinal.replace(/\b0+(\d+)/g, '$1');
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
            this.blur()
        })
    })

    const tecla = event.key;

    if (!isNaN(tecla)) {
        inserir(tecla);
    }
    else if (tecla === '+') {
        inserir('+');
    }
    else if (tecla === '-') {
        inserir('-');
    }
    else if (tecla === '*') {
        inserir('*');
    }
    else if (tecla === '/') {
        inserir('/');
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

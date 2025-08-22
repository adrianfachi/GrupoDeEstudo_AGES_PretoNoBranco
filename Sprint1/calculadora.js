const operacao = document.getElementById('texto-operacao');
const resultado = document.getElementById('resultado')
const tema = document.getElementById('tema')
let fezOperacao = false
let operacaoInterna = ""
let ultimaOperacao = ""
const temaCheck = document.getElementById('tema-input');

//troca de tema da calculadora black ou white
temaCheck.addEventListener('change', () => {
    if(temaCheck.checked) {
        tema.setAttribute('href', 'calculadoraWhite.css');
        operacao.style.color = "#000000"
    } else {
        tema.setAttribute('href', 'calculadoraBlack.css');
        operacao.style.color = "#ffffff"
    }
})

//funcao de inserir o caractere
function inserir(num){
    //verifica se foi feita a operação para alterar o css e o html
    if(fezOperacao) {
        if(!isNaN(operacaoInterna)) {
            operacao.innerHTML = operacaoInterna
        } else {
            operacaoInterna = 0
            operacao.innerHTML = 0
        }   
        operacao.style.fontSize = "2.5rem"
        if(temaCheck.checked) {
            operacao.style.color = "#000000"
        } else { 
            operacao.style.color = "#ffffff"
        }
        resultado.innerHTML = ""
        fezOperacao = false
    }

    //nao deixa repetir 2 pontos no mesmo numero
    if (num === ".") {
        const partes = operacaoInterna.split(/[\+\-\*\/\(\)%]/)
        const ultimoNumero = partes[partes.length - 1]
        if (ultimoNumero.includes(".")) {
            return;
        }
    }

    //verificacoes
    if (isNaN(operacaoInterna[operacaoInterna.length - 1])) {//se o ultimo digito nao for numero
        //verifica se é operacao padrao
        if (num == "+" || num == "*" || num == "/" || num == "-" ) {
            //deixa adicionar todas operaçoes se a ultimaOperacao é )πe!%
            if(ultimaOperacao == ")" || ultimaOperacao == "π"|| ultimaOperacao == "e" || ultimaOperacao == "!" || ultimaOperacao == "%") {
                operacaoInterna += num
                ultimaOperacao = num
            } else if(operacaoInterna[operacaoInterna.length - 1] == "("){// se a ultima opercao for ( deixa adicionar + e -
                if (num != "*" || num != "/") {
                    operacaoInterna += num
                    ultimaOperacao = num
                }
            }else {//em qualquer outro caso deixa add qualquer operação padrao
                operacaoInterna = operacaoInterna.substring(0, operacaoInterna.length - 1)
                operacaoInterna += num
                ultimaOperacao = num
            }
        }else { //se nao for opercao padrao
                operacaoInterna += num
                ultimaOperacao = num
        }
    } else {// se o ultimo digito for um numero pode adicionar qualquer coisa
            operacaoInterna += num
            ultimaOperacao = num
    }
    //printa na tela na versao formatada
    operacao.innerHTML = operacaoInterna
    
}

function deletar(){
    let ultimoDig = operacaoInterna.substring(operacaoInterna.length-4, operacaoInterna.length)
    //se o ultimos 4 digitos sao cos, tan sin ou log apaga 4 digitos
    if(ultimoDig == "cos(" || ultimoDig == "tan(" ||ultimoDig == "sin(" || ultimoDig == "log(") {
        operacaoInterna = operacaoInterna.substring(0, operacaoInterna.length - 4)
        operacao.innerHTML = operacaoInterna
    } else if (operacaoInterna.substring(operacaoInterna.length-3, operacaoInterna.length) == "ln(") {
        //se o ultimos 3 digitos sao ln apaga 3 digitos
        operacaoInterna = operacaoInterna.substring(0, operacaoInterna.length - 3)
        operacao.innerHTML = operacaoInterna
    } else {//se for outra coisa apaga 1 digito
        operacaoInterna = operacaoInterna.substring(0, operacaoInterna.length - 1)
        operacao.innerHTML = operacaoInterna
    }
}
//reseta os valores a zero e volta ao style padrao
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

function parenteses () {
    //verifica qual parenteses vai ser usado
    if(operacaoInterna[operacaoInterna.length - 1] != "(") {
        if(operacaoInterna.lastIndexOf("(") > operacaoInterna.lastIndexOf(")")) {
        operacaoInterna += ")"
        ultimaOperacao = ")"
    } else {
        operacaoInterna += "("
        ultimaOperacao = "("
    }
    operacao.innerHTML = operacaoInterna
    }
    
}

//função fatorial
function fatorial(n) {
    if (n < 0) return NaN;
    if (n === 0) return 1;
    let r = 1;
    for (let i = 1; i <= n; i++) r *= i;
    return r;
}

function res() {
    //coloca parenteses no final em caso de não ter (ajuda de IA)
    let aberto = (operacaoInterna.match(/\(/g) || []).length;
    let fechado = (operacaoInterna.match(/\)/g) || []).length;
    if (aberto > fechado) {
        operacaoInterna += ")".repeat(aberto - fechado);
        ultimaOperacao = ")";
        operacao.innerHTML = operacaoInterna;
    }

    //alguns replaces antes do calc eval()
    let operacaoFinal = operacaoInterna
    operacaoFinal = operacaoFinal
        .replace(/(\d+)\s*\(/g, "$1*(") //em caso de num( faz num*(
        .replace(/\)\s*(\d+)/g, ")*$1") //em caso de )num faz )*num
        .replace(/\)\s*\(/g, ")*(")  // em caso de )( faz )*(
        .replace(/(\d)(sin|cos|tan|log|ln|√|π|e)/g, "$1*$2") //em caso de num e alguma função faz num*função
        .replace(/\)(sin|cos|tan|log|ln|√|π|e)/g, ")*$1") //em caso de ) e função faz )*função
        .replace(/(π|e)([^\s\^]+)/g, "$1*$2") //em caso de PI ou "e" mais algo faz PI*algo
        .replace(/π/g, "Math.PI") //transforma PI no número
        .replace(/e/g, "Math.E") //transforma e no número
        .replace(/√([A-Za-z0-9\.\(\)]+)/g, "Math.sqrt($1)") //faz a raiz quadrada se achar o simbolo
        .replace(/sin\(([^)]+)\)/g, "Math.sin(($1)*Math.PI/180)") //faz a seno se achar o sin
        .replace(/cos\(([^)]+)\)/g, "Math.cos(($1)*Math.PI/180)") //faz o cosseno se achar o cos
        .replace(/tan\(([^)]+)\)/g, "Math.tan(($1)*Math.PI/180)") //faz a tangente se achar o tan
        .replace(/log\(([^)]+)\)/g, "Math.log10($1)") //faz a logaritimo em base 10 se achar o log
        .replace(/ln\(([^)]+)\)/g, "Math.log($1)") //faz a logaritimo de base e se achar o ln
        .replace(/(\d)(%)+(?=\d)/g, "$1$2*") //em caso de achar um num%num faz num%*num
        .replace(/%/g, "/100") //trasforma % em /100
        .replace(/!([A-Za-z0-9\(πe√])/g, "!*$1"); // em caso de !algo faz !*algo

    //faz o Math pow com qualquer coisa de antes ^ qualquer coisa que estiver depois (ajuda de IA)
    operacaoFinal = operacaoFinal.replace(
        /((?:Math\.\w+\([^\^]*\)|\([^\^]*\)|[A-Za-z0-9\.\_]+))\^((?:Math\.\w+\([^\^]*\)|\([^\^]*\)|[A-Za-z0-9\.\_]+))/g,
        "Math.pow($1,$2)"
    );
    //chama a função fatorial
    operacaoFinal = operacaoFinal.replace(/([A-Za-z0-9\)\.]+)!/g, function(match, expr) {
        return `fatorial(${expr})`;
    });

    //tira os zeros da parte inteira para não dar erro no eval (ajuda de IA)
    operacaoFinal = operacaoFinal.replace(/\d+(\.\d+)?/g, (numero) => {
        if (numero.includes(".")) {
            let [intPart, fracPart] = numero.split(".");
            intPart = intPart.replace(/^0+(?=\d)/, "");
            return (intPart === "" ? "0" : intPart) + "." + fracPart;
        } else {
            return numero.replace(/^0+(?=\d)/, "");
        }
    });

    //faz a operação se nao estiver em branco
    if (operacao.innerHTML.length != 0) {
        //esliza a operacao
        operacao.style.fontSize = "20px";
        operacao.style.color = "#4E505F";
        try {
            //faz o eval
            console.log("Expressão final:", operacaoFinal)
            operacaoInterna = String(eval(operacaoFinal))
            console.log("Resuldado final:", operacaoInterna)
            //printa no resultado
            resultado.innerHTML = operacaoInterna
            fezOperacao = true;//troca para verificar no inserir()
        } catch (error) {
            //verificação de erro
            console.log(error);
            resultado.innerHTML = "Operação inválida";
            operacaoInterna = "0";
            fezOperacao = true;
        }
    } else {
        operacao.innerHTML = "Nada para calcular";
    }
}

//funções keydown para poder digitar
document.addEventListener('keydown', function(event) {
    //tira o foco do botão para não dar conflito
    document.querySelectorAll('input').forEach(btn => {
        btn.addEventListener('click', function() {
            this.blur()
        })
    })

    const tecla = event.key;

    
    if (!isNaN(tecla)) {
        inserir(tecla)
    }
    else if (tecla === '+') {
        inserir('+')
    }
    else if (tecla === '-') {
        inserir('-')
    }
    else if (tecla === '*') {
        inserir('*')
    }
    else if (tecla === '/') {
        inserir('/')
    }
    else if (tecla === '%') {
        inserir('%')
    }
    else if (tecla === '.' || tecla === ',') {
        inserir('.')
    }

    else if (tecla === 'Enter') {
        res()
        event.preventDefault()
    }

    else if (tecla === 'Backspace') {
        deletar()
        event.preventDefault()
    }

    else if (tecla === 'Escape') {
        deletarTudo()
        event.preventDefault()
    }
});

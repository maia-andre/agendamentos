var buttonNovoEvento = document.getElementById('buttonNovoEvento');
var buttonCancelar = document.getElementById('buttonCancelar');
var novoEvento = document.getElementById('novoEvento');
var formNovoEvento = document.getElementById('formNovoEvento');
var inputNomeEvento = document.getElementById('nomeEvento');
var inputDataEvento = document.getElementById('dataEvento');
var divMensagemErro = document.getElementById('mensagemErro');

var listaAgendamentos = [];

function atualizarAgendamentos() {
    
}

function limparNovoEvento() {
    inputNomeEvento.value = '';
    inputDataEvento.value = '';
    inputNomeEvento.classList.remove('is-invalid');
    inputDataEvento.classList.remove('is-invalid');
    divMensagemErro.classList.add('d-none');
    divMensagemErro.innerHTML = '';
}

function mostrarNovoEvento() {
    novoEvento.classList.remove('d-none');
    limparNovoEvento();
}

function ocultarNovoEvento() {
    
    novoEvento.classList.add('d-none');
}

function novoEventoValido(nomeEvento, dataEvento) {
    var validacaoOk = true;
    var erro = '';
    if (nomeEvento.trim().length === 0) {
        erro = 'O nome do evento é obrigatório!';
        inputNomeEvento.classList.add('is-invalid');
        validacaoOk = false;
    } else {
        inputNomeEvento.classList.remove('is-invalid');
    }
    var timestampEvento = Date.parse(dataEvento);
    var timestampAtual = (new Date()).getTime();
    if (isNaN(timestampEvento) || timestampEvento < timestampAtual) {
        if (erro.length > 0) {
            erro += '<br>'
        }
        erro += 'A data é obrigatória e deve ser maior que a data atual!';
        inputDataEvento.classList.add('is-invalid');
        validacaoOk = false;
    } else {
        inputDataEvento.classList.remove('is-invalid');
    }

    if (!validacaoOk) {
        divMensagemErro.innerHTML = erro;
        divMensagemErro.classList.remove('d-none');
    } else {
        divMensagemErro.classList.add('d-none');
    }

    return validacaoOk;
}

function salvarNovoEvento(event) {
    event.preventDefault();
    var nomeEvento = inputNomeEvento.value;
    var dataEvento = inputDataEvento.value;
    if (novoEventoValido(nomeEvento, dataEvento)) {
        console.log('Evento é válido!');
    } else {
        console.log('Evento é inválido!');
    }
}

buttonNovoEvento.addEventListener('click', mostrarNovoEvento);
buttonCancelar.addEventListener('click', ocultarNovoEvento);
formNovoEvento.addEventListener('submit', salvarNovoEvento);
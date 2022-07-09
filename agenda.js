var buttonNovoEvento = document.getElementById('buttonNovoEvento');
var buttonCancelar = document.getElementById('buttonCancelar');
var novoEvento = document.getElementById('novoEvento');
var formNovoEvento = document.getElementById('formNovoEvento');
var inputNomeEvento = document.getElementById('nomeEvento');
var inputDataEvento = document.getElementById('dataEvento');
var inputQtdePassageiros = document.getElementById('qtdePassageiros');
var inputNomeMotorista = document.getElementById('nomeMotorista');
var divMensagemErro = document.getElementById('mensagemErro');
var tabelaAgendamentos = document.getElementById('tabelaAgendamentos');

var listaAgendamentos = [];

function removerAgendamento(event){
    var posicao = event.target.getAttribute('data-agenda');
    listaAgendamentos.splice(posicao, 1);
    atualizarAgendamentos();
}

function atualizarAgendamentos() {
    if (listaAgendamentos.length === 0){
        tabelaAgendamentos.innerHTML = '<tr><td colspan="5">Nenhum agendamento</td></tr>';
        return;
    }
    tabelaAgendamentos.innerHTML = '';
    for (var i = 0; i < listaAgendamentos.length; i++){
        var agendamento = listaAgendamentos[i];
        var linha = document.createElement('tr');
        var celulaNome = document.createElement('td');
        var celulaData = document.createElement('td');
        var celulaPass = document.createElement('td');
        var celulaMot = document.createElement('td');
        var celulaAcoes = document.createElement('td');
        var botaoExcluir = document.createElement('button');
        botaoExcluir.setAttribute('data-agenda', i);
        botaoExcluir.classList.add('btn');
        botaoExcluir.classList.add('btn-danger');
        botaoExcluir.classList.add('btn-sm');
        botaoExcluir.addEventListener('click', removerAgendamento);
        celulaNome.innerText = agendamento.nome;
        celulaData.innerText = agendamento.data;
        celulaPass.innerText = agendamento.passageiros;
        celulaMot.innerText = agendamento.motorista;
        botaoExcluir.innerText = "Remover";
        celulaAcoes.appendChild(botaoExcluir);
        linha.appendChild(celulaNome);
        linha.appendChild(celulaData);
        linha.appendChild(celulaPass);
        linha.appendChild(celulaMot);
        linha.appendChild(celulaAcoes);
        tabelaAgendamentos.appendChild(linha);
    }
}

function limparNovoEvento() {
    inputNomeEvento.value = '';
    inputDataEvento.value = '';
    inputQtdePassageiros.value = '';
    inputNomeMotorista.value = '';
    inputNomeEvento.classList.remove('is-invalid');
    inputDataEvento.classList.remove('is-invalid');
    inputQtdePassageiros.classList.remove('is-invalid');
    inputNomeMotorista.classList.remove('is-invalid');
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

function novoEventoValido(nomeEvento, dataEvento, qtdePassageiros, nomeMotorista) {
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

    if (qtdePassageiros.trim().length === 0) {
        erro = 'É necessário informar os passageiros!';
        inputQtdePassageiros.classList.add('is-invalid');
        validacaoOk = false;
    } else {
        inputQtdePassageiros.classList.remove('is-invalid');
    }

    if (nomeMotorista.trim().length === 0) {
        erro = 'Escolha seu motorista!';
        inputNomeMotorista.classList.add('is-invalid');
        validacaoOk = false;
    } else {
        inputNomeMotorista.classList.remove('is-invalid');
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
    var passageiros = inputQtdePassageiros.value;
    var motorista = inputNomeMotorista.value;

    if (novoEventoValido(nomeEvento, dataEvento, passageiros, motorista)) {
        console.log('Evento é válido!');
        listaAgendamentos.push({
            nome: nomeEvento,
            data: new Date(dataEvento),
            passageiros: passageiros,
            motorista: motorista,
        });
        atualizarAgendamentos();
        ocultarNovoEvento();
    } else {
        console.log('Evento é inválido!');
    }
}

buttonNovoEvento.addEventListener('click', mostrarNovoEvento);
buttonCancelar.addEventListener('click', ocultarNovoEvento);
formNovoEvento.addEventListener('submit', salvarNovoEvento);
window.addEventListener('load', atualizarAgendamentos);
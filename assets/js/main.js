const inputTarefas = document.querySelector('.input-tarefas');
const botaoTarefas = document.querySelector('.botao-tarefas');
const tarefas = document.querySelector('.tarefas');

let isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
if(isDarkMode) {
    window.document.body.style.setProperty('--primary-color', 'rgba(32, 32, 32, 1)');
    window.document.body.style.setProperty('--secondary-color', 'rgba(74, 74, 74, 1)');
    window.document.body.style.setProperty('--text-color', 'white')
} 
else {
    window.document.body.style.setProperty('--primary-color', 'rgb(197, 197, 197)');
    window.document.body.style.setProperty('--shadow', 'rgba(0, 0, 0, 0.4)');
}

botaoTarefas.addEventListener('click', function(){
    adicionarTarefa(inputTarefas.value);
});
function adicionarTarefa(texto){
    console.log(texto);
    if(!texto) return;
    const tarefa = document.createElement('p');
    tarefa.innerText = texto || `${inputTarefas.value}`;
    tarefas.appendChild(tarefa);
    adicionarBotao(tarefa);
    
}

function adicionarBotao(tarefa) {
// A tarefa de adicionar tarefa e adicionar conteúdo/elemento podem ser divididas

    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = `Apagar`;
    botaoApagar.className = `apagador`;
    tarefa.appendChild(botaoApagar);
    salvarTarefas();
}
document.addEventListener('click', function(e){
    if(e.target.className === `apagador`){
        let confirmar = confirm("Deseja mesmo apagar?");
        if(confirmar == true){
            e.target.parentElement.remove();
            salvarTarefas();
        }
    }
});

inputTarefas.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        adicionarTarefa(inputTarefas.value);
    }
});

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('p');
    let listaDeTarefas = [];

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
    inputTarefas.value = '';
    inputTarefas.focus();
}

function getTarefasSalvas(){
    const tarefasSalvasJson = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefasSalvasJson);

    for(let tarefaSalva of listaDeTarefas){
        adicionarTarefa(tarefaSalva);  
    }
    salvarTarefas();
}

function verificarTema(){
    
}
verificarTema();
getTarefasSalvas();

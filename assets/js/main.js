const inputTarefas = document.querySelector('.input-tarefas');
const botaoTarefas = document.querySelector('.botao-tarefas');
const tarefas = document.querySelector('.tarefas');

botaoTarefas.addEventListener('click', function(){
    adicionarTarefa();
});
function adicionarTarefa(){
    if(!inputTarefas.value) return;
        const tarefa = document.createElement('li');
        tarefa.innerText = `${inputTarefas.value} `;
        tarefas.appendChild(tarefa);
        inputTarefas.value = '';
        inputTarefas.focus();
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
        adicionarTarefa();
    }
});

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    let listaDeTarefas = [];

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function getTarefasSalvas(){
    const tarefasSalvasJson = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefasSalvasJson);

    for(let tarefaSalva of listaDeTarefas){
        console.log(tarefaSalva)
        const tarefa = document.createElement('li');
        tarefa.innerText = `${tarefaSalva}`;
        tarefas.appendChild(tarefa);
        inputTarefas.value = '';
        inputTarefas.focus();
        const botaoApagar = document.createElement('button');
        botaoApagar.innerText = `Apagar`;
        botaoApagar.className = `apagador`;
        tarefa.appendChild(botaoApagar);
        
    }
    salvarTarefas();
}
getTarefasSalvas();
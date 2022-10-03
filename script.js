const listaTarefas = document.querySelector('.lista-tarefas')
const listaCompletas = document.querySelector('.tarefas-completas')

const paraFazerContagem = document.querySelector('.paraFazer')

const concluirCompletas = document.querySelector('#concluirCompletas')
concluirCompletas.addEventListener('click', concluirTarefas)

const btnAdd = document.querySelector('.btnAdd')
btnAdd.addEventListener('click', criarTarefa)

let completas = []
let tarefasParaFazer = []

let fazerLocalStorage = JSON.parse(localStorage.getItem('tarefasFazer'))

class Tarefa{
  constructor(text, data, ){
    this.texto = text;
    this.data = new Date(data);
    this.dataFormatada = ((this.data.getDate() + 1 )) + "/" + ((this.data.getMonth() + 1)) + "/" + this.data.getFullYear()
  }
  element(){
    const tarefa = document.createElement('li')
    tarefa.classList.add('tarefa')
    tarefa.innerHTML = 
        `<input type="radio" class="inputTarefa">
        <span class="tarefa-texto">${this.texto}</span>
        <span class="tarefa-data">${this.dataFormatada}</span>
        </li>`
    tarefa.addEventListener('click', addCheck)
     function addCheck(){
     this.classList.toggle('feita')
     this.firstChild.toggleAttribute('checked');
   }
    return tarefa
  }
  appendTo(){
    const targetElement = document.querySelector('.lista-tarefas')
    targetElement.appendChild(this.element())
  }
}

function criarTarefa(event){
  event.preventDefault()
  addTarefa()
  document.querySelector('.descricao-tarefa').value = ''
}

function addTarefa(){
  let text = document.querySelector('.descricao-tarefa').value;
  let data = document.querySelector('.prazo').value;
  let erro = document.querySelector('.erroAtivado')

  if(text.length < 3 || data < 1){
    if(!erro){
      ativarErro()
    }
  } else {
  const tarefa = new Tarefa(text, data)
  tarefa.element()
  tarefa.appendTo()
  tarefasParaFazer.push(tarefa.element().outerHTML)
  removerErro()
  contagemParaFazer()
  salvarTarefas()
}

}

function salvarTarefas(){
  localStorage.setItem('tarefasFazer', JSON.stringify(tarefasParaFazer))
}

function setarTarefas(){
  let htmlTarefa = ''
  fazerLocalStorage.forEach((tarefa) => {
    htmlTarefa = htmlTarefa + tarefa
    listaTarefas.innerHTML = htmlTarefa
  })
}
setarTarefas()

function concluirTarefas(){
  const tarefasCompletas = document.querySelectorAll('.feita')
  const listaCompletas = document.querySelector('.tarefas-completas')

   tarefasCompletas.forEach((tarefa, i) => {
    tarefa.classList.remove('feita')
    tarefa.classList.add('concluida')
     tarefasParaFazer.splice(i, 1)
     completas.push(tarefa)
     listaCompletas.appendChild(tarefa)
     contagemParaFazer()
     salvarTarefas()
    
   })
   
 }
 
function ativarErro(){
  const erro = document.createElement('p')
  erro.innerText = 'Sua tarefa deve ter mais de 3 palavras e um prazo escolhido';
  erro.classList.add('erroAtivado')
  erro.style.color = "red"
  const secaoAdd = document.querySelector('.section-adicionar')
  secaoAdd.appendChild(erro)
}

function removerErro(){
  const erro = document.querySelector('.erroAtivado')
  if(erro){
    erro.remove()
  }
}

function contagemParaFazer(){
  paraFazerContagem.innerHTML = fazerLocalStorage.length + ' left'
}
contagemParaFazer()

function tarefasAntigas(){
  tarefasParaFazer = fazerLocalStorage
}
tarefasAntigas()

function marcarTarefa(){
   const tarefasNaoFeitas = document.querySelectorAll('.tarefa')
   
   tarefasNaoFeitas.forEach((tarefa) => {
     tarefa.addEventListener('click', addCheck)
   })
  
   function addCheck(){
   this.classList.toggle('feita')
   this.firstChild.toggleAttribute('checked');
 }
 }
 marcarTarefa()

const tarefasCompletas = document.querySelector('#tarefasCompletas')
tarefasCompletas.addEventListener('click', showCompletas)

const tarefasFazer = document.querySelector('#paraFazer')
tarefasFazer.addEventListener('click', showFazer)
tarefasFazer.addEventListener('on', showFazer)


function showCompletas(){
  listaTarefas.classList.remove('ativo') 
  listaCompletas.classList.add('ativo')

}

function showFazer(){
  listaTarefas.classList.toggle('ativo')
  listaCompletas.classList.remove('ativo')
}
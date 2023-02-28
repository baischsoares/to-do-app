<template>
  <div class="aplicativo">
    <h1>T O D O</h1>
    <form>
      <input type="text" placeholder="Título da tarefa" v-model="titulo">
      <input type="date" v-model="prazo">
      <p v-if="erro">Você precisa de um título e um prazo</p>
      <input type="submit" value="Adicionar" @click.prevent="adicionarTarefa">
    </form>
    <div v-if="tarefas.length">
      <ul >
      <li v-for="(tarefa, index) in tarefas" :key="index" class="tarefa tarefa-item">
        <div :class="(diaAtual < tarefa.prazoTempo ? '' : 'atrasada' )">
          <p>{{ tarefa.prazo }}</p>
          <p>{{tarefa.titulo}}</p>
          <button class="feita" @click="completarTarefas(tarefa)">Feita</button>
        </div>
      </li>
    </ul>
    <div class="rodapezinho tarefa-item">
      <p class="incompletas"> Incompletas: {{ tarefas.length }}</p>
      <p class="atrasada"> Atrasadas: {{ tarefasAtrasadas.length }}</p>
      <p class="completas"> Feitas: {{ tarefasFeitas.length }}</p>
    </div>
    </div>
    <div class="tarefa-item " v-else>
      <p class="semTarefa" >Nenhuma tarefa adicionada</p>
    </div>
  </div>
 
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      titulo: '',
      prazo: '',
      tarefas: [],
      tarefasFeitas: [],
      erro: false
    }
  },
  computed: {
    diaAtual(){
      let diaAtual = new Date().getTime() - 3*60*60*1000;
      return  diaAtual
    },
    tarefasAtrasadas(){
      let listaAtrasadas = this.tarefas.filter(tarefa => tarefa.prazoTempo < this.diaAtual);
      return listaAtrasadas;
    },
  },
  methods: {
    adicionarTarefa(){
      if(this.titulo && this.prazo){
        this.criarTarefa();
        this.ordenarTarefas()
        this.salvarTarefas()
        this.erro = false
      } else {
       this.erro = true
      } 
    },
    criarTarefa(){
      let tarefa = {};
      tarefa.titulo = this.titulo;

      let prazo = new Date(this.prazo)
      let dataFormatada = prazo.getUTCDate() + "/"+ (( prazo.getMonth() + 1  )) + "/" + prazo.getFullYear();
      tarefa.prazo = dataFormatada;
      tarefa.prazoTempo = prazo.getTime();

      tarefa.feita = false;

      this.tarefas.push(tarefa);

      this.titulo = '';
      this.prazo = '';
    },
    completarTarefas(tarefa){
        tarefa.feita = !tarefa.feita
        this.tarefasFeitas.push(tarefa) //adiciona a tarefa feita em uma outra array
        this.tarefas = this.tarefas.filter(tarefa => !tarefa.feita);  // filtra a array para excluir a tarefa feita
        this.salvarTarefas()
    },
    ordenarTarefas(){
      this.tarefas = this.tarefas.sort((a, b) => {
        return a.prazoTempo - b.prazoTempo;
      })
    },
    salvarTarefas(){
      localStorage.setItem('tarefas', JSON.stringify(this.tarefas))
      localStorage.setItem('tarefasFeitas', JSON.stringify(this.tarefasFeitas))
    },
    setarTarefas(){
      if(localStorage.tarefas){
        this.tarefas = JSON.parse(localStorage.getItem('tarefas'))
        this.tarefasFeitas = JSON.parse(localStorage.getItem('tarefasFeitas'))
      }
    }
  },
  created(){
    this.setarTarefas()
  }
  
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap');
  *{
    margin: 0px;
    padding: 0px;
    font-family: 'Josefin Sans';
  }
  body{
    background-color: #E9E9F1 ;
  }
  ul{
    list-style: none;
    max-height: 500px;
    margin-bottom: 15px
  }
  p{
    color: #43457e;
  }
  .aplicativo{
    box-sizing: border-box;
    margin: 60px auto;
    max-width: 500px;
  }
  h1{
    color: #3A4F7A;
  }
  form{
    background-color: #fff;
    box-shadow: 10px 20px 30px rgba(0,0,0,.2);
    border-radius: 5px;
    max-width: 100%;
    margin: 20px 0px;
    display: grid;
    grid-template-columns: 280px auto;
    gap: 15px;
    padding: 30px;
  }
  input[type="text"],
  input[type="date"]{
    border: none;
    background: transparent;
    border-bottom: 1px solid #3A4F7A;
    padding: 16px 8px;
    outline: 0px;
    font-size: 1rem;
    border-radius: 5px;
    color: #3A4F7A;
  }
  input[ type="submit"]{
    grid-column: 1/-1;
    padding: 16px 8px;
    outline: 0px;
    border: none;
    background: #3A4F7A;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
  }
  .tarefa-item{
    padding: 30px;
    box-shadow: 5px 5px 10px rgb(0 0 0 / 10%);
    border-radius: 5px;
    margin-bottom: 15px;
    background: #fff

  }
  .tarefa div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .feita{
    padding: 5px 10px;
    border-radius: 5px;
    border: 2px solid #428c81;
    color: #428c81;
    cursor: pointer;
  }
  .feita:hover{
    background-color: #428c81;
    color: #fff;
  }
  .completas {
    color: #428c81;
  }
  .incompletas{
    color: #fc923d;
  }
  .atrasada{
    color: #e46446;
  }
  .semTarefa{
    color: #e46446;
  }
  .rodapezinho{
    display: flex;
    gap: 20px;
    justify-content: flex-end;
  }
  @media(max-width: 720px){
    form{
      grid-template-columns: 1fr;
    }
  }
</style>

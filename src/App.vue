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
      <li v-for="(tarefa, index) in tarefas" :key="index" class="tarefa">
        <div>
          <p>{{ tarefa.prazo }}</p>
          <p>{{tarefa.titulo}}</p>
          <button @click="completarTarefas(tarefa)">Feita</button>
        </div>
      </li>
    </ul>
    </div>
  
    <p v-else>Nenhuma tarefa adicionada</p>
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
  methods: {
    adicionarTarefa(){
      if(this.titulo && this.prazo){
        this.criarTarefa();
        this.erro = false
      } else {
       this.erro = true
      } 
    },
    criarTarefa(){
      let tarefa = {};
      tarefa.titulo = this.titulo;
      tarefa.prazo = this.prazo;
      tarefa.feita = false;
      this.tarefas.push(tarefa);
      this.titulo = '';
      this.prazo = '';
    },
    completarTarefas(tarefa){
        tarefa.feita = !tarefa.feita
        this.tarefasFeitas.push(tarefa) //adiciona a tarefa feita em uma outra array
        this.tarefas = this.tarefas.filter(this.excluiTarefa); // filtra a array para excluir a tarefa feita
    },
    excluiTarefa(tarefa){
      return tarefa.feita == false;
    },

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
  ul{
    list-style: none;
  }
  .aplicativo{
    box-sizing: border-box;
    margin: 150px auto;
    max-width: 500px;
    background-color: aqua;
    padding: 20px;
  }
  form{
    max-width: 100%;
    margin: 20px 0px;
    display: grid;
    grid-template-columns: 300px auto;
    gap: 10px;
  }
  input{
    padding: 8px;
  }
  input[ type="submit"]{
    grid-column: 1/-1;
  }
  .tarefa{
    display: flex;
    align-items: center;
    justify-content:flex-start;
    gap: 20px;
    padding: 20px 0px;
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
  }
  .tarefa div {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  input[type="checkbox"]{
    height: 20px;
    width: 20px;
    border: none;
  }
</style>

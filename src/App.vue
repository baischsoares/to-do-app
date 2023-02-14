<template>
  <div class="aplicativo">
    <h1>T O D O</h1>
    <form>
      <input type="text" placeholder="adicionarTarefa" v-model="titulo">
      <input type="date" v-model="prazo">
      <input type="submit" value="Adicionar" @click.prevent="adicionarTarefa">
    </form>
    <ul>
      <li v-for="(tarefa, index) in tarefas" :key="index" class="tarefa">
        <input type="checkbox"> 
        <div>
          <p>{{tarefa.titulo}}</p>
          <p>{{ tarefa.prazo }}</p>
        </div>
        
      </li>
    </ul>
  </div>
 
</template>

<script>



export default {
  name: 'App',
  data(){
    return {
      titulo: '',
      prazo: '',
      tarefas: []
    }
  },
  methods: {
    adicionarTarefa(){
      let tarefa = {};
      tarefa.titulo = this.titulo;
      tarefa.prazo = this.prazo;
      this.tarefas.push(tarefa);
    }
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

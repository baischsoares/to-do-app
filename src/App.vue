<template>
  <div class="aplicativo">
    <h1>T O D O</h1>
    <form>
      <input type="text" placeholder="adicionarTarefa">
    </form>
  </div>
 
</template>

<script>



export default {
  name: 'App',
  components: {
    
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
  .aplicativo{
    box-sizing: border-box;
    margin: 150px auto;
    max-width: 500px;
    background-color: aqua;
    padding: 20px;
  }
  input{
    width: 100%;
    padding: 5px;
    margin-top: 20px;
  }
</style>

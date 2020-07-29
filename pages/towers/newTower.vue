<template>
    <div id="app">
        <button id="goBack"> < Go back </button>
        <div id="container"> 
            <h1 id="title">Almost there...</h1>   
            <h4 id="message">What should we call you? </h4>
            <input id="name"
                size="20"
                placeholder="Name"
                >
            <button id = "enterRoom"> LET'S GO!
            </button>
            <h4 id="message">This is what you'll show up as to everyone else in Twisty tower.</h4>
        
        </div>
    </div>
</template>

<script>
export default {
    name: 'New Tower', 
    data() {
        return {
            input: ''
        }
    }  
}
</script>

<style>
#app {
    text-align:left;
}
#container {
  text-align: center;
}
body, html {
  height: 100%;
  background-color: #F6F6F2;
  font-family: 'Quicksand', sans-serif;
  text-align: center;
}
#title {
    font-size: 5.5rem;
    margin-top: 5%;
    color: #388087;
    font-family: Avenir, sans-serif;
}

#message {
    color: #388087;
    font-size: 28px;
    font-family: 'Quicksand', sans-serif;
    font-weight: 400;
    padding-left: 15%;
    padding-right: 15%;
    margin-top: 5%;
}

#name {
    height: 50px;
    border: 1px solid #388087; 
    border-radius: 15px;
    outline: 0;
    font-size: 1.6rem;
    font-family: 'Quicksand';
    padding-left: 3%;
    margin-right: 3%;
    width: 40%;
    color:#388087;
    font-weight: 500;
}
#goBack {
    border: 1px solid #388087; 
    background-color: #F6F6F2;
    margin-top: 3%;
    margin-left: 3%;
    align-content: flex-start;
    border-radius: 15px;
    outline: 0;
    height: 50px;
    width: 12%;
    font-family: 'Quicksand';
    font-size: 14pt;
    font-weight: 500;
    transition: 0.35s;
    color: #388087;
}
#enterRoom {
    border: 1px solid silver; 
    background-color: #6fb3b8;
    border-radius: 15px;
    outline: 0;
    height: 50px;
    width: 18%;
    font-size: 14pt;
    font-family: 'Quicksand';
    transition: 0.25s;
    color: white;
    font-weight:700;
}
#enterRoom:hover {
    font-size: 16pt;
    background-color: #F6F6F2;
    cursor: pointer;
    color: #388087;
    letter-spacing: 1px;
    border: 2px solid #388087; 
}

#goBack:hover{
    padding-right: 1%;
    cursor: pointer;
}

@media only screen and (min-width: 1440px) {
  #title {
    margin-top: 5%;
  }
  #name {
    padding-left: 1%;
    width: 25%;

  }
  #message{
      margin-top: 2%;
  }
  #enterRoom {
      width: 8%;
  }
  #goBack {
      width: 7%;
  }

}
</style>
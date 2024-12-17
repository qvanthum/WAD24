<template>
    <div class = "signup middle">
        <form @submit.prevent="">
            <div class="email-field">
                <p>Email</p>
                <input type="email" class="textbox" placeholder="Email" required v-model="email"> <br>
            </div>
            <div class = "password-field">
                <p>Password</p>
                <input type="password" v-model = "password" class="textbox" placeholder="Password" required><br>
            </div>
            <div class="buttons">
                <button @click="LogIn()"  class="center">LogIn</button>
                <button @click='this.$router.push("/signup")' class="center">Signup</button>
            </div>
        </form>
    </div>
    </template>
<script>
export default {
name: "LogIn", 

data: function() {
    return {
   email: '',
   password: '',
  }
  },
  methods: {
        LogIn() {
        var data = {
            email: this.email,
            password: this.password
        };
        fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
        console.log(data);
        //this.$router.push("/");
        location.assign("/");
        })
        .catch((e) => {
            console.log(e);
            console.log("error");
        });
        },
    }, 
  }
</script>
  
<style>
    * {
        font-family: Arial;
        box-sizing: border-box;
        font-size: large;
    }
    
    .middle {
        display: flex;
        justify-content: center;
        flex-grow: 1;
        margin: 20px;
        order: 2;
    }

    form {
        padding: 20px;
        border-radius: 20px;
        background-color: #d8d8d8;
        margin: auto;
        display: flex;
        align-items: center;
        flex-direction: column;
        
        
    }
    .email-field, .password-field {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .email-field > p{
        margin: 5px 20px 5px 18px;
    }
    .textbox {
        margin: 5px 20px 5px 20px;
        width: 50%;
    }
    .buttons > button {
        background-color: rgb(7, 85, 137);
        margin: 10px;
        padding: 3px 10px;
        color: whitesmoke;
    }
    p{
        display: flex;
        flex-wrap: wrap;
    }
    .button {
        display: flex;
        justify-content: center;
    }

</style>
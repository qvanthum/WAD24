<template>
    <div class = "signup middle">
        <form @submit.prevent="handleSubmit">
            <div class="email-field">
                <p>Email</p>
                <input type="email" class="textbox" placeholder="Email" required v-model="email"> <br>
            </div>
            <div class = "password-field">
                <p>Password</p>
                <input type="password" v-model = "password" class="textbox" placeholder="Password" required @input="ValidatePassword"><br>
            </div>
            <div class="PasswordConditions" v-if="passwordFeedback">
                <p v-for="(error, index) in passwordFeedback.split('\n')" :key="index" class="feedback">
                    {{ error }}
                </p>
            </div>
            <input type="submit" class="button" value="Signup">
        </form>
    </div>
    </template>
    
    <script>
    export default {
        name: 'signupComponent',
    data() {
        return {
        email: '',
        password: '',
        passwordFeedback: '',  // Holds feedback messages
        };
    },

    methods: {
        ValidatePassword(){
            this.passwordFeedback = this.checkPasswordRequirements(this.password);
        },
        handleSubmit() {
      // If the password meets all requirements, proceed with form submission logic
      if (this.passwordFeedback === '') {
        //alert('Signup successful!');
        this.SignUp()
        this.$router.push('/');
      } else {
        alert('Please enter valid password before signing up.');
      }
    },
    checkPasswordRequirements(password) {
        if(password == "") return "Password must have at least 8 characters."
        var requirements = "";
        if(password[0].match(/[A-ZÄÖÜÕ]/) == null) requirements += "Password must start with uppercase character.\n";
        

        if(password.match(/[A-ZÄÖÜÕ]/) == null)     requirements += "Password must include uppercase character.\n";
        if(password.match(/[a-zöäüõ]/g) == null || password.match(/[a-z]/g).length < 2)  requirements += "Password must include 2 lowercase character.\n";  
        if(password.match(/\d/) == null) requirements += "Password must include one numeric value.\n";
        if(password.match("_") == null) requirements += "Password must include the character “_”.\n";

        if(password.length < 8)  requirements += "Password must have at least 8 characters.\n";
        if(password.length > 15) requirements += "Password must have less than 15 characters.\n";
        return requirements;
    },
    SignUp() {
      var data = {
        email: this.email,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
          body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      this.$router.push("/");
      //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
    },
},
};

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
    .button {
        background-color: rgb(7, 85, 137);
        margin: 10px;
        padding: 3px 10px;
        color: whitesmoke;
    }
    p{
        display: flex;
        flex-wrap: wrap;
    }

</style>
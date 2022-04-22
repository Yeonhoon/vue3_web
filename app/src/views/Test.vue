<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-btn @click="getData">Click!</v-btn>
        My data:{{this.mydata}}
      </v-flex>
      <v-flex xs12 sm8 md4>
        <v-form>
          <v-text-field 
            v-model="form.email"
            type="email"
          >
            Email
          </v-text-field>
          <v-text-field 
            v-model='form.password'
            type="password"
          >
            PW
          </v-text-field>
          <v-btn @click="signUp">회원가입</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {

  name: "TestFile",
  data() {
    return {
      mydata: null,
      form:{
        email: null,
        password: null,
      },
    }
  },
  // created(){
  //   axios.get('/api/users')
  //     .then(res=>{
  //       console.log(res)
  //   })
  // },
  methods: {
    getData(){
      axios.get('/api/users/test')
        .then(res=>{
          this.mydata = res.data
        })
    },
    signUp(){
      console.log()
      axios.post('/api/users/test',this.form)
    }
  },

}
</script>
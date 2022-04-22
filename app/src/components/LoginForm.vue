<template>
  <v-container>
    <v-row text-center>
      <v-col cols=12>
        <v-btn id="custom-login-btn" 
          v-if="!this.isLogin"
          @click="kakaoLogin"
          >
          <img
            src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
            width="223"
          >
        </v-btn>
      </v-col>
      <v-col cols=12>
        <v-btn @click="naverLogin">네이버 로그인</v-btn>
      </v-col>
      <v-col>
         <v-btn 
          dense
          class="warning"
          v-if="isLogin"
          @click="kakaoLogout"
        >
          로그아웃
        </v-btn>
      </v-col>
      <h3>현재 접속한 ID: {{myid}}</h3>
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios';

export default {
  setup(){
    const kakaoKey = 'beab026c95a7ce46903529b265eb8ef1'
    return {kakaoKey}
  },
  name: "LoginForm",
  data (){
    return {
      myid: null,
      isLogin:false,
    }
  },
  methods: {
    kakaoLogin(){
      if(!window.Kakao.isInitialized()){
        window.Kakao.init(this.kakaoKey) // Kakao Developers에서 요약 정보 -> JavaScript 키
      }

      if (window.Kakao.Auth.getAccessToken()) {
        window.Kakao.API.request({
          url: '/v1/user/unlink',
          success:  (res) =>{
            console.log(res)
          },
          fail: (error) => {
            console.log(error)
          },
        })
        window.Kakao.Auth.setAccessToken(undefined)
      }

      window.Kakao.Auth.login({
        success: ()=> {
          window.Kakao.API.request({
            url: '/v2/user/me',
            data: {
              property_keys: ["kakao_account.email"]
            },
            success: res =>{
              // console.log(res.body)
              const kakao_account = res.kakao_account;
              const email = kakao_account.email;

              const loginForm = new FormData();
              loginForm.email = this.email
              loginForm.password = null
              console.log()

              axios.post('/api/users/test',{email:email, password: ''})
                .then(res=>{
                  console.log(res)
                  this.myid = email
                  this.isLogin=true
                  this.$router.push('/')
                })
              
            },
            fail: (error) => {
              console.log(error)
            },
          })
        },
        fail: (error) => {
          console.log(error)
        },
      })
    },
    kakaoLogout(){
      window.Kakao.Auth.logout(res=>{
        // window.Kakao.init(this.kakaoKey)
        console.log(res)
        this.isLogin=false
        this.myid=null
      })
    },
    naverLogin(){
      const client_id = 'Uid0AeyzPvcOMG2OTaHU';
      const callbackUrl = 'http://localhost:8080/naverlogin';
      const url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + callbackUrl + '&state=1234';
      window.location.replace(url);
    },
  },
  mounted() { var self = this; 
    try{ //네이버로 로그인할때만 실행 
      if(this.$route.query.code.length !== undefined){
        var callbackFuc = async () => { 
          const res = await fetch('https://locolhost/api/sns_login_naver', {
             method: "POST", headers: { "Content-Type": "application/json", },
             body: JSON.stringify({ code: `${self.$route.query.code}`, state: `${self.$route.query.state}`, }), }) 
          const data = await res.json(); 
          console.log(`네이버 로그인 : ${data.email}`) //네이버 로그인 인증 코드 (nodejs api) 
        } 
          callbackFuc(); 
        } 
      }
    catch (e){ 
      console.log(e) 
      }
    }

}
</script>
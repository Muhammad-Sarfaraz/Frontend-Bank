<template>
    <main>
      <div class="container">
        <div class="grid">
          <div class="row">
            <div class="col-1">
              <nav>
          
                <RouterLink to="/">Home</RouterLink>
                <template v-if="user.id || token"> 
                  <RouterLink to="/withdrawal">Withdrawal</RouterLink>
                  <RouterLink to="/deposit">Deposit</RouterLink>
                  <button @click.prevent="logout()">Logout</button>

                </template>
                <template v-else>
                  <RouterLink to="/login">Login</RouterLink>
                  <RouterLink to="/register">Register</RouterLink>
                </template>
               
              </nav>
            </div>

            <slot name="content">
            </slot>
       
            <div class="col-1">
             
            </div>
          </div>
        </div>
  
        <div class="row">
          <div class="col-1">
            <footer>
              <span>Bank</span>
            </footer>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import HttpAdapter from '@/services/adapters/http.adapter';

export default{
  computed:{
    ...mapState('login', ['user','token']),
    token(){
      return localStorage.getItem('token')
    },
    http() {
            const adapter = new HttpAdapter(this.$Progress);
            return adapter.http();
        },
  },
  methods:{
    logout(){
      this.http.post('http://127.0.0.1:8000/api/logout', {}).then((res) => {
      if(res.data){
        localStorage.removeItem('token');
        alert(res.data.message);
        this.$router.push('/login');

      }
    })
    }
  },
}
</script>
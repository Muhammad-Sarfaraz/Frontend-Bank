<template>
    <master>
        <template v-slot:content>
            <form v-on:submit.prevent="submit">
                <input type="email" placeholder="email" v-model="data.email" required />
                <br />
                <input type="password" placeholder="password" v-model="data.password" required />
                <br />
                <button type="submit" >Submit</button>
            </form>

        </template>
    </master>
</template>
  
<script>

import master from '../../layout/master.vue';
import HttpAdapter from '@/services/adapters/http.adapter';

export default {
    components: {
        master
    },
    data() {
        return {
            data: {}
        }
    },
    computed: {
        http() {
            const adapter = new HttpAdapter(this.$Progress);
            return adapter.http();
        },
    },
    methods: {
        submit() {
            this.http.post('http://127.0.0.1:8000/api/login', this.data).then((res) => {
              if(res.data){
                localStorage.setItem("token", res.data.token);
                this.$store.dispatch('login/setUser', res.data.user)
                this.$router.push('/');
              }
            }).catch((res) => {
                if (res.response) {
                    if (res.response.status === 422) { }
                    alert(res.response.data.error);
                }
                console.log(res);
            })
        }
    },
    created() {
        this.http.get('http://127.0.0.1:8000/api/').then((res) => {
            this.transactions = res.data.data;
        })
    }
}

</script>
  
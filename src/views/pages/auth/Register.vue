<template>
    <master>
        <template v-slot:content>

            <form v-on:submit.prevent="submit">
                <select id="account_type" v-model="data.account_type"  required>
                    <option value="" >Select type</option>
                    <option value="individual" >Individual</option>
                    <option value="business">Business</option>
                </select>
                <br />
                <input type="name" placeholder="name" v-model="data.name" required />
                <br />
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
            data: {
                account_type:""
            }
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
            this.http.post('http://127.0.0.1:8000/api/users', this.data).then((res) => {
                if(res.data){
                    alert(res.data.message);
                    window.location.href = "/login"
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
       
    }
}

</script>
  
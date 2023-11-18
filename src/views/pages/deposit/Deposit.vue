<template>
    <master>
        <template v-slot:content>

           <div>
            <form v-on:submit.prevent="submit">
                <br />
                <label for="">Enter deposit amount</label><br />
                <input type="number" name="amount" step="0.01" placeholder="amount" v-model="data.amount" required />
                <br />
                <button type="submit">Submit</button>
            </form>

            <br />

            <h4>Deposit List
            </h4>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Amount</th>
                        <th>Fee</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(transaction, index) in transactions" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ transaction.amount }}</td>
                        <td>{{ transaction.fee }}</td>
                        <td>{{ transaction.date }}</td>
                    </tr>
                </tbody>
            </table>
           </div>
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
            data: {},
            transactions:{},
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
            this.http.post('http://127.0.0.1:8000/api/deposit', this.data).then((res) => {
                if (res.data) {
                    alert(res.data.message)
                    this.data.amount="";
                    this.getDeposit();
                }
            }).catch((res)=>{
                if (res.response) {
                    if (res.response.status === 422) { }
                    alert(res.response.data.error);
                }
                console.log(res);
            })
        },
        getDeposit() {
            this.http.get('http://127.0.0.1:8000/api/deposit').then((res) => {
                this.transactions = res.data.data;
            })
        }
    },
    created() {
        this.getDeposit();
    }
}

</script>
  
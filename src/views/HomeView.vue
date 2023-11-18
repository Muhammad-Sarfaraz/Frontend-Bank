<template>
  <master>
    <template v-slot:content>
      <div>
        <h5>Current Balance : {{balance}}</h5>

      <br />
      <h4>Transaction List
      </h4>
      <table >
        <thead>
            <tr>
                <th>No</th>
                <th>Amount</th>
                <th>Transaction type</th>
                <th >Fee</th>
                <th >Date</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, index) in transactions" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.transaction_type }}</td>
              
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

import master from './layout/master.vue';
import HttpAdapter from '@/services/adapters/http.adapter';

export default {
  components: {
    master
  },
  data(){
    return {
      balance : 0,
      transactions:{}
    }
  },
  computed:{
    http(){
      const adapter = new HttpAdapter(this.$Progress);
      return adapter.http();
    },
  },
  created(){
    this.http.get('http://127.0.0.1:8000/api/').then((res)=>{
      this.transactions = res.data.data.transactions;
      this.balance = res.data.data.balance;
    })
  }
}

</script>

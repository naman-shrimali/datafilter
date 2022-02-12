<template>
  <div id="app" v-if="data_Details && data_Details.length" >
   <v-banner
    color="primary"
    outlined
    rounded
    single-line
    tile
  >
  <h2 align="right" class="banner">Total Number of Entries : {{data_Details.length}}</h2>
  </v-banner>
    <v-data-table
    dense
    v-scroll.self
    :headers="headers"
    :items="data_Details"

    items-per-page="-1"
    item-key="Pat ID"
    disable-items-per-page = true
    hide-default-footer
    class="elevation-1"
  ></v-data-table>
  </div>
</template>

<script>

export default {
  name: 'datafilter',
  
  data() {
        return{
            data_Desc_Url :
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvQmAr2pxspRHodWbYo6_usmDZ5wXpERkaX35XtFdsgM_b54vzRhUJhp5yQ5bwWGsBJq0lMPVy8Wet/pub?gid=0&single=true&output=csv",
            data_Details:[],
            headers: [
        {
          text: 'Pat ID',
         
          sortable: false,
          value: 'Pat ID',
        },
        { text: 'Part(CT)', value: 'Part (CT)' },
        { text: 'Dose (CT)', value: 'Dose (CT)' },
        { text: 'Tumor type Abbrev for INDx 10-14-18', value: 'Tumor type Abbrev for INDx 10-14-18' },
        { text: 'BOR as per GB 060120', value: 'BOR as per GB 060120' },
        { text: 'ORR 060120', value: 'ORR 060120' },
        { text: 'CB16wks GB060120 (PR,CR, SD16wk)', value: 'CB16wks GB060120 (PR,CR, SD16wk)' },
        { text: 'PDL1 IC/total nuc >=5% POS', value: 'PDL1 IC/total nuc >=5% POS' },
        { text: 'HPV status', value: 'HPV status' },
        { text: 'BOR datacutoff date', value: 'BOR datacutoff date' },
        { text: 'TS datacut for CB call', value: 'TS datacut for CB call' },
        { text: 'CT date', value: 'CT date' },
      ],
        }
    },
    mounted() {
      window.onresize = function() {
        console.log("changed device dimensions")
      document.body.height = window.innerHeight;
    }
      this.fetchdata_Details();
    },
    methods: {
      fetchdata_Details(){
         this.$papa.parse(this.data_Desc_Url, {
          download: true,
          header: true,
          complete: (results) => { 
            this.data_Details = results.data;
          }
        });
      },
 }
}
</script>

/*<style>
#app {
  height: 100vh;
  
}
.banner {
  color: lightgray;
}
table {
  border: 1px solid black;
  border-collapse: collapse;
  table-layout: fixed;
  margin-bottom: 40px;
  width: 100%;
  text-align: center;
}
th {
  background-color: lightgray;
  border: 1px solid black;

}
td {
  border: 1px solid black;
}
</style>*/
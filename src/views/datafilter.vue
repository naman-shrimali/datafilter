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
    items-per-page= -1
    item-key="Pat ID"
    disable-items-per-page = true
    hide-default-footer
    class="elevation-1"
    :custom-filter="filterOnlyCapsText"
  >
     <!-- <template v-slot:top>
        <v-text-field
          v-model="dose_CT"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
        ></v-text-field>
      </template> -->
      <template v-slot:top>
        <tr>
          <!--Pat ID-->
          <td width="132px">
            <!-- <v-text-field
              v-model="calories"
              type="number"
              label="Less than"
            ></v-text-field> -->
          </td>
          <!--Part (CT)-->
          <td width="132px">
            <v-select
              :items= "part_CT"
              v-model="temp1"
            >
            </v-select>
          </td>
          <!--Dose (CT)-->
          <td width="132px">
            <v-text-field
              :items="data_Details"
              v-model="dose_CT"
            ></v-text-field>
          </td>
          <!--Tumor type Abbrev for INDx 10-14-18-->
          <td width="132px">
            <v-select
              :items= "tumor"
              v-model="temp3"
            >
            </v-select>
          </td>
          <!--BOR as per GB 060120-->
          <td width="132px">
            <v-select
              :items= "borAS"
              v-model="temp4"
            >
            </v-select>
          </td>
          <!--ORR 060120-->
          <td width="132px">
            <v-select
              :items= "orr"
              v-model="temp5"
            >
            </v-select>
          </td>
          <!--CB16wks GB060120 (PR,CR, SD16wk)-->
          <td width="132px">
            <v-select
              :items= "cbwks"
              v-model="temp6"
            >
            </v-select>
          </td>
          <!--PDL1 IC/total nuc >=5% POS-->
          <td width="132px">
            <v-select
              :items= "pdlIC"
              v-model="temp7"
            >
            </v-select>
          </td>
          <!--HPV status-->
          <td width="132px">
            <v-select
              :items= "hpvStatus"
              v-model="temp8"
            >
            </v-select>
          </td>
          <!--BOR datacutoff date-->
          <td width="132px">
            <v-select
              :items= "borData"
              v-model="temp9"
            >
            </v-select>
          </td>
          <!--TS datacut for CB call-->
          <td width="132px">
            <v-select
              :items= "tsData"
              v-model="temp10"
            >
            </v-select>
          </td>
          <!--CT date-->
          <td width="132px">
            <v-select
              :items= "ctData"
              v-model="temp11"
            >
            </v-select>
          </td>
        </tr>
      </template>
  </v-data-table>
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
            //Variables for filters
            part_CT:['A', 'C', 'D', 'E' , 'F' , 'G' , 'H' , 'DA' ],
            temp1:'',
            dose_CT:'',
            tumor:'',
            temp3:'',
            borAS:'',
            temp4:'',
            orr:'',
            temp5:'',
            cbwks:'',
            temp6:'',
            pdlIC:'',
            temp7:'',
            hpvStatus:'',
            temp8:'',
            borData:'',
            temp9:'',
            tsData:'',
            temp10:'',
            ctData:'',
            temp11:'',
            //
            headers: [
        {
          text: 'Pat ID',
         
          sortable: false,
          value: 'Pat ID',
        },
        { text: 'Part(CT)', value: 'Part (CT)',filter: value => {
               if (!this.temp1) return true

              return value === this.temp1
            }, },
        { text: 'Dose (CT)', value: 'Dose (CT)',filter: value => {
             if (!this.dose_CT) return true

              return value === this.dose_CT
            }, },
        { text: 'Tumor type Abbrev for INDx 10-14-18', value: 'Tumor type Abbrev for INDx 10-14-18',filter: value => {
              if (!this.temp3) return true

              return value === this.temp3
            }, },
        { text: 'BOR as per GB 060120', value: 'BOR as per GB 060120',filter: value => {
              if (!this.temp4) return true

              return value === this.temp4
            }, },
        { text: 'ORR 060120', value: 'ORR 060120',filter: value => {
              if (!this.calories) return true

              return value < parseInt(this.calories)
            }, },
        { text: 'CB16wks GB060120 (PR,CR, SD16wk)', value: 'CB16wks GB060120 (PR,CR, SD16wk)',filter: value => {
              if (!this.calories) return true

              return value < parseInt(this.calories)
            }, },
        { text: 'PDL1 IC/total nuc >=5% POS', value: 'PDL1 IC/total nuc >=5% POS',filter: value => {
              if (!this.calories) return true

              return value < parseInt(this.calories)
            }, },
        { text: 'HPV status', value: 'HPV status',filter: value => {
              if (!this.calories) return true

              return value < parseInt(this.calories)
            }, },
        { text: 'BOR datacutoff date', value: 'BOR datacutoff date',filter: value => {
              if (!this.calories) return true

              return value < parseInt(this.calories)
            }, },
        { text: 'TS datacut for CB call', value: 'TS datacut for CB call',filter: value => {
              if (!this.calories) return true

              return value < parseInt(this.calories)
            }, },
        { text: 'CT date', value: 'CT date',filter: value => {
              if (!this.calories) return true

              return value < parseInt(this.calories)
            }, 
              },
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
      filterOnlyCapsText (value, dose_CT) {
        return value != null &&
          dose_CT != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(dose_CT) !== -1
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
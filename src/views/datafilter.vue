<template>
  <div id="app" v-if="data_Details && data_Details.length" class="mb-4 v-dialog__ title content v-dialog__ title content--active mainDiv" >
        <v-banner
          color="primary"
          ma-0 pa-0
          outlined
          rounded
          tile
        >
          <h2 align="right" class="banner mt-2">Total Number of Entries : {{data_Details.length}}</h2>
        </v-banner>
  
  <v-flex>
    <v-data-table
      dense
      :headers="headers"
      :items= "data_Details"
      footer-props.items-per-page-options="options.rowsPerPage" 
      item-key="pat_ID"   
      :options.sync="options"     
    >
      <template v-slot:top >
          <v-layout row wrap height="5px" mt-4 mb-2>
          <!-- Filter Button -->
          <v-flex xs1 pr-2 pl-2>
            <v-btn
              class="ma-2"
              color="primary"
              dark
              v-on:click="isHidden = !isHidden"
            >
              Filters
              <v-icon
                dark
                right
              >
                mdi-filter
              </v-icon>
            </v-btn>
          </v-flex>
          <!-- 1 -->
          <v-flex xs1 pr-2 pl-2 v-if="!isHidden">
              <v-text-field
              color = filters.color2
              outlined
              append-icon="mdi-magnify"
              label="Part CT"
              v-model="part_CT"
              single-line
              hide-details
            ></v-text-field>

          </v-flex>
          <!-- 2 -->
          <v-flex xs1 pr-2 pl-2 v-if="!isHidden">
              <v-text-field
              color = filters.color3
              outlined
              append-icon="mdi-magnify"
              label="Dose CT"
              v-model="dose_CT"
              single-line
              hide-details
              ></v-text-field>
          </v-flex>
          <!-- 3 -->
          <v-flex xs1 pr-2 pl-2 v-if="!isHidden">
              <v-text-field
              color = filters.color4
              outlined 
              append-icon="mdi-magnify"
              label="Tumor Type"
              v-model="tumor"
              single-line
              hide-details
              ></v-text-field>
          </v-flex>
          <!-- 4 -->
          <v-flex xs1 pr-2 pl-2 v-if="!isHidden">
              <v-text-field
              color = filters.color5
              outlined
              append-icon="mdi-magnify"
              label="BOR as"
              v-model="borAS"
              single-line
              hide-details
              ></v-text-field>
          </v-flex>
          <!-- 5 -->
          <v-flex xs1 pr-2 pl-2 v-if="!isHidden">
              <v-text-field
              color = filters.color6
              outlined  
              append-icon="mdi-magnify"
              label="ORR"
              v-model="orr"
              single-line
              hide-details
              ></v-text-field>
          </v-flex>
          <!-- 6 -->
          <v-flex xs1 pr-2 pl-2 v-if="!isHidden">
              <v-text-field
              color = filters.color7
              outlined  
              append-icon="mdi-magnify"
              label="CB16wks"
              v-model="cbwks"
              single-line
              hide-details
              ></v-text-field>
          </v-flex>
          <!-- 7 -->
          <v-flex xs1 pr-2 pl-2 v-if="!isHidden">
              <v-text-field
              color = filters.color8
              outlined  
              append-icon="mdi-magnify"
              label="PDL1 IC"
              v-model="pdlIC"
              single-line
              hide-details
              ></v-text-field>
          </v-flex>
          <!-- 8 -->
          <v-flex xs1 pr-2 pl-2 v-if="!isHidden">
              <v-text-field
              color = filters.color1
              outlined  
              append-icon="mdi-magnify"
              label="HPV Status"
              v-model="hpvStatus"
              single-line
              hide-details 
              ></v-text-field>
          </v-flex>
          <!-- 9 -->
          <v-flex xs3 pr-2 pl-4 v-if="!isHidden">
            <v-row >
              <label for="start">CT Date From : </label>
              <input type="date" id="start" max="ctDate_toDate" v-model="ctDate_fromDate" >
            </v-row>
            <v-row>
              <label for="end">CT Date To : </label>
              <input type="date" id="end" min="ctDate_fromDate" v-model="ctDate_toDate" >
            </v-row>
          </v-flex>
        </v-layout>
        </template>
    </v-data-table>
  </v-flex>
  <v-flex>
     <v-row>
      <v-col xs1 pl-2 pr-2>
      </v-col>
      <h2>Charts According to Part_CT : </h2>
      <v-col xs1 pl-2 pr-2>
        <v-row>
        <v-btn
              class="ma-2"
              color="success"
              dark
              small
              @click="overlay1 = !overlay1"
            >
              <v-icon
                dark
              >
                mdi-chart-bar
              </v-icon>
            </v-btn>
        <v-btn
              class="ma-2"
              color="alert"
              dark
              small
              @click="overlay2 = !overlay2"
            >
              
              <v-icon
                dark
              >
                mdi-chart-pie
              </v-icon>
            </v-btn>
        </v-row> 
      </v-col>
      <v-spacer></v-spacer>

      <!-- <v-col xs1 pl-2 pr-2>
        Naman 
      </v-col>
      <v-col xs1 pl-2 pr-2>
        Naman 
      </v-col>
      <v-col xs1 pl-2 pr-2>
        Naman 
      </v-col>
      <v-col xs1 pl-2 pr-2>
        Naman 
      </v-col>
      <v-col xs1 pl-2 pr-2>
        Naman 
      </v-col>
      <v-col xs1 pl-2 pr-2>
        Naman 
      </v-col>
      <v-col xs1 pl-2 pr-2>
        Naman 
      </v-col>
      <v-col xs1 pl-2 pr-2>
        Naman 
      </v-col>
      <v-col xs1 pl-2 pr-2>
        Naman 
      </v-col>
      <v-col xs1 pl-2 pr-2>
        Naman 
      </v-col> -->
    </v-row>
  </v-flex>
  <v-flex>
    <v-row>
      <v-overlay
          :absolute="absolute"
          :value="overlay1"
          opacity="1"
        >
        <v-btn
          fab
          small
          color="warning"
          @click="overlay1 = false"
        >
          <v-icon
                dark
              >
                mdi-close
              </v-icon>
        </v-btn>
  <barspartCT 
    class="chart"
    :data="this.data_Details.map((d) => d.part_CT)"
    :margin-left="80"
    :margin-top="80"
    :margin-bottom="80"
    :margin-right="80"
    :tick-count="5"
    :bar-padding="0.5"
    />
    </v-overlay>
    </v-row>
  </v-flex>
  <v-flex>
    <v-row>
      <v-overlay
          :absolute="absolute"
          :value="overlay2"
          opacity="1"
        >
        <v-btn
          fab
          small
          color="warning"
          @click="overlay2 = false"
        >
          <v-icon
                dark
              >
                mdi-close
              </v-icon>
        </v-btn>
  <piepartCT
  :data="this.data_Details.map((d) => d.part_CT)"
  />
    </v-overlay>
    </v-row>
  </v-flex>
  </div>
</template>

<script>
import barspartCT from "./barcharts/barspartCT.vue";
import piepartCT from "./barcharts/piepartCT.vue";

export default {
  name: 'datafilter',
  components: {
    barspartCT,
    piepartCT,
  },
  data () {
    return {
            absolute: true,
            overlay1: false,
            overlay2: false,
            data_Desc_Url :
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvQmAr2pxspRHodWbYo6_usmDZ5wXpERkaX35XtFdsgM_b54vzRhUJhp5yQ5bwWGsBJq0lMPVy8Wet/pub?gid=0&single=true&output=csv",
            data_Details:[],
            isHidden: false,
            part_CT:'',
            dose_CT:'',
            tumor:'',
            borAS:'',
            orr:'',
            cbwks:'',
            pdlIC:'',
            hpvStatus:'',
            ctDate_fromDate:'',
            ctDate_toDate:'',
            tsData:'',
            borData:'',
            filters: {
              color1:'#001219',
              color2:'#005f73',
              color3:'#0a9396',
              color4:'#94d2bd',
              color5:'#e9d8a6',
              color6:'#ee9b00',
              color7:'#ca6702',
              color8:'#ae2012',
            },
            options: {
            rowsPerPage: 10,
            },
            headers: [
        {
          text: 'Pat ID',
          align: 'left',
          sortable: false,
          value: 'pat_ID',
        },
        { text: 'Part (CT)', value: 'part_CT'
        ,filter: value => {
             if (!this.part_CT) return true

              return value === this.part_CT.toLocaleUpperCase()
            }, 
            },
        { text: 'Dose (CT)', value: 'dose_CT'
        ,filter: value => {
             if (!this.dose_CT) return true

              return value === this.dose_CT+' mg'
            }, 
            },
        { text: 'Tumor type Abbrev for INDx 10-14-18', value: 'tumor'
        ,filter: value => {
              if (!this.tumor) return true

              return value === this.tumor.toLocaleUpperCase()
            }, 
            },
        { text: 'BOR as per GB 060120', value: 'borAS'
        ,filter: value => {
              if (!this.borAS) return true

              return value === this.borAS.toLocaleUpperCase()
            }, 
            },
        { text: 'ORR 060120', value: 'orr'
        ,filter: value => {
              if (!this.orr) return true

              return value === this.orr.toLocaleUpperCase()
            }, 
            },
        { text: 'CB16wks GB060120 (PR,CR, SD16wk)', value: 'cbwks'
        ,filter: value => {
              if (!this.cbwks) return true

              return value === this.cbwks.toLocaleUpperCase()
            }, 
            },
        { text: 'PDL1 IC/total nuc >=5% POS', value: 'pdlIC'
        ,filter: value => {
              if (!this.pdlIC) return true

              return value === this.pdlIC.toLocaleUpperCase()
            }, 
            },
        { text: 'HPV status', value: 'hpvStatus'
        ,filter: value => {
              if (!this.hpvStatus) return true

              return value === this.hpvStatus.toLocaleUpperCase()
            }, 
            },
        { text: 'BOR datacutoff date', value: 'borData'
            },
        { text: 'TS datacut for CB call', value: 'tsData' 
            },
        { text: 'CT date', value: 'ctDate'
        ,filter: value => {
              if(value != ''){
              var convertedDate_local = this.localizeDate(value);
              var convertedDate_from = new Date(this.ctDate_fromDate);
              var convertedDate_to = new Date(this.ctDate_toDate);
              if(!this.ctDate_fromDate && !this.ctDate_toDate){  return true }// If 'From' & 'To' Dates are not Available
              if(this.ctDate_fromDate && !this.ctDate_toDate){  return convertedDate_local.getTime()+19800000 >= convertedDate_from.getTime(); } //If 'To' Date is not Available
              if(!this.ctDate_fromDate && this.ctDate_toDate){  return convertedDate_local.getTime()+19800000 <= convertedDate_to.getTime(); }  //If 'From' Date is not Available 
              if(this.ctDate_fromDate && this.ctDate_toDate) {  return convertedDate_local.getTime()+19800000 >= convertedDate_from.getTime() && convertedDate_local.getTime()+19800000 <= convertedDate_to.getTime(); }  //If 'From' && 'To' Both Dates are Available 
              }
              return true;
              },  
              },
      ],
        }
  },
  // method to indicate the user the change in Screen Size 
    mounted() {
      window.onresize = function() {
        console.log("changed device dimensions")
      document.body.height = window.innerHeight;
    }
      this.fetchdata_Details();
    },
    updated() {
        console.log(this.data_Details);
      console.log(this.countUnique(this.data_Details.map((d) => d.part_CT)));
    },
    methods: {
      // Function to Fetch Details from Google Sheets Link Stored in variable data_Desc_Url 
      fetchdata_Details(){
         this.$papa.parse(this.data_Desc_Url, {
          download: true,
          header: true,
          complete: (results) => { 
            this.data_Details = results.data;
          }
        });
      },
      // Function To convert the dd/mm/yy to yyyy/mm/dd format { 01/01/22 to 2022/01/01 }
      localizeDate(date) {
        var [dd,mm,yy] = date.split('/');
        if(yy){
        var YY = yy.split('');
        YY.splice(0, 0, "2");
        YY.splice(1, 0, "0");
        yy = YY.join('');
        var d1 = (`${yy}/${mm}/${dd}`);
        var D1 = new Date(d1);
        return D1;
        }
        return date;
      },
      //function to count unique elements
      countUnique(iterable) {
        return new Set(iterable);
      },
    }
}
</script>

<style>
#app {
  height: 100vh;
  
}
.chart {
    margin: 120px auto;
    display: block;
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
</style>
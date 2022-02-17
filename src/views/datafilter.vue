<template>
  <div id="app" v-if="data_Details && data_Details.length" >
   <v-banner
    color="primary"
    outlined
    rounded
    tile
  >
  <h2 align="right" class="banner">Total Number of Entries : {{data_Details.length}}</h2>
  </v-banner>
  

  <v-data-table
    dense
    :headers="headers"
    :items= "data_Details"
    items-per-page="10"
    item-key="pat_ID" 
    :search="search"
    :custom-filter="filterOnlyCapsText"            
  >
    <template v-slot:top>
        <v-layout row wrap height="5px">
        <!-- 1 -->
        <v-flex xs1>
            
        </v-flex>
        <!-- 2 -->
        <v-flex xs1>
            <v-text-field
            color="success"
            outlined
            append-icon="mdi-magnify"
            label="Part CT"
            v-model="search"
            single-line
            hide-details
          ></v-text-field>
      
        </v-flex>
        <!-- 3 -->
        <v-flex xs1>
            <v-text-field
                outlined
            append-icon="mdi-magnify"
            label="Dose CT"
            v-model="dose_CT"
            single-line
            hide-details
            ></v-text-field>
        </v-flex>
        <!-- 4 -->
        <v-flex xs1>
            <v-text-field
                 color: success
                 outlined 
            append-icon="mdi-magnify"
            label="Tumor Type"
            v-model="tumor"
            single-line
            hide-details
            ></v-text-field>
        </v-flex>
        <!-- 5 -->
        <v-flex xs1>
            <v-text-field
                   outlined
            append-icon="mdi-magnify"
            label="BOR as"
            v-model="borAS"
            single-line
            hide-details
            ></v-text-field>
        </v-flex>
        <!-- 6 -->
        <v-flex xs1>
            <v-text-field
               color: success  
               outlined  
            :items="authors"
            label="ORR"
            v-model="orr"
            single-line
            hide-details
            ></v-text-field>
        </v-flex>
        <!-- 7 -->
        <v-flex xs1>
            <v-text-field
                outlined  
            label="CB16wks"
            v-model="cbwks"
            single-line
            hide-details
            ></v-text-field>
        </v-flex>
        <!-- 8 -->
        <v-flex xs1>
            <v-text-field
               color: success
               outlined  
            label="PDL1 IC"
            v-model="pdlIC"
            single-line
            hide-details
            ></v-text-field>
        </v-flex>
        <!-- 9 -->
        <v-flex xs1>
            <v-text-field
                outlined  
            label="HPV Status"
            v-model="hpvStatus"
            single-line
            hide-details 
            ></v-text-field>
        </v-flex>
        <!-- 10 -->
        <v-flex xs1 >
          <v-col class="pa-0 ma-0">
            <v-text-field
               color: success  
               outlined  
               label="BOR Data From"
               v-model="borData_fromDate"
               single-line
               hide-details
            ></v-text-field>
          </v-col>
          <v-col class="pa-0 ma-0">
            <v-text-field
               color: success  
               outlined  
               label="BOR Data To"
               v-model="borData_toDate"
               single-line
               hide-details
            ></v-text-field>
          </v-col>
        </v-flex>
        <!-- 11 -->
        <v-flex xs1>


            <v-menu
                    
            >
                <v-text-field
                        label="TS Data"
                        v-model="tsData"
                ></v-text-field>
                <v-date-picker
                        
                ></v-date-picker>

            </v-menu>

        </v-flex>
        <!-- 12 -->
        <v-flex xs1>
          
          <v-menu>
                <v-text-field
                       color: success
                       label="CT Date"
                       v-model="ctDate"
                       outlined 
                ></v-text-field>
                <v-date-picker
                ></v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
      </template>
  </v-data-table>
 
  </div>
</template>

<script>

export default {
  name: 'datafilter',
  
  data () {
    return {
            data_Desc_Url :
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvQmAr2pxspRHodWbYo6_usmDZ5wXpERkaX35XtFdsgM_b54vzRhUJhp5yQ5bwWGsBJq0lMPVy8Wet/pub?gid=0&single=true&output=csv",
            data_Details:[],
            search: '',
            part_CT:['A', 'C', 'D', 'E' , 'F' , 'G' , 'H' , 'DA' ],
            dose_CT:'',
            tumor:'',
            borAS:'',
            orr:'',
            cbwks:'',
            pdlIC:'',
            hpvStatus:'',
            borData_fromDate:'',
            borData_toDate:'',
            menu: false,
            tsData:'',
            ctDate:'',
            
            authors: ['N', 'NE', 'NA'],
            headers: [
        {
          text: 'Pat ID',
          align: 'left',
          sortable: false,
          value: 'pat_ID',
        },
        { text: 'Part (CT)', value: 'part_CT'
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
        ,filter: value => {
              if (!this.borData_fromDate&&!this.borData_toDate) return true
              return value >= this.borData_fromDate.getTime() && value <= this.borData_toDate.getTime()
            }, 
            },
        { text: 'TS datacut for CB call', value: 'tsData'
        ,filter: value => {
              if (!this.tsData) return true

              return value === this.tsData
            }, 
            },
        { text: 'CT date', value: 'ctDate'
        ,filter: value => {
              if (!this.ctDate) return true

              return value === this.ctDate
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
      // eslint-disable-next-line no-unused-vars
      filterOnlyCapsText (value, search, item) {
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
      },
      // filterDate() {
      //     if (this.borData !== undefined) {
      //         this.items = this.items.filter((item) => item.borData == this.borData)
      //     }
      // },
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
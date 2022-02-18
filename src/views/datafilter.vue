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
      items-per-page="10"
      item-key="pat_ID"        
    >
      <template v-slot:top >
          <v-layout row wrap height="5px" mt-4 mb-2>
          <!-- 1 -->
          <v-flex xs1 pr-2 pl-2>
            <v-btn
              class="ma-2"
              color="primary"
              dark
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
          <!-- 2 -->
          <v-flex xs1 pr-2 pl-2>
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
          <!-- 3 -->
          <v-flex xs1 pr-2 pl-2>
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
          <!-- 4 -->
          <v-flex xs1 pr-2 pl-2>
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
          <!-- 5 -->
          <v-flex xs1 pr-2 pl-2>
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
          <!-- 6 -->
          <v-flex xs1 pr-2 pl-2>
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
          <!-- 7 -->
          <v-flex xs1 pr-2 pl-2>
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
          <!-- 8 -->
          <v-flex xs1 pr-2 pl-2>
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
          <!-- 9 -->
          <v-flex xs1 pr-2 pl-2>
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
          <!-- 10 -->
          <!-- <v-flex xs0 pr-2 pl-2>
            <v-menu>
                  <v-text-field
                         color: success
                         label="BOR Data"
                         v-model="borData"
                         outlined 
                  ></v-text-field>
                  <v-date-picker
                  ></v-date-picker>
            </v-menu>
          </v-flex>
           11 -->
          <!-- <v-flex xs0 pr-2 pl-2>


              <v-menu

              >
                  <v-text-field
                          label="TS Data"
                          v-model="tsData"
                  ></v-text-field>
                  <v-date-picker

                  ></v-date-picker>

              </v-menu>

          </v-flex> -->
          <!-- 12 -->
          <v-flex xs3 pr-2 pl-2>
            <v-row >
              <label for="start">From: </label>
              <input type="date" id="start" v-model="ctDate_fromDate" >
            </v-row>
            <v-row>
              <label for="end">To: </label>
              <input type="date" id="end" v-model="ctDate_toDate" >
            </v-row>
          </v-flex>
        </v-layout>
        </template>
    </v-data-table>
  </v-flex>
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
            menu: false,
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
          ,filter: value => {
              if (!this.borData) return true

              return value === this.borData
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
              //if (!this.ctDate_fromDate && !this.ctDate_toDate) 
              console.log(value);
              if(value != ''){
              var convertedDate_local = this.localizeDate(value);
              console.log(convertedDate_local);
              var convertedDate_from = new Date(this.ctDate_fromDate);
              if(!convertedDate_from) return true
              return convertedDate_local >= convertedDate_from;
              }
              if(value == '')
              return true;
              // if (this.ctDate_fromDate && !this.ctDate_toDate) return value >= this.localizeDate(this.ctDate_fromDate)
              // if (!this.ctDate_fromDate && this.ctDate_toDate) return value <= this.localizeDate(this.ctDate_toDate)
              // if (value >= this.localizeDate(this.ctDate_fromDate) || value <= this.localizeDate(this.ctDate_toDate))
              // {
              // console.log(this.localizeDate(this.ctDate_fromDate))
              // console.log(this.localizeDate(this.ctDate_toDate))
              // console.log(value);
              // return value >= this.localizeDate(this.ctDate_fromDate) || value <= this.localizeDate(this.ctDate_toDate)
              // }
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
      // filterOnlyCapsText (value, search, item) {
      //   return value != null &&
      //     search != null &&
      //     typeof value === 'string' &&
      //     value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1
      // },
      localizeDate(date) {
        var [dd,mm,yy] = date.split('/');
        //console.log(yy);
        if(yy){
        var YY = yy.split('');
        //console.log(YY);
        YY.splice(0, 0, "2");
        YY.splice(1, 0, "0");
        yy = YY.join('');
        var d1 = (`${yy}/${mm}/${dd}`);
        var D1 = new Date(d1);
        return D1;
        }
        return date;
        // console.log(d1);
        // console.log(d2);
        // console.log(D1 <= D2);   // prints false (wrong!) 
        // console.log(D1 === D2);  // prints false (wrong!)
        // console.log(D1 != D2);   // prints true  (wrong!)
        // console.log(D1 !== D2);  // prints true  (wrong!)
        // console.log(D1.getTime() === D2.getTime()); // prints true (correct)
        // if (!date || !date.includes('-')) return date
        // var datefilter;
        // const [yyyy, mm, dd] = date.split('-')
        // datefilter = (`${dd}/${mm}/${yyyy}`)
        // var convertedDate = datefilter.split('');
        // // console.log(datefilter);
        // // console.log(convertedDate);
        // var newdate = [];
        // let index=0;
        // for (index = 0; index < convertedDate.length-4; index++) {
        //   newdate[index]=convertedDate[index];
        // }
        // newdate[index]=convertedDate[index+2];
        // newdate[index+1]=convertedDate[index+3];
        // return newdate.join("");
      },
      // filterDate() {
      //     if (this.borData !== undefined) {
      //         this.items = this.items.filter((item) => item.borData == this.borData)
      //     }
      // },
    }
}
</script>

<style>
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
</style>
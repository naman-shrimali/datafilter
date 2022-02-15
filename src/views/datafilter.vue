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
            single-line
            hide-details
            @input="filterpart_CT"
          ></v-text-field>
      
        </v-flex>
        <!-- 3 -->
        <v-flex xs1>
            <v-text-field
                outlined
            append-icon="mdi-magnify"
            label="Dose CT"
            single-line
            hide-details
            @input="filterdose_CT"   
            ></v-text-field>
        </v-flex>
        <!-- 4 -->
        <v-flex xs1>
            <v-text-field
                 color: success
                 outlined 
            append-icon="mdi-magnify"
            label="Tumor Type"
            single-line
            hide-details
            @input="filtertumor" 
            ></v-text-field>
        </v-flex>
        <!-- 5 -->
        <v-flex xs1>
            <v-text-field
                   outlined
            append-icon="mdi-magnify"
            label="BOR as"
            single-line
            hide-details
            @input="filterborAS"
            ></v-text-field>
        </v-flex>
        <!-- 6 -->
        <v-flex xs1>
            <v-select
               color: success  
               outlined  
            :items="data_Details.orr"
            label="ORR"
            single-line
            hide-details
            @change="orr" 
            ></v-select>
        </v-flex>
        <!-- 7 -->
        <v-flex xs1>
            <v-select
                outlined  
            label="CB16wks"
            single-line
            hide-details
            @change="cbwks"  
            ></v-select>
        </v-flex>
        <!-- 8 -->
        <v-flex xs1>
            <v-select
               color: success
               outlined  
            label="PDL1 IC"
            single-line
            hide-details
            @change="pdlIC"    
            ></v-select>
        </v-flex>
        <!-- 9 -->
        <v-flex xs1>
            <v-select
                outlined  
            label="HPV Status"
            single-line
            hide-details
            @change="hpvStatus"     
            ></v-select>
        </v-flex>
        <!-- 10 -->
        <v-flex xs1>

            <v-menu
                    
            >
                <v-text-field
                     prepend-icon="event"
                        readonly 
                        color: success
                        outlined  
                ></v-text-field>
                <v-date-picker
                        
                ></v-date-picker>

            </v-menu>

        </v-flex>
        <!-- 11 -->
        <v-flex xs1>


            <v-menu
                    
            >
                <v-text-field
                        
                ></v-text-field>
                <v-date-picker
                        
                ></v-date-picker>

            </v-menu>

        </v-flex>
        <!-- 12 -->
        <v-flex xs1>
            <v-menu
                    
            >
                <v-text-field
                       color: success
                       outlined 
                ></v-text-field>
                <v-date-picker
                        
                ></v-date-picker>

            </v-menu>
        </v-flex>

  <v-data-table
    dense
    v-scroll.self
    :headers="headers"
    :items="data_Details"
    items-per-page=10
    item-key="pat_ID"
    class="elevation-1"
    :search= "filters"
    :custom-filter="customFilter"
                    
  >
    <template slot="headers" slot-scope="props">
                    <tr>
                        <th>
                            <v-checkbox
                                    :input-value="props.all"
                                    :indeterminate="props.indeterminate"
                                    primary
                                    hide-details
                                    @click.native="toggleAll"
                            ></v-checkbox>
                        </th>
                        <th
                                v-for="header in props.headers"
                                :key="header.text"
                                :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                                @click="changeSort(header.value)"
                        >
                            <v-icon small>arrow_upward</v-icon>
                            {{ header.text }}
                        </th>
                    </tr>
                </template>
    <template slot="data_Details" slot-scope="props">
                    <tr :active="props.selected" @click="props.selected = !props.selected">
                        <td>
                            <v-checkbox
                                    :input-value="props.selected"
                                    primary
                                    hide-details
                            ></v-checkbox>
                        </td>
                        <td>{{ props.item.pat_ID }}</td>
                        <td >{{ props.item.part_CT}}</td>
                        <td >{{ props.item.dose_CT }}</td>
                        <td >{{ props.item.tumor}}</td>
                        <td >{{ props.item.borAS }}</td>
                        <td >{{ props.item.orr}}</td>
                        <td >{{ props.item.cbwks }}</td>
                        <td >{{ props.item.pdlIC}}</td>
                        <td >{{ props.item.hpvStatus }}</td>
                        <td >{{ props.item.borData}}</td>
                        <td >{{ props.item.tsData }}</td>
                        <td >{{ props.item.ctDate }}</td>
                    </tr>
                </template>
  </v-data-table>
  </v-layout>
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
            filters: {
                part_CT: '',
                dose_CT:'',
                tumor:'',
                borAS:'',
                orr:'',
                cbwks:'',
                pdlIC:'',
                hpvStatus:'',
                borData: null,
                tsData: null,
                ctDate: null,
            },
            // part_CT:['A', 'C', 'D', 'E' , 'F' , 'G' , 'H' , 'DA' ],
            // temp1:'',
            // dose_CT:'',
            // tumor:'',
            // temp3:'',
            // borAS:'',
            // temp4:'',
            // orr:'',
            // temp5:'',
            // cbwks:'',
            // temp6:'',
            // pdlIC:'',
            // temp7:'',
            // hpvStatus:'',
            // temp8:'',
            // borData:'',
            // temp9:'',
            // tsData:'',
            // temp10:'',
            // ctDate:'',
            // temp11:'',
            //
            headers: [
        {
          text: 'Pat ID',
          align: 'left',
          sortable: false,
          value: 'pat_ID',
        },
        { text: 'Part (CT)', value: 'part_CT'
        // ,filter: value => {
        //        if (!this.temp1) return true

        //       return value === this.temp1
        //     }, 
            },
        { text: 'Dose (CT)', value: 'dose_CT'
        // ,filter: value => {
        //      if (!this.dose_CT) return true

        //       return value === this.dose_CT
        //     }, 
            },
        { text: 'Tumor type Abbrev for INDx 10-14-18', value: 'tumor'
        // ,filter: value => {
        //       if (!this.temp3) return true

        //       return value === this.temp3
        //     }, 
            },
        { text: 'BOR as per GB 060120', value: 'borAS'
        // ,filter: value => {
        //       if (!this.temp4) return true

        //       return value === this.temp4
        //     }, 
            },
        { text: 'ORR 060120', value: 'orr'
        // ,filter: value => {
        //       if (!this.calories) return true

        //       return value < parseInt(this.calories)
        //     }, 
            },
        { text: 'CB16wks GB060120 (PR,CR, SD16wk)', value: 'cbwks'
        // ,filter: value => {
        //       if (!this.calories) return true

        //       return value < parseInt(this.calories)
        //     }, 
            },
        { text: 'PDL1 IC/total nuc >=5% POS', value: 'pdlIC'
        // ,filter: value => {
        //       if (!this.calories) return true

        //       return value < parseInt(this.calories)
        //     }, 
            },
        { text: 'HPV status', value: 'hpvStatus'
        // ,filter: value => {
        //       if (!this.calories) return true

        //       return value < parseInt(this.calories)
        //     }, 
            },
        { text: 'BOR datacutoff date', value: 'borData'
        // ,filter: value => {
        //       if (!this.calories) return true

        //       return value < parseInt(this.calories)
        //     }, 
            },
        { text: 'TS datacut for CB call', value: 'tsData'
        // ,filter: value => {
        //       if (!this.calories) return true

        //       return value < parseInt(this.calories)
        //     }, 
            },
        { text: 'CT date', value: 'ctDate'
        // ,filter: value => {
        //       if (!this.calories) return true

        //       return value < parseInt(this.calories)
        //     }, 
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
      customFilter(items, filters, filter, headers) {
        // Init the filter class.
        const cf = new this.$MultiFilters(items, filters, filter, headers);
        // Use regular function(),
        // arrow functions does not allow context binding.
        // Register the global standard filter.
        cf.registerFilter('search', function (searchWord, items) {
          if (searchWord.trim() === '') return items;
          return items.filter(item => {
            return item.part_CT.toLowerCase().includes(searchWord.toLowerCase());
          }, searchWord);
        });
        // Use regular function(),
        // arrow functions does not allow context binding.
        // Register "added_by" filter.
        cf.registerFilter('orr', function (orr, items) {
          // If the filter has not been applied yet
          // just return all available items.
          if (orr.trim() === '') return items;
          // Compare each item added_by and just return the matching ones.
          return items.filter(item => {
            return item.orr.toLowerCase() === orr.toLowerCase();
          }, orr);
        });
        // Use regular function(),
        // arrow functions does not allow context binding.
        // Register "start_date" filter.
        // cf.registerFilter('start_date', function (start_date, items) {
        //   // If the filter has not been applied yet
        //   // just return all available items.
        //   if (start_date === null) return items;
        //   // Compare each item start_date and just return the matching ones.
        //   return items.filter(item => {
        //     return item.birth_date >= start_date;
        //   }, start_date);
        // });
        // Use regular function(),
        // arrow functions does not allow context binding.
        // Register "end_date" filter.
        // cf.registerFilter('end_date', function (end_date, items) {
        //   // If the filter has not been applied yet
        //   // just return all available items.
        //   if (end_date === null) return items;
        //   // Compare each item end_date and just return the matching ones.
        //   return items.filter(item => {
        //     return item.birth_date <= end_date;
        //   }, end_date);
        // });
        // Its time to run all created filters.
        // Will be executed in the order thay were defined.
        return cf.runFilters();
      },
      /**
       * Handler when user input something at the "pat_ID" text field.
       */
      filterSearch(val) {
        this.filters = this.$MultiFilters.updateFilters(this.filters, {part_CT: val});
      },
      /**
       * Handler when user  select some author at the "ORR" select.
       */
      filterAuthor(val) {
        this.filters = this.$MultiFilters.updateFilters(this.filters, {orr: val});
      },

      // filterOnlyCapsText (value, dose_CT) {
      //   return value != null &&
      //     dose_CT != null &&
      //     typeof value === 'string' &&
      //     value.toString().toLocaleUpperCase().indexOf(dose_CT) !== -1
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
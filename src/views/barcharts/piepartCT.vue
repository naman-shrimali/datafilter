<template>
  <v-flex>
      <v-row >
      <v-col mt-4>
          <v-row 
          v-for="(color_name, index) in colors"
          :key="index"
          >
          <v-col><h5 >"{{ index }}"</h5></v-col>
          <v-col><v-btn color = primary ></v-btn></v-col>
          </v-row>
      </v-col>
  <v-col>
      <div class="w-full flex-1">
        <div id="my_data"></div>
      </div>
  </v-col>
  </v-row>
  </v-flex>
</template>
<script src="https://d3js.org/d3.v6.js"></script>
<script>
import * as d3 from "d3";
export default {
    props: {
        data: Array,
    },
    data() {
        return {
            width :450,
            height: 450,
            margin: 40,
            dataset: {},
            uni_partCT: Array,
            uni_partCTval: Array,
            colors: {
                A : '#98abc5',
                C : '#8a89a6',
                D : '#7b6888',
                E : '#6b486b',
                F : '#a05d56',
                G : '#001219',
                H : '#560bad',
                DA :'#081c15',
                '': '#8ecae6',
            }
        }
    },
    created() {
      this.uni_partCT=this.countUnique(this.data);
      this.countNoOfTimes();
      this.dataCreation();
      //let size = this.colors.length;
      //for (let index = 0; index < size; index++) {
      console.log(Array.from(Object.values(this.colors)));
      //}
    },
    mounted() {

          // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
          var radius = Math.min(this.width, this.height) / 2 - this.margin;

          // append the svg object to the div called 'my_dataviz'
          var svg = d3
            .select('#my_data')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .append('g')
            .attr(
              'transform',
              'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
            );

          // Create dummy data

          // set the color scale
          var color = d3
            .scaleOrdinal()
            .domain(Object.keys(this.dataset))
            .range(Array.from(Object.values(this.colors)));

          // Compute the position of each group on the pie:
          var pie = d3.pie().value(function (d) {
            return d[1];
          });

          var data_ready = pie(Array.from(Object.entries(this.dataset)));

          // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
          var paths = svg
            .selectAll('arc')
            .data(data_ready)
            .enter()
            .append('path')
            .attr("d", paths)
            .attr(
              'd',
              d3
                .arc()
                .innerRadius(100) // This is the size of the donut hole
                .outerRadius(radius)
            )
            .attr('fill', function (d) {
              return color(Object.entries(this.dataset).map(e => e[0]));
            })
            .attr('stroke', 'black')
            .style('stroke-width', '2px')
            .style('opacity', 1);

            var label = d3.arc()
                      .outerRadius(100)
                      .innerRadius(radius);

            paths.append("text")
           .attr("transform", function(d) { 
                    return "translate(" + label.centroid(d) + ")"; 
            })
           .text(function(d) { return d[0] })
           .style("font-family", "arial")
           .style("font-size", 15);
            

        },
        methods: {
        countUnique(iterable) {
          const set= new Set(iterable);
          return Array.from(set);
        },
        countOccurrences(arr, val)
        {
            let count=0;
            for (let index = 0; index < arr.length; index++) {
                if(arr[index]==val)
                count++;
            }
            return count;
        //return arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
        },
        countNoOfTimes()
        {
            let n=this.uni_partCT.length;
            for (let index = 0; index < n; index++) {
                this.uni_partCTval[index]=this.countOccurrences(this.data, this.uni_partCT[index]); 
                console.log("in");
            }
        },
        dataCreation() {
          this.dataset =  Object.assign.apply({}, this.uni_partCT.map( (v, i) => ( {[v]: this.uni_partCTval[i]} ) ) );
        },
    },
}
</script>

<style>

</style>
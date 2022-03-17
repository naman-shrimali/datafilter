<template>
  <svg class="barchart" :width="width + marginLeft / 2" :height="height + marginTop">
      <g :transform="`translate(${marginLeft / 2}, ${marginTop / 2})`">
      <g class="x-axis" fill="none" :transform="`translate(0, ${height})`">
        <path stroke="currentColor" :d="`M0.5,6V0.5H${width}.5V6`"></path>
        <g
          class="tick"
          opacity="1"
          font-size="14"
          font-family="sans-serif"
          text-anchor="middle"
          v-for="(bar, index) in bars"
          :key="index"
          :transform="`translate(${bar.x + bar.width / 2}, 0)`"
        >
          <line stroke="currentColor" y2="6"></line>
          <text fill="currentColor" y="9" dy="0.71em">{{ bar.xLabel }}</text>
        </g>
      </g>
      <g class="y-axis" fill="none" :transform="`translate(0, 0)`">
        <path
          class="domain"
          stroke="currentColor"
          :d="`M0.5,${height}.5H0.5V0.5H-6`"
        ></path>
        <g
          class="tick"
          opacity="1"
          font-size="14"
          font-family="sans-serif"
          text-anchor="end"
          v-for="(tick, index) in yTicks"
          :key="index"
          :transform="`translate(0, ${y(tick) + 0.5})`"
        >
          <line stroke="currentColor" x2="-6"></line>
          <text fill="currentColor" x="-9" dy="0.71em">{{ tick }}</text>
        </g>
      </g>
        <g class="bars" fill="none">
          <rect
            v-for="(bar, index) in bars"
            fill="pink"
            :key="index"
            :height="bar.height"
            :width="bar.width"
            :x="bar.x"
            :y="bar.y"
          ></rect>
        </g>
    </g>
  </svg>
</template>

<script>
import { scaleLinear, scaleBand } from "d3-scale";
export default {
    name: "BarChart",
    props: {
      data: Array,
      marginLeft: { default: 40 },
      marginTop: { default: 40 },
      marginBottom: { default: 40 },
      marginRight: { default: 40 },
      tickCount: { default: 5 },
      barPadding: { default: 0.3 },
    },
    data() {
      return {
        height: 300,
        width: 700,
        dataset: {},
        uni_partCT: Array,
        uni_partCTval: Array,
      };
    },
    created() {
      this.uni_partCT=this.countUnique(this.data);
      this.countNoOfTimes();
      console.log(this.uni_partCTval[2]);
      this.dataCreation();
      console.log(this.dataset);
    },
    computed: {
        yTicks() {
          console.log(this.y.ticks(5));
          return this.y.ticks(5);
        },
        x() {
          return scaleBand()
            .range([0, this.width])
            .padding(0.3)
            .domain(Object.entries(this.dataset).map(e => e[0]));
        },
        y() {
          let values = Object.entries(this.dataset).map(e => e[1]);
          return scaleLinear()
            .range([this.height, 0])
            .domain([0, Math.max(...values)]);
        },
        bars() {
                this.dataCreation();
                console.log(this.dataset)
          let bars = Object.entries(this.dataset).map(d => {
            return {
              xLabel: d[0],
              x: this.x(d[0]),
              y: this.y(d[1]),
              width: this.x.bandwidth(),
              height: this.height - this.y(d[1])
            };
          });
          return bars;
        }
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

  };
</script>

<style>

</style>
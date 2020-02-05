import React from "react";
import * as d3 from "d3";
import styled from "styled-components";
import { hogs } from "../data/hogObj.js";
import { worldGeoJson } from "./../assets/worldgeojson";

export class ArtOneMap extends React.Component {
  svgWidth = 800;
  svgHeight = 1000;
  projection = null;

  componentDidMount() {
    const colorScale = d3
      .scaleQuantize() // scales the numbers because the colours can be considered catagorical... allows each colour to represent lots of values
      .domain([0, 10])
      .range([
        "rgb(255,245,240)",
        "rgb(254,224,210)",
        "rgb(252,187,161)",
        "rgb(252,146,114)",
        "rgb(251,106,74)",
        "rgb(239,59,44)",
        "rgb(203,24,29)",
        "rgb(165,15,21)",
        "rgb(103,0,13)"
      ]);

    const projection = d3.geoNaturalEarth1();
    const path = d3.geoPath(projection);

    const svg = d3
      .select("#map-svg")
      .attr("width", this.svgWidth)
      .attr("height", this.svgHeight);

    // combine the geoJson with the zombie data
    worldGeoJson.features.forEach((country, countryIndex) => {
      // the features refers to each state
      hogs.forEach((hog, hogIndex) => {
        // if (
        //   country.properties.countryCode === "PHL" &&
        //   hog.countryCode === "PHL"
        // ) {
        //   console.log(country, hog);
        // }
        if (country.properties.countryCode !== hog.countryCode) {
          return null;
        }
        // this says add the zombie figure to the geoJson data
        worldGeoJson.features[countryIndex].properties.yearsHogWoman =
          hog.yearsHogWoman;
      });
    });

    svg
      .selectAll("path")
      .data(worldGeoJson.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", d => this.getColor(d))
      .attr("stroke", "lightsteelblue")
      .attr("stroke-width", 1)
      .attr("transform", d => `scale(0.8)`);
  }

  getColor = d => {
    const years = d.properties.yearsHogWoman;
    // if (d.properties.countryCode === "ERI") {
    //   console.log(years);
    // }
    if (years === undefined) return "white";
    if (years === 0) return "#ffece5";
    if (years < 5) return "#ffc7b3";
    if (years < 10) return "#ffa280";
    if (years < 15) return "#ff7c4d";
    if (years >= 15) return "#ff571a";
  };
  render() {
    return (
      <section className="page-excl-nav">
        <svg id="map-svg" />
        <div className="button-container"></div>
      </section>
    );
  }
}

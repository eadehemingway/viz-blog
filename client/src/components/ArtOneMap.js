import React from "react";
import * as d3 from "d3";
import { hogs } from "../data/hogObj.js";
import { worldGeoJson } from "./../assets/worldgeojson";

export class ArtOneMap extends React.Component {
  svgWidth = 1000;
  svgHeight = 1000;
  projection = null;

  componentDidMount() {
    const projection = d3.geoMercator();
    const path = d3.geoPath(projection);

    const svg = d3
      .select("#map-svg")
      .attr("width", this.svgWidth)
      .attr("height", this.svgHeight);

    worldGeoJson.features.forEach((country, countryIndex) => {
      hogs.forEach(hog => {
        if (country.properties.countryCode !== hog.countryCode) {
          return null;
        }
        worldGeoJson.features[countryIndex].properties.info = hog;
      });
    });

    const countryGroups = svg
      .selectAll(".country-groups")
      .data(worldGeoJson.features)
      .enter()
      .append("g")
      .attr("class", "country-groups");
    const tooltipPadding = 26;
    countryGroups
      .append("path")
      .attr("d", path)
      .attr("fill", d => this.getColor(d))
      .attr("stroke", "lightsteelblue")
      .attr("stroke-width", 1)
      .attr("transform", `scale(0.8) translate(60, 220)`)
      .on("mouseover", d => {
        tooltipGroup.style("visibility", "visible");
      })
      .on("mousemove", d => {
        tooltipGroup.attr(
          "transform",
          `translate(${d3.event.offsetX},${d3.event.offsetY - tooltipPadding})`
        );
        if (tooltipText && d.properties.info) {
          tooltipText
            .text(d.properties.info.country)
            .style("fill", "red")
            .style("z-index", "100")
            .style("font-size", "10px")
            .attr("dx", "5")
            .attr("dy", "13");
        }
      })
      .on("mouseout", () => tooltipGroup.style("visibility", "hidden"));

    const tooltipGroup = svg.append("g").attr("class", "tooltip");

    tooltipGroup
      .append("rect")
      .attr("width", 200)
      .attr("height", 20)
      .attr("fill", "white");
    const tooltipText = tooltipGroup.append("text").attr("class", "text");
  }

  getColor = d => {
    if (!d.properties.info) {
      return "grey";
    }
    const years = d.properties.info.yearsHogWoman;
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

import React from "react";
import * as d3 from "d3";
import populismData from "./../data/europePopulism";

import { europeJson } from "./../assets/europeJson";
import styled from "styled-components";

export class ArtTwoMap extends React.Component {
  svgWidth = 1000;
  svgHeight = 500;
  projection = null;

  state = {
    index: 0
  };

  componentDidMount() {
    const projection = d3
      .geoMercator()
      .scale(960 / Math.PI / 2) // 960 pixels over 2 π radians
      .translate([480, 300]);
    const path = d3.geoPath(projection);

    const svg = d3
      .select("#map-svg")
      .attr("width", this.svgWidth)
      .attr("height", this.svgHeight);

    europeJson.features.forEach((country, countryIndex) => {
      populismData.forEach(d => {
        if (country.properties.sov_a3 === d.country) {
          europeJson.features[countryIndex].properties.info = d;
        }
      });
    });

    const countryGroups = svg
      .selectAll(".country-groups")
      .data(europeJson.features)
      .enter()
      .append("g")
      .attr("class", "country-groups");

    const tooltipPadding = 10;

    countryGroups
      .append("path")
      .attr("d", path)
      .attr("fill", d => {
        if (!d.properties.info) return "#efe5db";
        if (d.properties.info.data[0].value === "x") return "#efe5db";
        const info = d.properties.info.data[0].value;
        return d3.interpolateGreens(info / 100);
      })
      .attr("stroke-width", "1px")
      .attr("opacity", 0.5)
      .attr("stroke", "lightsteelblue")
      .attr("transform", `scale(2) translate(-300, 0)`)
      .on("mouseover", d => {
        tooltipGroup.style("visibility", "visible");
      })
      .on("mousemove", d => {
        tooltipGroup.attr(
          "transform",
          `translate(${d3.event.offsetX + tooltipPadding},${d3.event.offsetY})`
        );
        if (false) {
          tooltipRect
            .attr("width", 200)
            .attr("height", 60)
            .attr("fill", "white");

          tooltipCountryText
            .text("hhhhhhhhhh")
            .style("fill", "red")
            .style("z-index", "100")
            .style("font-size", "10px")
            .attr("dx", "5")
            .attr("dy", "13");
          tooltipYearsText
            .text("hello")
            .style("fill", "red")
            .style("z-index", "100")
            .style("font-size", "10px")
            .attr("dx", "5")
            .attr("dy", "33");
        }
      })
      .on("mouseout", () => tooltipGroup.style("visibility", "hidden"));

    const tooltipGroup = svg.append("g").attr("class", "tooltip");
    const tooltipRect = tooltipGroup.append("rect");
    const tooltipCountryText = tooltipGroup
      .append("text")
      .attr("class", "country-text");
    const tooltipYearsText = tooltipGroup
      .append("text")
      .attr("class", "years-text");

    setInterval(() => {
      const { index } = this.state;
      const newIndex = index + 1;
      this.setState({ index: newIndex });
    }, 1000);
  }
  componentDidUpdate() {
    this.redraw();
  }

  redraw = () => {
    d3.selectAll("path").attr("fill", d => {
      const { index } = this.state;
      console.log("index:", index);
      if (!d.properties.info) return "#efe5db";
      if (d.properties.info.data[0].value === "x") return "#efe5db";
      const info = d.properties.info.data[index].value;
      return d3.interpolateGreens(info / 100);
    });
  };

  render() {
    return (
      <MapWrapper>
        <svg id="map-svg" />
      </MapWrapper>
    );
  }
}

const MapWrapper = styled.div`
  height: 800px;
`;

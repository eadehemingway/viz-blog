import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

import data from '../assets/mapEuropeWithElectionData';

export default function NationalPopulism() {
  const [index, setIndex] = useState(0)
  const ref = useRef(0);

  useEffect(() => {
    mountD3Map();
  }, []);

  useEffect(() => {
    if (ref.current >= 39) return;
    let id = setTimeout(() => {
      ref.current = ref.current + 1;
      setIndex(index+1)
    }, 300);
    return () => clearTimeout(id);
  });

  useEffect(() => {
    reColourMap(ref.current);
  }, [ref.current]);

  useEffect(()=> {
    updateToolTip()
  }, [index])

  function reColourMap(refCurrent) {
    d3.selectAll('path').attr('fill', country => {
      const value = country.properties.electionData?.[refCurrent].value;
      const noDataForCountry = !value;
      const noDataForYear = value === 'x';
      const transparent = noDataForCountry || noDataForYear;
      if (transparent) return 'transparent';
      const shadeOfGreen = d3.interpolateReds(value / 100);
      return shadeOfGreen;
    });
  }

  function mountD3Map() {
    const projection = d3
      .geoMercator()
      .scale(1500 / Math.PI / 2)
      .translate([580, 450]);

    const map = d3.select('#map')
      .attr('width', 2000)
      .attr('height', 1000)

    const countryGroups = map.selectAll('.country-groups')
      .data(data.features)
      .enter().append('g')
      .attr('class', 'country-groups');

    countryGroups
      .append('path')
      .attr('d', d3.geoPath(projection))
      .attr('stroke-width', '1px')
      .attr('stroke', 'lightsteelblue')
      .attr('transform', `scale(2) translate(-300, 0)`);

    const tooltipGroup = countryGroups
      .append("g")
      .attr("class", "tooltip")
      .style("visibility", "hidden");
    tooltipGroup
      .append("rect")
      .attr("width", 200)
      .attr("height", 60)
      .attr("fill", "white");
    tooltipGroup
      .append("text")
      .attr("class", "years-text")
      .text('test')
      .style("z-index", "100")
      .style("fill", "red")
      .style("font-size", "10px")
      .attr("dx", "5")
      .attr("dy", "13");

    countryGroups.on('mousemove', function() { 
      d3
        .select(this)
        .select('.tooltip')
        .style("visibility", "visible")
        .style("z-index", "100")
        .attr("transform", `translate(${d3.event.offsetX + 10},${d3.event.offsetY})`);
    });

    countryGroups.on('mouseout', function() { 
      d3
        .select(this)
        .select('.tooltip')
        .style("visibility", "hidden")
    });
  }

  function updateToolTip() {
    d3.selectAll('.years-text').text(d => {
      if(!d.properties.electionData) return '';
      return d.properties.electionData[ref.current].value;
    })
  }

  return (
    <MapWrapper>
      <h1>{1980 + index}</h1>
      <svg id="map" />
    </MapWrapper>
  );
}

const MapWrapper = styled.div`
  height: 800px;
  overflow: hidden;
  padding: 10px;
`;

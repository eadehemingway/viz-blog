import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

import data from '../assets/mapEuropeWithElectionData';

export default function NationalPopulism() {
  let [index, setIndex] = useState(0);

  useEffect(() => {
    mountD3Map();
  });

  useEffect(() => {
    if (index >= 39) return;
    let id = setTimeout(() => {
      setIndex(index + 1);
    }, 300);
    return () => clearTimeout(id);
  });

  useEffect(() => {
    reColourMap(index);
  }, [index]);

  function reColourMap(index) {
    d3.selectAll('path').attr('fill', country => {
      const value = country.properties.electionData?.[index].value;
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

    d3.select('#map')
      .attr('width', 2000)
      .attr('height', 1000)
      .selectAll('.country-groups')
      .data(data.features)
      .enter()
      .append('g')
      .attr('class', 'country-groups')
      .append('path')
      .attr('d', d3.geoPath(projection))
      .attr('stroke-width', '1px')
      .attr('opacity', 0.5)
      .attr('stroke', 'lightsteelblue')
      .attr('transform', `scale(2) translate(-300, 0)`);
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

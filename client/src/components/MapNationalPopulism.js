import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

import data from '../assets/mapEuropeWithElectionData';

export default function NationalPopulism() {
  const [index, setIndex] = useState(0);
  const ref = useRef(0);

  useEffect(() => {
    mountD3Map();
  });

  useEffect(() => {
    if (ref.current >= 39) return;
    let id = setTimeout(() => {
      ref.current = ref.current + 1;
      setIndex(index + 1);
    }, 300);
    return () => clearTimeout(id);
  });

  useEffect(() => {
    reColourMap(ref.current);
  }, [index]);

  useEffect(() => {
    createTooltips();
  }, []);

  useEffect(() => {
    createTooltips();
  }, [index]);

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

    const map = d3
      .select('#map')
      .attr('width', 2000)
      .attr('height', 1000);

    const countryGroups = map
      .selectAll('.country-groups')
      .data(data.features)
      .enter()
      .append('g')
      .attr('class', 'country-groups');

    countryGroups
      .append('path')
      .attr('d', d3.geoPath(projection))
      .attr('stroke-width', '1px')
      .attr('opacity', 0.5)
      .attr('stroke', 'lightsteelblue')
      .attr('transform', `scale(2) translate(-300, 0)`);

    const tooltipGroup = countryGroups
      .append('g')
      .attr('class', 'tooltip-group')
      .style('visibility', 'hidden');
    tooltipGroup.append('rect');
    // tooltipGroup.append('text').attr('class', 'years-text');
    tooltipGroup.append('text').attr('class', 'tooltip-text');
  }

  // function updateToolTip() {
  //   console.log('updating tooltip');
  //   // d3.selectAll('.country-groups').attr('width', d=> console.log('dddd', d))
  //   d3.selectAll('.country-text')
  //     .text((d, i) => {
  //       // if (!d.properties.electionData) return 'yo';
  //       // if (d.properties.name_long === countryMouseOver) {
  //       //   return d.properties.electionData[ref.current].value;
  //       // }
  //       return 'hi';
  //     })
  //     .style('fill', 'red')
  //     .style('z-index', '100')
  //     .style('font-size', '10px')
  //     .attr('dx', '5')
  //     .attr('dy', '13');
  // }

  function createTooltips() {
    const tooltipPadding = 10;
    const countryGroups = d3.selectAll('.country-groups');
    const tooltipGroup = d3.selectAll('.tooltip-group');
    const tooltipRect = d3.selectAll('rect');
    const countryText = d3.selectAll('.tooltip-text');
    console.log('tooltipRect:', tooltipRect);

    countryGroups
      .on('mouseover', d => {
        console.log('d', d);
        tooltipGroup.style('visibility', 'visible');
        if (d.properties.electionData) {
          countryText.text(
            `${d.properties.name_long}: ${
              d.properties.electionData[ref.current].value
            }`
          );
        } else {
          countryText.text(`${d.properties.name_long}`);
        }
        tooltipRect
          .attr('width', 200)
          .attr('height', 60)
          .attr('fill', 'white');
      })
      .on('mousemove', d => {
        console.log('ref.current', ref.current);

        if (d.properties.electionData) {
          countryText.text(
            `${d.properties.name_long}: ${
              d.properties.electionData[ref.current].value
            }`
          );
        } else {
          countryText.text(`${d.properties.name_long}`);
        }
        tooltipGroup.attr(
          'transform',
          `translate(${d3.event.offsetX + tooltipPadding},${d3.event.offsetY})`
        );
        tooltipRect
          .attr('width', 200)
          .attr('height', 60)
          .attr('fill', 'white');
      })
      .on('mouseout', () => tooltipGroup.style('visibility', 'hidden'));
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

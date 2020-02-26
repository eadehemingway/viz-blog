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
    // what is returned from a useEffect is what happens when the component unmounts
    return () => clearTimeout(id);
  });

  useEffect(() => {
    reColourMap(ref.current);
  }, [index]);

  useEffect(() => {
    positionTooltip();
  }, []);

  useEffect(() => {
    positionTooltip();
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
      .attr('class', d => `tooltip-${d.properties.name_long}`)
      .style('visibility', 'hidden');
    tooltipGroup.append('rect');

    tooltipGroup
      .append('text')
      .text(ref.current)
      .attr('class', 'tooltip-text');
  }

  function positionTooltip() {
    const tooltipPadding = 10;
    const countryGroups = d3.selectAll('.country-groups');
    const tooltipRect = d3.selectAll('rect');
    d3.selectAll('.tooltip-text')
      .text(d => {
        if (d.properties.electionData) {
          return `${d.properties.name_long}: ${
            d.properties.electionData[ref.current].value
          }`;
        } else {
          return `${d.properties.name_long}`;
        }
      })
      .attr('x', 10)
      .attr('y', 20);

    countryGroups
      .on('mouseover', function(d) {
        const tooltip = d3.select(`.tooltip-${d.properties.name_long}`);
        tooltip.attr(
          'transform',
          `translate(${d3.event.offsetX + tooltipPadding},${d3.event.offsetY})`
        );

        tooltip.style('visibility', 'visible');
        tooltipRect
          .attr('width', 200)
          .attr('height', 60)
          .attr('fill', 'white');
      })
      .on('mousemove', d => {
        const tooltip = d3.select(`.tooltip-${d.properties.name_long}`);

        tooltip.attr(
          'transform',
          `translate(${d3.event.offsetX + tooltipPadding},${d3.event.offsetY})`
        );
        tooltipRect
          .attr('width', 200)
          .attr('height', 60)
          .attr('fill', 'white');
      })
      .on('mouseout', d =>
        d3
          .select(`.tooltip-${d.properties.name_long}`)
          .style('visibility', 'hidden')
      );
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

"use client"
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import { useRouter } from 'next/navigation';

type Topology = {
  type: 'Topology';
  objects: {
    collection: {
      type: 'GeometryCollection';
      geometries: any[];
    };
  };
  arcs: any[];
  transform: {
    scale: [number, number];
    translate: [number, number];
  };
};

type FeatureCollection = GeoJSON.FeatureCollection<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>;

const Map = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);

  useEffect(() => {
    const width = 960;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`);

    svg.selectAll("*").remove();

    const g = svg.append("g");

    const projection = d3.geoMercator()
      .center([20, 0])
      .scale(400)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    const tooltip = d3.select(tooltipRef.current)
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    d3.json('/AF.json')
      .then((data) => {
        const topology = data as Topology;
        const countries = topojson.feature(topology, topology.objects.collection) as FeatureCollection;

        g.selectAll(".country")
          .data(countries.features)
          .enter().append("path")
          .attr("class", "country")
          .attr("d", path)
          .style("fill", "#cccccc")
          .style("stroke", "#ffffff")
          .style("stroke-width", "1px")
          .on("click", (event, d) => {
            router.push(`/countries/${d.properties?.name.toLowerCase()}`);
          })
          .on("mouseover", (event, d) => {
            d3.select(event.currentTarget)
              .style("fill", "#00D4DC")
              .raise();
            setTooltipContent(d.properties?.name);
            
            tooltip.style("opacity", 1);
          })
          .on("mousemove", (event) => {
            tooltip
              .style("left", (event.pageX + 10) + "px")
              .style("top", (event.pageY - 10) + "px");
          })
          .on("mouseout", (event, d) => {
            d3.select(event.currentTarget)
              .style("fill", "#cccccc");
            setTooltipContent(null);
            tooltip.style("opacity", 0)
            .style("color", "black");
          });
      })
      .catch(error => {
        console.error('Error loading or parsing data:', error);
      });
  }, []);

  return (
    <>
      <div className="map bg-base-200">
        <svg ref={svgRef}></svg>
        <div ref={tooltipRef}>
          {tooltipContent}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 p-6 w-full bg-base-200">
        <div className="skeleton h-48 w-full sm:flex-1"></div>
        <div className="skeleton h-48 w-full sm:flex-1"></div>
        <div className="skeleton h-48 w-full sm:flex-1"></div>
      </div>
    </>

  );
};

export default Map;
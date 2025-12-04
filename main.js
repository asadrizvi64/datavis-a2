/**
 * DataVis Assignment 2: Interactive Multivariate Visualization
 *
 * This visualization displays a scatterplot of cars with:
 * - X-axis: Engine Size (liters)
 * - Y-axis: Horsepower (HP)
 * - Circle size: Retail Price
 * - Circle color: Car Type (Sedan, SUV, Sports Car, Wagon)
 *
 * Clicking on a car displays:
 * - 6 detailed attributes
 * - Bonus: Star plot visualization
 *
 * Built with D3.js v5
 */

// Wait until document has loaded
window.onload = () => {
  console.log("Loading car dataset visualization...");

  // Configuration for the scatterplot
  const config = {
    width: 700,
    height: 500,
    margin: { top: 20, right: 20, bottom: 60, left: 70 },
    // Attributes to display in detail view
    detailAttributes: [
      { key: "Name", label: "Car Name" },
      { key: "Retail Price", label: "Retail Price" },
      { key: "Engine Size (l)", label: "Engine Size (L)" },
      { key: "Horsepower(HP)", label: "Horsepower (HP)" },
      { key: "City Miles Per Gallon", label: "City MPG" },
      { key: "Highway Miles Per Gallon", label: "Highway MPG" }
    ],
    // Attributes for star plot (normalized numerical values)
    starAttributes: [
      { key: "Horsepower(HP)", label: "Horsepower" },
      { key: "City Miles Per Gallon", label: "City MPG" },
      { key: "Highway Miles Per Gallon", label: "Highway MPG" },
      { key: "Engine Size (l)", label: "Engine Size" },
      { key: "Weight", label: "Weight" },
      { key: "Retail Price", label: "Price" }
    ]
  };

  // Calculate inner dimensions
  const innerWidth = config.width - config.margin.left - config.margin.right;
  const innerHeight = config.height - config.margin.top - config.margin.bottom;

  // Load the cars.csv dataset
  d3.csv("cars.csv").then(data => {
    console.log(`Loaded ${data.length} cars`);

    // Data cleaning and preprocessing
    // The README mentions the dataset contains errors, so we clean it
    data = data.map(d => ({
      ...d,
      "Engine Size (l)": +d["Engine Size (l)"] || 0,
      "Horsepower(HP)": +d["Horsepower(HP)"] || 0,
      "Retail Price": +d["Retail Price"] || 0,
      "City Miles Per Gallon": +d["City Miles Per Gallon"] || 0,
      "Highway Miles Per Gallon": +d["Highway Miles Per Gallon"] || 0,
      "Weight": +d["Weight"] || 0
    })).filter(d =>
      // Filter out rows with invalid data
      d["Engine Size (l)"] > 0 &&
      d["Horsepower(HP)"] > 0 &&
      d["Retail Price"] > 0
    );

    console.log(`After cleaning: ${data.length} cars`);

    // Create color scale for car types
    const carTypes = [...new Set(data.map(d => d.Type))].sort();
    const colorScale = d3.scaleOrdinal()
      .domain(carTypes)
      .range(d3.schemeCategory10);

    // Create scales for the scatterplot
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d["Engine Size (l)"]) * 1.1])
      .range([0, innerWidth])
      .nice();

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d["Horsepower(HP)"]) * 1.1])
      .range([innerHeight, 0])
      .nice();

    // Size scale for circles (based on price)
    const sizeScale = d3.scaleSqrt()
      .domain([0, d3.max(data, d => d["Retail Price"])])
      .range([3, 20]);

    // Create SVG for scatterplot
    const svg = d3.select("#scatterplot")
      .append("svg")
      .attr("width", config.width)
      .attr("height", config.height);

    const g = svg.append("g")
      .attr("transform", `translate(${config.margin.left},${config.margin.top})`);

    // Add grid lines for better readability
    g.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickFormat("")
      );

    g.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat("")
      );

    // Add X axis
    g.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    // Add X axis label
    g.append("text")
      .attr("class", "axis-label")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + 45)
      .attr("text-anchor", "middle")
      .text("Engine Size (liters)");

    // Add Y axis
    g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(yScale));

    // Add Y axis label
    g.append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -50)
      .attr("text-anchor", "middle")
      .text("Horsepower (HP)");

    // Create tooltip for hover effects
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip");

    // Add circles for each car
    const circles = g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "car-point")
      .attr("cx", d => xScale(d["Engine Size (l)"]))
      .attr("cy", d => yScale(d["Horsepower(HP)"]))
      .attr("r", d => sizeScale(d["Retail Price"]))
      .attr("fill", d => colorScale(d.Type))
      .attr("opacity", 0.7);

    // Add hover effects with tooltip
    circles
      .on("mouseover", function(d) {
        d3.select(this).attr("opacity", 1);
        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.Name}</strong><br/>
                 Engine: ${d["Engine Size (l)"]}L<br/>
                 HP: ${d["Horsepower(HP)"]}<br/>
                 Price: $${d["Retail Price"].toLocaleString()}`)
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 10) + "px");
      })
      .on("mousemove", function() {
        tooltip
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 10) + "px");
      })
      .on("mouseout", function() {
        d3.select(this).attr("opacity", 0.7);
        tooltip.style("opacity", 0);
      });

    // Add click interaction to show details
    circles.on("click", function(d) {
      // Remove previous selection
      circles.classed("selected", false);
      // Add selection to clicked circle
      d3.select(this).classed("selected", true);

      // Show detail panel
      showCarDetails(d, data);
    });

    // Create legend
    createLegend(carTypes, colorScale);

    // Function to display car details and star plot
    function showCarDetails(car, allData) {
      const detailPanel = d3.select("#detail-panel");
      detailPanel.classed("hidden", false);

      // Clear previous details
      d3.select("#car-details").html("");
      d3.select("#star-plot").html("");

      // Display the 6 attributes
      const detailsDiv = d3.select("#car-details");
      config.detailAttributes.forEach(attr => {
        const item = detailsDiv.append("div").attr("class", "detail-item");
        item.append("div")
          .attr("class", "detail-label")
          .text(attr.label + ":");

        let value = car[attr.key];
        // Format price with dollar sign and commas
        if (attr.key === "Retail Price") {
          value = "$" + (+value).toLocaleString();
        }

        item.append("div")
          .attr("class", "detail-value")
          .text(value);
      });

      // Create star plot (BONUS)
      createStarPlot(car, allData);
    }

    // Function to create star plot
    function createStarPlot(car, allData) {
      const starDiv = d3.select("#star-plot");
      starDiv.append("h4").text("Performance Star Plot");

      const starSize = 200;
      const starCenter = starSize / 2;
      const numAxes = config.starAttributes.length;

      // Create SVG for star plot
      const starSvg = starDiv.append("svg")
        .attr("width", starSize)
        .attr("height", starSize);

      const starG = starSvg.append("g")
        .attr("transform", `translate(${starCenter},${starCenter})`);

      // Normalize data for each attribute (0-1 scale based on dataset min/max)
      const normalizedValues = config.starAttributes.map(attr => {
        const values = allData.map(d => d[attr.key]).filter(v => v > 0);
        const min = d3.min(values);
        const max = d3.max(values);
        const normalized = (car[attr.key] - min) / (max - min);
        return {
          label: attr.label,
          value: normalized,
          actual: car[attr.key]
        };
      });

      // Draw background circles
      [0.25, 0.5, 0.75, 1.0].forEach(radius => {
        starG.append("circle")
          .attr("r", radius * (starSize / 2 - 30))
          .attr("fill", "none")
          .attr("stroke", "#e0e0e0")
          .attr("stroke-width", 1);
      });

      // Draw axes
      normalizedValues.forEach((attr, i) => {
        const angle = (Math.PI * 2 * i / numAxes) - Math.PI / 2;
        const lineLength = starSize / 2 - 30;

        // Draw axis line
        starG.append("line")
          .attr("class", "star-axis")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", Math.cos(angle) * lineLength)
          .attr("y2", Math.sin(angle) * lineLength);

        // Add labels
        const labelDistance = starSize / 2 - 15;
        starG.append("text")
          .attr("class", "star-label")
          .attr("x", Math.cos(angle) * labelDistance)
          .attr("y", Math.sin(angle) * labelDistance)
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .text(attr.label);
      });

      // Create polygon path for the car's values
      const polygonPoints = normalizedValues.map((attr, i) => {
        const angle = (Math.PI * 2 * i / numAxes) - Math.PI / 2;
        const distance = attr.value * (starSize / 2 - 30);
        return [
          Math.cos(angle) * distance,
          Math.sin(angle) * distance
        ];
      });

      // Draw the polygon
      const pathData = polygonPoints.map((p, i) =>
        `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`
      ).join(' ') + ' Z';

      starG.append("path")
        .attr("class", "star-polygon")
        .attr("d", pathData);

      // Add points at each vertex
      polygonPoints.forEach((point, i) => {
        starG.append("circle")
          .attr("cx", point[0])
          .attr("cy", point[1])
          .attr("r", 4)
          .attr("fill", "#3498db")
          .attr("stroke", "#fff")
          .attr("stroke-width", 2)
          .append("title")
          .text(`${normalizedValues[i].label}: ${normalizedValues[i].actual}`);
      });
    }

    // Function to create legend
    function createLegend(types, colorScale) {
      const legend = d3.select("#legend");
      legend.append("h3").text("Car Types");

      types.forEach(type => {
        const item = legend.append("div").attr("class", "legend-item");

        item.append("div")
          .attr("class", "legend-color")
          .style("background-color", colorScale(type));

        item.append("span").text(type);
      });

      // Add legend for circle size
      legend.append("h3")
        .style("margin-top", "15px")
        .text("Circle Size");

      legend.append("p")
        .style("font-size", "11px")
        .style("color", "#666")
        .text("Represents retail price (larger = more expensive)");
    }

    console.log("Visualization complete!");
  }).catch(error => {
    console.error("Error loading data:", error);
    d3.select("#scatterplot")
      .append("p")
      .style("color", "red")
      .text("Error loading data. Please check that cars.csv is in the same directory.");
  });
};

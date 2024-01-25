const datalocation3 = 'GlobalTemperatures.json'

let data3 = d3.json(datalocation3)
    .then(function(data3) {
        const svgScatter = d3.select('#scatterplot_3');
        const marginScatter = { top: 20, right: 20, bottom: 45, left: 60 };
        const widthScatter = +svgScatter.attr("width") - marginScatter.left - marginScatter.right;
        const heightScatter = +svgScatter.attr("height") - marginScatter.top - marginScatter.bottom;

        const xScatter = d3.scaleLinear()
                .domain([d3.min(data3, d => d.time), d3.max(data3, d => d.time)])
                .range([0, widthScatter]);

        const yScatter = d3.scaleLinear()
                .domain([d3.min(data3, d => d.LAT), d3.max(data3, d => d.LAT)])
                .range([heightScatter, 0]);

        const gScatter = svgScatter.append("g")
                .attr("transform", "translate(" + marginScatter.left + "," + marginScatter.top + ")");

        gScatter.selectAll("circle")
                .data(data3)
                .enter().append("circle")
                .attr("cx", d => xScatter(d.time))
                .attr("cy", d => yScatter(d.LAT))
                .attr("r", d => d.LATU)
                .attr("fill", "green")
                
        gScatter.selectAll("circle")
                .data(data3)
                .enter().append("circle")
                .attr("cx", d => xScatter(d.time))
                .attr("cy", d => yScatter(d.LOAT))
                .attr("r", d => d.LOATU)
                .attr("fill", "blue");

        gScatter.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + heightScatter + ")")
                .call(d3.axisBottom(xScatter));

        gScatter.append("g")
                .attr("class", "y-axis")
                .call(d3.axisLeft(yScatter));

        gScatter.append("text")
                .attr("class", "x label")
                .attr("text-anchor", "end")
                .attr("x", widthScatter / 2 + 20)
                .attr("y", heightScatter + 33)
                .text("Time (s)");

        gScatter.append("text")
                .attr("class", "y label")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-90)")
                .attr("y", -marginScatter.left + 20)
                .attr("x", -marginScatter.top - 90)
                .text("Land Average Temperature (Degrees C)")
                .attr("fill", "green")
                
    })
    .catch(function(error) {
        console.error("Error loading JSON file:", error);
    });
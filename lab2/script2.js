const datalocation2 = 'GlobalTemperatures.json'

let data2 = d3.json(datalocation)
    .then(function(data2) {
        const svgScatter = d3.select('#scatterplot_2');
        const marginScatter = { top: 20, right: 20, bottom: 45, left: 60 };
        const widthScatter = +svgScatter.attr("width") - marginScatter.left - marginScatter.right;
        const heightScatter = +svgScatter.attr("height") - marginScatter.top - marginScatter.bottom;

        const xScatter = d3.scaleLinear()
            .domain([d3.min(data2, d => d.LAT), d3.max(data2, d => d.LAT)])
            .range([0, widthScatter]);

        const yScatter = d3.scaleLinear()
            .domain([d3.min(data2, d => d.LOAT), d3.max(data2, d => d.LOAT)])
            .range([heightScatter, 0]);

        const gScatter = svgScatter.append("g")
            .attr("transform", "translate(" + marginScatter.left + "," + marginScatter.top + ")");

        gScatter.selectAll("ellipse")
            .data(data2)
            .enter().append("ellipse")
            .attr("cx", d => xScatter(d.LAT))
            .attr("cy", d => yScatter(d.LOAT))
            .attr("rx", d => d.LATU)
            .attr("ry", d => d.LOATU)
            .attr("fill", "black");

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
            .attr("x", widthScatter - 80 )
            .attr("y", heightScatter + 33)
            .text("Land Average Temperature (Degrees C)");

        gScatter.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -marginScatter.left + 20)
            .attr("x", -marginScatter.top - 30)
            .text("Land and Ocean Average Temperature (Degrees C)")

        gScatter.append("text")
            .attr("class", "legend2")
            .attr("y", 50)
            .attr("x", 60)
            .text("*Elliptical radii represent Uncertainty")
    })
    .catch(function(error) {
        console.error("Error loading JSON file:", error);
    });
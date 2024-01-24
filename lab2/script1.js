const datalocation = 'GlobalTemperatures.json'

let data = d3.json(datalocation)
    .then(function(data) {
        const svgScatter = d3.select('#scatterplot_1');
        const marginScatter = { top: 20, right: 20, bottom: 40, left: 40 };
        const widthScatter = +svgScatter.attr("width") - marginScatter.left - marginScatter.right;
        const heightScatter = +svgScatter.attr("height") - marginScatter.top - marginScatter.bottom;

        const xScatter = d3.scaleLinear()
                .domain([d3.min(data, d => d.time), d3.max(data, d => d.time)])
                .range([0, widthScatter]);

        const yScatter = d3.scaleLinear()
                .domain([d3.min(data, d => d.LAT), d3.max(data, d => d.LAT)])
                .range([heightScatter, 0]);

        const gScatter = svgScatter.append("g")
                .attr("transform", "translate(" + marginScatter.left + "," + marginScatter.top + ")");

        gScatter.selectAll("circle")
                .data(data)
                .enter().append("circle")
                .attr("cx", d => xScatter(d.time))
                .attr("cy", d => yScatter(d.LAT))
                .attr("r", d => d.LATU) // Circle radius
                .attr("fill", "black");

        gScatter.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + heightScatter + ")")
                .call(d3.axisBottom(xScatter));

        gScatter.append("g")
                .attr("class", "y-axis")
                .call(d3.axisLeft(yScatter));
    })
    .catch(function(error) {
        console.error("Error loading JSON file:", error);
    });

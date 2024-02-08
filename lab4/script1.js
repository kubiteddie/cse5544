const datalocation = 'GlobalTemperatures.json'

function numToDate(num){
        let year = Math.floor(num/10000)
        let day = num % 100
        let month = Math.floor(num/100) % 100
        return new Date(year, month-1, day)
}

function displayData(givenColor){

        let data = d3.json(datalocation)
        .then(function(data) {
                const svgScatter = d3.select('#scatterplot_1');
                const marginScatter = { top: 20, right: 20, bottom: 45, left: 60 };
                const widthScatter = +svgScatter.attr("width") - marginScatter.left - marginScatter.right;
                const heightScatter = +svgScatter.attr("height") - marginScatter.top - marginScatter.bottom;

                const cxScale = d3.scaleTime()
                        .domain([numToDate(d3.min(data, d => d.time)), numToDate(d3.max(data, d => d.time))])
                        .range([0, widthScatter]);

                const cyScale = d3.scaleLinear()
                        .domain([d3.min(data, d => d.LAT), d3.max(data, d => d.LAT)])
                        .range([heightScatter, 0]);

                const rScale = d3.scaleSqrt()
                        .domain([d3.min(data, d => d.LATU), d3.max(data, d => d.LATU)])
                        .range([4,8])

                const colorScale1 = d3.scaleLinear()
                        .domain([d3.min(data, d => d.LATU),d3.max(data, d => d.LATU),])
                        .range(['red', 'green'])

                const colorScale2 = d3.scaleLinear()
                        .domain([d3.min(data, d => d.LATU),d3.mean(data, d=>d.LATU),d3.max(data, d => d.LATU),])
                        .range(['#d7191c', '#ffffbf', '#1a9641'])   
                        
                const colorScale3 = d3.scaleQuantize()
                        .domain([d3.min(data, d => d.LATU), d3.max(data, d => d.LATU)])
                        .range(['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641'])        

                const gScatter = svgScatter.append("g")
                        .attr("transform", "translate(" + marginScatter.left + "," + marginScatter.top + ")");

                gScatter.selectAll("circle")
                        .data(data)
                        .enter().append("circle")
                        .attr("cx", d => cxScale(numToDate(d.time)))
                        .attr("cy", d => cyScale(d.LAT))
                        .attr("r", d => rScale(d.LATU))
                        .attr("fill", d => givenColor === 1 ? colorScale1(d.LATU) : givenColor === 2 ? colorScale2(d.LATU) : colorScale3(d.LATU));

                gScatter.append("g")
                        .attr("class", "x-axis")
                        .attr("transform", "translate(0," + heightScatter + ")")
                        .call(d3.axisBottom(cxScale));

                gScatter.append("g")
                        .attr("class", "y-axis")
                        .call(d3.axisLeft(cyScale));

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
        })
        .catch(function(error) {
                console.error("Error loading JSON file:", error);
        });

}

displayData(1)

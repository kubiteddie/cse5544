const datalocation = 'GlobalTemperatures.json'

function numToDate(num){
    let year = Math.floor(num/10000)
    let day = num % 100
    let month = Math.floor(num/100) % 100
    return new Date(year, month-1, day)
}

function scaleTime(min, max, widthScatter, point){
    return (point-min)/(max-min) * widthScatter;
}

function scaleLAT(min, max, heightScatter, point){
    return (point-min)/(max-min)*heightScatter;
}

fetch(datalocation)
    .then((response) => response.json())
    .then((data) => {
        const svgScatter = document.getElementById('scatterplot_1')
        const marginScatter = { top: 20, right: 20, bottom: 45, left: 60 };
        const widthScatter = +svgScatter.getAttribute("width") - marginScatter.left - marginScatter.right;
        const heightScatter = +svgScatter.getAttribute("height") - marginScatter.top - marginScatter.bottom;

        let time = []
        let LAT = []
        for (let item of data){
            time.push(item.time)
            LAT.push(item.LAT)
        }
        
        const maxTime = Math.max(...time)
        const minTime = Math.min(...time)
        const maxLAT = Math.max(...LAT)
        const minLAT = Math.min(...LAT)

        for(let point of data){
            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
            circle.setAttribute('cx', scaleTime(minTime, maxTime, widthScatter, point.time) + marginScatter.left)
            circle.setAttribute('cy', heightScatter-scaleLAT(minLAT, maxLAT, heightScatter, point.LAT))
            circle.setAttribute('r', point.LATU * 2)
            circle.setAttribute('fill', 'black')

            svgScatter.appendChild(circle)
        }

        let xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line")
        xAxis.setAttribute('x1', marginScatter.left-10)
        xAxis.setAttribute('y1', heightScatter)
        xAxis.setAttribute('x2', widthScatter+marginScatter.left)
        xAxis.setAttribute('y2', heightScatter)
        xAxis.setAttribute('stroke', 'black')

        svgScatter.appendChild(xAxis)

        let yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line")
        yAxis.setAttribute('x1', marginScatter.left)
        yAxis.setAttribute('y1', heightScatter+10)
        yAxis.setAttribute('x2', marginScatter.left)
        yAxis.setAttribute('y2', marginScatter.top)
        yAxis.setAttribute('stroke', 'black')

        svgScatter.appendChild(yAxis)

        let xAxisLabel = document.createElementNS("http://www.w3.org/2000/svg", "text")
        xAxisLabel.setAttribute('x', 250)
        xAxisLabel.setAttribute('y', heightScatter + 40)
        xAxisLabel.innerHTML += "Time (s)"

        svgScatter.appendChild(xAxisLabel)

        let yAxisLabel = document.createElementNS("http://www.w3.org/2000/svg", "text")
        yAxisLabel.setAttribute('x', 10)
        yAxisLabel.setAttribute('y', 20)
        yAxisLabel.setAttribute('transform', 'translate(10, 300) rotate(270)')
        yAxisLabel.innerHTML += "LAT (Degrees C)"

        svgScatter.appendChild(yAxisLabel)
    })

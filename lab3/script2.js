const datalocation2 = 'GlobalTemperatures.json'

function scaleLAT(min, max, widthScatter, point){
    return (point-min)/(max-min)*widthScatter;
}

function scaleLOAT(min, max, heightScatter, point){
    return (point-min)/(max-min)*heightScatter;
}

fetch(datalocation2)
    .then((response) => response.json())
    .then((data) => {
        const svgScatter = document.getElementById('scatterplot_2')
        const marginScatter = { top: 20, right: 20, bottom: 45, left: 60 };
        const widthScatter = +svgScatter.getAttribute("width") - marginScatter.left - marginScatter.right;
        const heightScatter = +svgScatter.getAttribute("height") - marginScatter.top - marginScatter.bottom;

        let LAT = []
        let LOAT = []
        let LATU = []
        let LOATU = []
        for(let item of data){
            LAT.push(item.LAT)
            LOAT.push(item.LOAT)
            LATU.push(item.LATU)
            LOATU.push(item.LOATU)
        }

        const maxLAT = Math.max(...LAT)
        const minLAT = Math.min(...LAT)
        const maxLOAT = Math.max(...LOAT)
        const minLOAT = Math.min(...LOAT)


        for(let point of data){
            let ellipse = document.createElementNS("http://www.w3.org/2000/svg", 'ellipse')
            ellipse.setAttribute('cx', scaleLAT(minLAT, maxLAT, widthScatter, point.LAT)+marginScatter.left)
            ellipse.setAttribute('cy', heightScatter-scaleLOAT(minLOAT, maxLOAT, heightScatter, point.LOAT))
            ellipse.setAttribute('rx', point.LATU * 2)
            ellipse.setAttribute('ry', point.LOATU * 2)
            ellipse.setAttribute('fill', 'black')

            svgScatter.appendChild(ellipse)
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
        xAxisLabel.setAttribute('x', 200)
        xAxisLabel.setAttribute('y', heightScatter + 40)
        xAxisLabel.innerHTML += "LAT (Degrees C)"

        svgScatter.appendChild(xAxisLabel)

        let yAxisLabel = document.createElementNS("http://www.w3.org/2000/svg", "text")
        yAxisLabel.setAttribute('x', 10)
        yAxisLabel.setAttribute('y', 20)
        yAxisLabel.setAttribute('transform', 'translate(10, 300) rotate(270)')
        yAxisLabel.innerHTML += "LOAT (Degrees C)"

        svgScatter.appendChild(yAxisLabel)

    })
const datalocation3 = 'GlobalTemperatures.json'

function scaleTime(min, max, widthScatter, point){
    return (point-min)/(max-min) * widthScatter;
}

function scaleLAT(min, max, heightScatter, point){
    return (point-min)/(max-min)*heightScatter;
}


fetch(datalocation3)
    .then((response) => response.json())
    .then((data) => {
        const svgScatter = document.getElementById('scatterplot_3')
        const marginScatter = { top: 20, right: 20, bottom: 45, left: 60 };
        const widthScatter = +svgScatter.getAttribute("width") - marginScatter.left - marginScatter.right;
        const heightScatter = +svgScatter.getAttribute("height") - marginScatter.top - marginScatter.bottom;

        let time = []
        let LAT = []
        let LOAT = []
        for (let item of data){
            time.push(item.time)
            LAT.push(item.LAT)
            LOAT.push(item.LOAT)
        }
        
        const maxTime = Math.max(...time)
        const minTime = Math.min(...time)
        const maxLAT = Math.max(...LAT)
        const minLAT = Math.min(...LAT)
        const maxLOAT = Math.max(...LOAT)
        const minLOAT = Math.min(...LOAT)

        for(let point of data){
            let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
            circle.setAttribute('cx', scaleTime(minTime, maxTime, widthScatter, point.time) + marginScatter.left)
            circle.setAttribute('cy', heightScatter-scaleLAT(Math.min(minLAT, minLOAT), Math.max(maxLAT, maxLOAT), heightScatter, point.LAT))
            circle.setAttribute('r', point.LATU * 2)
            circle.setAttribute('fill', 'green')

            svgScatter.appendChild(circle)

            let ocircle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
            ocircle.setAttribute('cx', scaleTime(minTime, maxTime, widthScatter, point.time) + marginScatter.left)
            ocircle.setAttribute('cy', heightScatter-scaleLAT(Math.min(minLAT, minLOAT), Math.max(maxLAT, maxLOAT), heightScatter, point.LOAT))
            ocircle.setAttribute('r', point.LOATU * 2)
            ocircle.setAttribute('fill', 'blue')

            svgScatter.appendChild(ocircle)
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

        let yAxis2 = document.createElementNS("http://www.w3.org/2000/svg", "line")
        yAxis2.setAttribute('x1', marginScatter.left+widthScatter)
        yAxis2.setAttribute('y1', heightScatter+10)
        yAxis2.setAttribute('x2', marginScatter.left+widthScatter)
        yAxis2.setAttribute('y2', marginScatter.top)
        yAxis2.setAttribute('stroke', 'black')

        svgScatter.appendChild(yAxis2)


    })
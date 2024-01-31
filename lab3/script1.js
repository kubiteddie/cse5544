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
    return (point-min)/(max-min)*widthScatter;
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

        

    })

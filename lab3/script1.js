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

fetch(datalocation)
    .then((response) => response.json())
    .then((data) => {
        const svgScatter = document.getElementById('scatterplot_1')
        const marginScatter = { top: 20, right: 20, bottom: 45, left: 60 };
        const widthScatter = +svgScatter.getAttribute("width") - marginScatter.left - marginScatter.right;
        const heightScatter = +svgScatter.getAttribute("height") - marginScatter.top - marginScatter.bottom;

        var time = []
        for (let i = 0; i < data.length; i++){
            time.push(data[i].time)
        }
        
        const maxTime = Math.max(...time)
        const minTime = Math.min(...time)
    })

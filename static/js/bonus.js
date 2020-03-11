function init(){
    d3.json("../samples.json").then(function(data1){
        user=data1.metadata[0]
        console.log(user)
        wash_freq=user.wfreq
        console.log(wash_freq)
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wash_freq,
                title: { text: "Wash Frequency" },
                type: "indicator",
                mode: "gauge",
                gauge: {
                    axis: { range: [null, 9]}
                }
            }
        ];
        
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data, layout);
    })
}

init()
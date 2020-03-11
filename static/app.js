//intial page
function init(){
    d3.json("static/data/samples.json").then(function(data1){
        var i = 0;
        user=Object.values(data1.samples[i]);
        user[2].sort((num1,num2)=> num2-num1)
        sample_value=user[2].slice(0,10).reverse();
        slicedDataID=user[1].slice(0,10).reverse();
        sample_label=user[3].slice(0,10).reverse();
        sample_id=[]
        for(i in slicedDataID){
            var num=slicedDataID[i];
            num=num.toString()
            sample_id.push("OTU " + num)
        }
        trace1={
            x:sample_value,
            y:sample_id,
            type:"bar",
            orientation: 'h',
            text:sample_label
        };
        data=[trace1];

        Plotly.newPlot("bar",data)

        trace2={
            x:user[1],
            y:user[2],
            mode:"markers",
            marker:{
                size:user[2],
                sizemode:"area",
                sizeref:.1,
                color:user[1]
            },
            text:user[3]
        }
        data=[trace2];

        Plotly.newPlot("bubble",data)

        meta_data=data1.metadata[0]
        console.log(meta_data)
        keys=Object.keys(meta_data)
        values=Object.values(meta_data)
        console.log(keys)
        console.log(values)
        var div=d3.select("#sample-metadata");
        div.selectAll("p").remove()
        for(i in keys){
            div.append("p").text(keys[i]+": "+ values[i])
        }
    })
}
//creates values and text for dropdown
d3.json("/static/data/samples.json").then(function(data){
    console.log(data);
    var dropDown = d3.select("#selDataset");
    var names= data.names;
    
    for(i in names){
        dropDown.append("option").attr("value", i).text(names[i]);
    };
});
//reloads all the charts and demographic info with user picked individual from dropdown
function optionChanged(value){
    var val=value;
    d3.json("/static/data/samples.json").then(function(data1){
        console.log(val);
        idUser=Object.values(data1.samples[val]);
        console.log(idUser);
        idUser[2].sort((num1,num2)=>num2-num1);
        console.log(idUser);
        slicedData=idUser.slice(0,10)
        console.log(slicedData)
        sample_value=slicedData[2].slice(0,10).reverse()
        slicedDataID=slicedData[1].slice(0,10).reverse()
        sample_label=slicedData[3].slice(0,10).reverse()
        sample_id=[]
        for(i in slicedDataID){
            var num=slicedDataID[i];
            num=num.toString()
            sample_id.push("OTU " + num)
        }
        console.log(sample_value)
        console.log(sample_id)
        console.log(sample_label)
        trace1={
            x:sample_value,
            y:sample_id,
            type:"bar",
            orientation: 'h',
            text:sample_label
        };
        data=[trace1];

        Plotly.newPlot("bar",data)

        trace2={
            x:idUser[1],
            y:idUser[2],
            mode:"markers",
            marker:{
                size:idUser[2],
                sizemode:"area",
                sizeref:.1,
                color:idUser[1]
            },
            text:idUser[3]
        }
        data=[trace2];

        Plotly.newPlot("bubble",data)

        meta_data=data1.metadata[val]
        console.log(meta_data)
        keys=Object.keys(meta_data)
        values=Object.values(meta_data)
        console.log(keys)
        console.log(values)
        var div=d3.select("#sample-metadata");
        div.selectAll("p").remove()
        for(i in keys){
            div.append("p").text(keys[i]+": "+ values[i])
        }
    })
}

init()
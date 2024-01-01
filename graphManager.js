

function populateGraph(data, numSeconds){
    
    
    
    
    
    
    var dataMax=[];
    let dataMin=[];
    let dataAve=[];
    
    
    let numReadings = data.length-1;
    console.log(data);
    console.log("Awooga!");   
    console.log(data[numReadings].dateRecieved)
    console.log(numSeconds)
    
    
    while(numReadings >= 0 && checkDateTime(data[numReadings].dateRecieved, numSeconds) ){
        
        
        let x = secondsSinceDate(data[numReadings].dateRecieved) - 3600
        dataMax[data.length-1-numReadings]= {x: x, y: parseFloat(data[numReadings].readingMax)}
        // console.log(dataMax[numReadings].y)
        // console.log(dataMax[data.length-1-numReadings].y + " " +numReadings)
        
        dataMin[data.length-1-numReadings]= {x: x, y:  parseFloat(data[numReadings].readingMin)}
        dataAve[data.length-1-numReadings]= {x: x, y:  parseFloat(data[numReadings].reading)}
        
        //console.log(numReadings)
        numReadings--;
        
        
        // console.log(data[numReadings].dateRecieved.toLocaleDateString())
    }
    
    
    
    console.log(dataMax)
    
    
    
    
    
    // Calculate the average
    const average = d3.mean(dataMax, d => d.y);
    
    
    
    // Function to identify spikes
    function isSpike(point, index, array) {
        if (index === 0 || index === array.length - 1) return false; // Ignore first and last points
        
        // Check if the point is higher than the previous and next points
        let prev = array[index - 1];
        let next = array[index + 1];
        if (!(point.y > prev.y && point.y > next.y)) return false;
        
        // Check if the point is the highest in the 3600 points range on either side
        let start = Math.max(0, index - 1800);
        let end = Math.min(array.length - 1, index + 1800);
        for (let i = start; i <= end; i++) {
            if (i !== index && array[i].y >= point.y) return false;
        }
        
        return true; // The point is a spike
    }
    
    // Filter for spikes
    
    
    // Calculate Q1, Q3, and IQR
    const sortedY = dataMax.map(d => d.y).sort(d3.ascending);
    const q1 = d3.quantile(sortedY, 0.25);
    const q3 = d3.quantile(sortedY, 0.75);
    const iqr = q3 - q1;
    const upperOutlierThreshold = q3 + 1.5 * iqr;
    
    // Filter for upper outliers
    const upperOutliers = dataMax.filter(d => d.y > upperOutlierThreshold);
    
    const spikes = dataMax.filter(isSpike).filter(d => d.y > upperOutlierThreshold);
    // Set up dimensions
    
    // Create scales
    const x = d3.scaleLinear()
    .domain([numSeconds, 0])
    .range([0, width]);
    console.log(d3.extent(dataMax, d => d.x))
    
    const y = d3.scaleLinear()
    .domain([0, d3.max(dataMax, d => d.y)])
    .range([height, 0]);
    
    console.log(d3.scaleLinear()
    .domain([0, d3.max(dataMax, d => d.y)])
    .range([height, 0]))
    console.log(d3.max(dataMax, d => d.y))
    // Line generator with curve
    const lineGenerator = d3.line()
    .curve(d3.curveMonotoneX)
    .x(d => x(d.x))
    .y(d => y(d.y));
    
    // Append SVG to the body
    
    
    
    
    
    switch (numSeconds){

        case (60): // 1 minute
        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickValues([0, 15, 30, 45, 60]) // Explicitly setting tick values
        .tickFormat(d => d/60 + ' Seconds')); // Format ticks to show 'hours'
        break;

        
        case (10*60): // 10 minutes
        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickValues([0, 60*2, 60*4, 60*6, 60*8, 60*10]) // Explicitly setting tick values
        .tickFormat(d => d/60 + ' Minutes')); // Format ticks to show 'hours'
        break;


        case (30*60): // 30 minutes
        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickValues([0, 60*10, 60*20, 60*30]) // Explicitly setting tick values
        .tickFormat(d => d/60 + ' Minutes')); // Format ticks to show 'hours'
        break;


        case (1*3600): // 1 hour
        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickValues([0, 60*15, 60*30, 60*45, 60*60]) // Explicitly setting tick values
        .tickFormat(d => d/60 + ' Minutes')); // Format ticks to show 'hours'
        break;
        
       
        
        case (5*3600): // 5 hours
        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickValues([0, 1*3600, 2*3600, 3*3600, 4*3600, 5*3600]) // Explicitly setting tick values
        .tickFormat(d => d/3600 + ' hours')); // Format ticks to show 'hours'
        break;
        
        
        case (24*3600): // 24 Hours
        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickValues([0, 6*3600, 12*3600, 18*3600, 24*3600]) // Explicitly setting tick values
        .tickFormat(d => d/3600 + ' hours')); // Format ticks to show 'hours'
        break;

        case (72*3600): // 72 Hours
        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickValues([0, 12*3600, 24*3600, 36*3600, 48*3600, 60*3600, 72*3600]) // Explicitly setting tick values
        .tickFormat(d => d/3600 + ' hours')); // Format ticks to show 'hours'
        break;

        case (7*24*3600): // Week
        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickValues([0, 24*3600, 24*3600*2, 24*3600*3, 24*3600*4, 24*3600*5, 24*3600*6, 24*3600*7]) // Explicitly setting tick values
        .tickFormat(d => d/(3600*24) + ' days')); // Format ticks to show 'hours'
        break;


        case (24*3600): // month
        svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickValues([0, 6*3600, 12*3600, 18*3600, 24*3600]) // Explicitly setting tick values
        .tickFormat(d => d/3600 + ' hours')); // Format ticks to show 'hours'
        break;
        
    }
    
    
    
    
    
    
    svg.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y)); // Limit to 4 ticks
    
    // Add the line
    svg.append("path")
    .datum(dataMax)
    .attr("class", "line line1")
    .attr("d", lineGenerator);
    
    svg.append("path")
    .datum(dataAve)
    .attr("class", "line line2")
    .attr("d", lineGenerator);
    
    svg.append("path")
    .datum(dataMin)
    .attr("class", "line line3")
    .attr("d", lineGenerator);
    
    // Add the X Axis
    
    
    
}





function isDateWithin24HoursOfNow(specificDate) {
    // Get the current date and time
    var currentDate = new Date();
    
    // Convert both dates to milliseconds
    var time1 = new Date(specificDate).getTime();
    var time2 = currentDate.getTime();
    
    // Calculate the difference in milliseconds
    var difference = Math.abs(time1 - time2);
    //console.log(difference);
    // Compare the difference with 24 hours in milliseconds
    return difference <= 24 * 60 * 60 * 1000;
}



function checkDateTime(specificDate, inSeconds) {
    // Get the current date and time
    var currentDate = new Date();
    
    // Convert both dates to milliseconds
    var time1 = new Date(specificDate).getTime()+3600*3*1000; //3 hours for some reason???
    var time2 = currentDate.getTime();
    
    // Calculate the difference in milliseconds
    var difference = Math.abs(time1 - time2);
    //console.log(difference);
    // Compare the difference with 24 hours in milliseconds
    return difference <= inSeconds * 1000;
}

function secondsSinceDate(pastDate) {
    // Get the current date and time
    var currentDate = new Date();
    
    // Convert both dates to milliseconds
    var pastTime = new Date(pastDate).getTime();
    var currentTime = currentDate.getTime();
    
    // Calculate the difference in milliseconds
    var differenceInMilliseconds = currentTime - pastTime;
    
    // Convert the difference to seconds (1 second = 1000 milliseconds)
    var differenceInSeconds = differenceInMilliseconds / 1000;
    
    return differenceInSeconds-(3600*2);
}



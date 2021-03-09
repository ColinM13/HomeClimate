const loadData = () => {
    fetch('http://192.168.1.67:3000/mostrecentreadings')
      .then( response => {
        if (response.status !== 200) {
          console.log(response);
        }
        return response;
      })
      .then(response => response.json())
      .then(parsedResponse => {
        const unpackData = (arr, key) => {
          return arr.map(obj => obj[key])
        }
        // const firstTrace = {
        //   type: 'scatter',
        //   mode: 'lines',
        //   name: 'Temperature',
        //   x: unpackData(parsedResponse, 'time'),
        //   y: unpackData(parsedResponse, 'temp'),
        //   line: {color: '#17BECF'}
        // }
        // const secondTrace = {
        //   type: "scatter",
        //   mode: "lines",
        //   name: 'Humidity',
        //   x: unpackData(parsedResponse, 'time'),
        //   y: unpackData(parsedResponse, 'humidity'),
        //   line: {color: '#7F7F7F'}
        // }
        // const thirdTrace = {
        //     type: "scatter",
        //     mode: "lines",
        //     name: 'Pressure',
        //     x: unpackData(parsedResponse, 'time'),
        //     y: unpackData(parsedResponse, 'pressure'),
        //     line: {color: '#27d40d'}
        //   }
        const tempF = ((unpackData(parsedResponse, 'temp')) * 9) / 5 + 32;
        const tempGauge = {
            domain: { x: [0, 1], y: [0, 1] },
            value: tempF,
            title: { text: "Temp" },
            type: "indicator",
            mode: "gauge+number",
            delta: { reference: 72 },
            gauge: { axis: { range: [null, 120] } },
            domain: { row: 0, column: 0 }
        }
        let humidity = unpackData(parsedResponse, 'humidity');
        humidity = humidity[0];
        console.log(humidity);
        const humidityGauge = {
            domain: { x: [0, 1], y: [0, 1] },
            value: humidity,
            title: { text: "Humidity" },
            type: "indicator",
            mode: "gauge+number",
            delta: { reference: 40 },
            gauge: { axis: { range: [null, 100] } },
            domain: { row: 0, column: 1 }
        }
        const data = [tempGauge, humidityGauge];
        const layout = {
          title: 'Bedroom Climate Data',
          width: 600,
          height: 400,
          grid: { rows: 2, columns: 2, pattern: "independent" },
        //   template: {
        //       data: {
        //           indicator: [
        //             {
        //               mode: "number+gauge",
        //             }
        //           ]
        //       }
        //   }
        };
        return Plotly.newPlot('graphs-container', data, layout);
      })
      .catch( error => console.log(error) );
  }
  
  $(window).on('load', loadData);
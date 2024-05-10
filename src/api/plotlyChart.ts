



export const PlotlyChartAPI = async (filePath: string) => {
    let result: any = [];
    await fetch(filePath)
      .then(response => response.json())
      .then(data => {
            result.push([data.voltage, data.current]);
          if (data.baseline != null) {
            let xValues = data.baseline.map(([x, _]: [number, unknown]) => x); // Extract x values
            let yValues = data.baseline.map(([_, y]: [unknown, number]) => y); // Extract y values
            result.push([xValues, yValues])
            result.push([])
            xValues = [data.info.v, data.info.v];
            yValues = [data.info.c, data.info.b[1]];
            result.push([xValues, yValues])
            result.push([])
            result.push(false)
          } else {
 
            let xValues = data.baseline_oxidation.map(([x, _]: [number, unknown]) => x); // Extract x values
            let yValues = data.baseline_oxidation.map(([_, y]: [unknown, number]) => y); // Extract y values
            result.push([xValues, yValues])

            xValues = data.baseline_reduction.map(([x , _]: [number, unknown]) => x); // Extract x values
            yValues = data.baseline_reduction.map(([_, y] : [unknown, number]) => y); // Extract y values
            
            result.push([xValues, yValues])

            xValues = [data.info.oxidation.v, data.info.oxidation.v];
            yValues = [data.info.oxidation.c, data.info.oxidation.b];

            result.push([xValues, yValues])

            xValues = [data.info.reduction.v, data.info.reduction.v];
            yValues = [data.info.reduction.c, data.info.reduction.b];

            result.push([xValues, yValues])
            result.push(true)
          }
        }).catch(error => console.log(error));
    return result;
}


export const ChartJsAPI = async (filePath: string) => {
    let result: any = [];
    await fetch(filePath)
    .then(response => response.json())
    .then(data => {
        result.push(data.current);
        result.push(data.voltage);
        const y_baseline = data.baseline_oxidation.map((row: any) => row[1]);
        result.push(y_baseline);
    }).catch(error => console.log(error));
    console.log(result)
    return result;

}
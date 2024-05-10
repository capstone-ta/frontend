

export const NivoChartAPI = async (filePath: string) => {
    let result: any = [];
    await fetch(filePath)
        .then(response => response.json())
        .then(data => {
            let mappedArray = data.current.map((xValue: string, index: string) => {
                // Check if array lengths are equal to avoid out-of-bounds access
                if (index >= data.voltage.length) {
                throw new Error('Arrays have different lengths');
                }
            
                return { y: xValue, x: data.voltage[index] };
            });
            result.push(mappedArray);
            if (data.baseline != null) {
                mappedArray = data.baseline.map((coordinatePair: [string, string]) => {
                    return {
                    x: coordinatePair[0],
                    y: coordinatePair[1],
                    };
                });
                result.push(mappedArray);
                result.push([]);

                mappedArray = [{
                    x: data.info.v,
                    y: data.info.c
                }, {
                    x: data.info.v,
                    y: data.info.b[1]
                }]
                result.push(mappedArray);
                result.push([]);
                result.push(false);
            } else {
                mappedArray = data.baseline_oxidation.map((coordinatePair: [string, string]) => {
                return {
                    x: coordinatePair[0],
                    y: coordinatePair[1],
                };
                });
                
                result.push(mappedArray);

                mappedArray = data.baseline_reduction.map((coordinatePair: [string, string]) => {
                return {
                    x: coordinatePair[0],
                    y: coordinatePair[1],
                };
                });
            
                result.push(mappedArray);

                mappedArray = [{
                x: data.info.oxidation.v,
                y: data.info.oxidation.c
                }, {
                x: data.info.oxidation.v,
                y: data.info.oxidation.b
                }]

                result.push(mappedArray);

                mappedArray = [{
                x: data.info.reduction.v,
                y: data.info.reduction.c
                }, {
                x: data.info.reduction.v,
                y: data.info.reduction.b
                }]

                result.push(mappedArray);
                result.push(true);
            }
            
        }).catch(error => console.log(error));
    return result;
}
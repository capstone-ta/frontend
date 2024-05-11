
type MyDictionary = {
    [key: number]: number[]; // Key is a string, value can be any type
  };

export const ChartJsAPI = async (filePath: string) => {
    function getUniquePairsSortedByFirstIndex(arr: [number, number][]) {
        // Use Set to remove duplicates based on whole pair (array)
        const uniquePairs = new Set(arr);
      
        // Convert Set to sorted array by first index
        return Array.from(uniquePairs).sort((a: [number, number], b: [number, number]) => a[0] - b[0]);
      }

    let result: any = [];
    await fetch(filePath)
    .then(response => response.json())
    .then(data => {
        let data_bawah = []
        let data_atas = []
        let labels_sorted = [...new Set(data.voltage as number[])].sort((a, b) => a - b);
        let dictionary: MyDictionary = {}
        for(let i = 0; i < data.current.length; i++) {
            if (data.voltage[i] in dictionary) {
                dictionary[data.voltage[i]].push(data.current[i])
            } else {
                dictionary[data.voltage[i]] = [data.current[i]]
            }
        }

        result.push(labels_sorted);
        if (data.baseline == null) {
            for (let i = 0; i < labels_sorted.length; i++) {
                let key: number = labels_sorted[i] as number
                data_bawah.push(Math.min(dictionary[key][0], dictionary[key][1]))
                data_atas.push(Math.max(dictionary[key][0], dictionary[key][1]))
            }
            result.push(data_atas)
            result.push(data_bawah)
            const y_baseline_oxidation = getUniquePairsSortedByFirstIndex(data.baseline_oxidation)
            result.push(y_baseline_oxidation);
            const y_baseline_reduction = getUniquePairsSortedByFirstIndex(data.baseline_reduction)
            result.push(y_baseline_reduction);

            let mappedArray = [[
                data.info.oxidation.v,
                data.info.oxidation.c
            ], [
                data.info.oxidation.v,
                data.info.oxidation.b
            ]]
            result.push(mappedArray);

            mappedArray = [[
                data.info.reduction.v,
                data.info.reduction.c
            ], [
                data.info.reduction.v,
                data.info.reduction.b
            ]]
            result.push(mappedArray);
            result.push(true);
        } else {
            result.push(data.voltage);
            result.push([])
            const y_baseline = data.baseline.map((row: any) => row[1]);
            result.push(y_baseline);
            result.push([])
        }
    }).catch(error => console.log(error));
    return result;

}
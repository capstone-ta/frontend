// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { ResponsiveLine } from '@nivo/line'
import React, { useState, useEffect } from 'react';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


interface DataPoint {
    x: number;
    y: number;
  }


interface GraphProps {
    filePath: string;
  }
  

const GraphNivo: React.FC<GraphProps> = ({filePath}) => {
    const [data, setData] = useState<DataPoint[]>([]);
    const [data2, setData2] = useState<DataPoint[]>([]);
    const [data3, setData3] = useState<DataPoint[]>([]);
    const [data4, setData4] = useState<DataPoint[]>([]);
    const [data5, setData5] = useState<DataPoint[]>([]);
    const [isCV, setIsCV] = useState<Boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
          const responseJson = fetch(filePath)
          .then(response => response.json())
          .then(data => {
              let mappedArray = data.current.map((xValue, index) => {
                  // Check if array lengths are equal to avoid out-of-bounds access
                  if (index >= data.voltage.length) {
                    throw new Error('Arrays have different lengths');
                  }
                
                  return { y: xValue, x: data.voltage[index] };
                });
                setData(mappedArray);
                if (data.baseline != null) {
                  console.log("MARKKKK")
                    mappedArray = data.baseline.map((coordinatePair) => {
                      return {
                        x: coordinatePair[0],
                        y: coordinatePair[1],
                      };
                    });
                    
                    setData2(mappedArray);

                    mappedArray = [{
                      x: data.info.v,
                      y: data.info.c
                    }, {
                      x: data.info.v,
                      y: data.info.b[1]
                    }]
  
                    setData4(mappedArray)
                } else {
                  setIsCV(true)
                  mappedArray = data.baseline_oxidation.map((coordinatePair) => {
                    return {
                      x: coordinatePair[0],
                      y: coordinatePair[1],
                    };
                  });
                  
                  setData2(mappedArray);

                  mappedArray = data.baseline_reduction.map((coordinatePair) => {
                    return {
                      x: coordinatePair[0],
                      y: coordinatePair[1],
                    };
                  });
              
                  setData3(mappedArray);

                  mappedArray = [{
                    x: data.info.oxidation.v,
                    y: data.info.oxidation.c
                  }, {
                    x: data.info.oxidation.v,
                    y: data.info.oxidation.b
                  }]

                  setData4(mappedArray)

                  mappedArray = [{
                    x: data.info.reduction.v,
                    y: data.info.reduction.c
                  }, {
                    x: data.info.reduction.v,
                    y: data.info.reduction.b
                  }]

                  setData5(mappedArray)
                }
                
          }).catch(error => console.log(error));
        } 
    
    
        fetchData();
      }, []);
    let data_graph = [
        {
          "id": "sebelum correction",
          "color": "hsl(47, 70%, 50%)",
          "data": data
        },
        {
          "id": isCV ? "setelah correction oksidasi" : "setelah correction" ,
          "color": "hsl(187, 70%, 50%)",
          "data": data2
        }
      ]
    
    if (isCV) {
      data_graph.push({
        "id": "setelah correction reduksi",
        "color": "hsl(187, 70%, 50%)",
        "data": data3
      })
      data_graph.push({
        "id": "puncak oxidation",
        "color": "hsl(187, 70%, 50%)",
        "data": data4
      })
      data_graph.push({
        "id": "puncak reduction",
        "color": "hsl(187, 70%, 50%)",
        "data": data5
      })
    } else {
      data_graph.push({
        "id": "puncak DPV",
        "color": "hsl(187, 70%, 50%)",
        "data": data4
      })
    }
    return(
        <div className='h-96'>
          <ResponsiveLine
            data={data_graph}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ 
                type: 'linear',
                min: 'auto',
                max: 'auto' 
            }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: false,
                reverse: false
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'V',
                legendOffset: 36,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'µA',
                legendOffset: -40,
                legendPosition: 'middle',
                truncateTickAt: 0
            }}
            pointSize={0}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
            legends={[
              {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
            ]}
          />
          
        </div>
    )
}

export default GraphNivo;
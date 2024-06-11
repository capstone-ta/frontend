import { ResponsiveLine } from '@nivo/line'
import React, { useState, useEffect } from 'react';
import { NivoChartAPI } from '../../api/nivoChart';


interface GraphProps {
    filePath1: string;
    filePath2: string;
  }

interface GraphData {
    dataPengukuranAsli: number[][];
    dataBaseline1: number[][];
    dataBaseline2: number[][];
    dataPuncak1: any[][];
    dataPuncak2: any[][];
    puncak1: number;
    puncak2: number;
}


const GraphNivo: React.FC<GraphProps> = ({filePath1, filePath2}) => {
  const [dataGraph1, setDataGraph1] = useState<GraphData>({
    dataPengukuranAsli: [],
    dataBaseline1: [],
    dataBaseline2: [],
    dataPuncak1: [],
    dataPuncak2: [],
    puncak1: 0,
    puncak2: 0
  });
  const [dataGraph2, setDataGraph2] = useState<GraphData>({
    dataPengukuranAsli: [],
    dataBaseline1: [],
    dataBaseline2: [],
    dataPuncak1: [],
    dataPuncak2: [],
    puncak1: 0,
    puncak2: 0
  });

  const [isCV, setIsCV] = useState<Boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
          await NivoChartAPI(filePath1).then((result: any) => {
            console.log(result)
            let graphData: GraphData = {
              dataPengukuranAsli: result[0],
              dataBaseline1: result[1],
              dataBaseline2: result[2],
              dataPuncak1: result[3],
              dataPuncak2: result[4],
              puncak1: parseFloat((result[3][0].y - result[3][1].y).toFixed(2)),
              puncak2: result[4].length > 0 ? parseFloat((result[4][0].y - result[4][1].y).toFixed(2)) : 0
            }
            setIsCV(result[5]);
            setDataGraph1(graphData);
          });
          if (filePath2 !== "") {
            await NivoChartAPI(filePath2).then((result: any) => {
              let graphData: GraphData = {
                dataPengukuranAsli: result[0],
                dataBaseline1: result[1],
                dataBaseline2: result[2],
                dataPuncak1: result[3],
                dataPuncak2: result[4],
                puncak1: parseFloat((result[3][0].y - result[3][1].y).toFixed(2)),
                puncak2: result[4].length > 0 ? parseFloat((result[4][0].y - result[4][1].y).toFixed(2)) : 0
              }
              setDataGraph2(graphData);
            });
          }
        } 
    
        fetchData();
      }, []);
    let data_graph = [
        {
          "id": "sebelum correction",
          "color": "hsl(187, 70%, 50%)",
          "data": dataGraph1?.dataPengukuranAsli
        },
        {
          "id": isCV ? "setelah correction oksidasi" : "setelah correction" ,
          "color": "hsl(187, 70%, 50%)",
          "data": dataGraph1?.dataBaseline1
        }
      ]
    
    if (isCV) {
      data_graph.push({
        "id": "setelah correction reduksi",
        "color": "hsl(187, 70%, 50%)",
        "data": dataGraph1?.dataBaseline2
      })
      data_graph.push({
        "id": "puncak oxidation (" + (dataGraph1?.puncak1).toString() + ")",
        "color": "hsl(187, 70%, 50%)",
        "data": dataGraph1?.dataPuncak1
      })
      data_graph.push({
        "id": "puncak reduction (" + (dataGraph1?.puncak2).toString() + ")",
        "color": "hsl(187, 70%, 50%)",
        "data": dataGraph1?.dataPuncak2,
        
      })
    } else {
      data_graph.push({
        "id": "puncak (" + (dataGraph1?.puncak1).toString() + ")",
        "color": "hsl(47, 70%, 50%)",
        "data": dataGraph1?.dataPuncak1
      })
      data_graph.push({
        "id": "sebelum correction 2",
        "color": "hsl(47, 70%, 50%)",
        "data": dataGraph2?.dataPengukuranAsli
      })
      data_graph.push({
        "id": "setelah correction 2",
        "color": "hsl(47, 70%, 50%)",
        "data": dataGraph2?.dataBaseline1
      })
      data_graph.push({
        "id": "puncak (" + (dataGraph2?.puncak1).toString() + ")",
        "color": "hsl(187, 70%, 50%)",
        "data": dataGraph2?.dataPuncak1
      })
    }
    return(
          <ResponsiveLine
            
            data={data_graph}
            margin={{ top: 50, right: 100, bottom: 50, left: 60 }}
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
                translateX: -100,
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
    )
}

export default GraphNivo;
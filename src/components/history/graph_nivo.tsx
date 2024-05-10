import { ResponsiveLine } from '@nivo/line'
import React, { useState, useEffect } from 'react';
import { NivoChartAPI } from '../../api/nivoChart';


interface GraphProps {
    filePath: string;
  }
  

const GraphNivo: React.FC<GraphProps> = ({filePath}) => {
  const [dataPengukuranAsli, setDataPengukuranAsli] = useState<number[][]>([]);
  const [dataBaseline1, setDataBaseline1] = useState<number[][]>([]);
  const [dataBaseline2, setDataBaseline2] = useState<number[][]>([]);
  const [dataPuncak1, setDataPuncak1] = useState<number[][]>([]);
  const [dataPuncak2, setDataPuncak2] = useState<number[][]>([]);
  const [isCV, setIsCV] = useState<Boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
          await NivoChartAPI(filePath).then((result: any) => {
            setDataPengukuranAsli(result[0]);
            setDataBaseline1(result[1]);
            setDataBaseline2(result[2]);
            setDataPuncak1(result[3]);
            setDataPuncak2(result[4]);
            setIsCV(result[5]);
          });
        } 
    
        fetchData();
      }, []);
    let data_graph = [
        {
          "id": "sebelum correction",
          "color": "hsl(47, 70%, 50%)",
          "data": dataPengukuranAsli
        },
        {
          "id": isCV ? "setelah correction oksidasi" : "setelah correction" ,
          "color": "hsl(187, 70%, 50%)",
          "data": dataBaseline1
        }
      ]
    
    if (isCV) {
      data_graph.push({
        "id": "setelah correction reduksi",
        "color": "hsl(187, 70%, 50%)",
        "data": dataBaseline2
      })
      data_graph.push({
        "id": "puncak oxidation",
        "color": "hsl(187, 70%, 50%)",
        "data": dataPuncak1
      })
      data_graph.push({
        "id": "puncak reduction",
        "color": "hsl(187, 70%, 50%)",
        "data": dataPuncak2
      })
    } else {
      data_graph.push({
        "id": "puncak DPV",
        "color": "hsl(187, 70%, 50%)",
        "data": dataPuncak1
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
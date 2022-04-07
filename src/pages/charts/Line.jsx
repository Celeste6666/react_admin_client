import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { DualAxes } from '@ant-design/plots';

const Line = () => {
  const [data, updateDate] = useState([
    {
      name: '襯衫',
      sold: 10,
      left: 40,
    },
    {
      name: '羊毛衫',
      sold: 60,
      left: 70,
    },
    {
      name: '雪紡衫',
      sold: 37,
      left: 90,
    },
    {
      name: '鞋子',
      sold: 30,
      left: 142,
    },
    {
      name: '高跟鞋',
      sold: 16,
      left: 110,
    },
    {
      name: '襪子',
      sold: 30,
      left: 35,
    },
    {
      name: '牛仔褲',
      sold: 80,
      left: 75,
    },
  ]);
  const config = {
    data: [data, data],
    xField: 'name',
    yField: ['sold', 'left'],
    meta: {
      sold: {
        min: 0
      },
      left: {
        min: 0
      }
    },
    geometryOptions: [
      {
        geometry: 'line',
        color: '#5B8FF9',
      },
      {
        geometry: 'line',
        color: '#5AD8A6',
      },
    ],
    legend: {
      layout: 'horizontal',
      position: 'top'
    },    
  };

  const updateLine = () => {
    const newData = data.reduce((pre, cur) => {
      cur.sold++;
      cur.left--;
      return [...pre, cur]
    }, []);
    updateDate(newData);
  }

  return (
    <Card title={<Button  type="primary" onClick={updateLine}>更新</Button>}>
    <Card name="inner" title="柱狀圖一">
      <DualAxes {...config} />
    </Card>
  </Card>
  );
}

export default Line;

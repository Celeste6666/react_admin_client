import React,{ useState } from 'react';
import { Card, Button } from 'antd';
import { Column } from '@ant-design/plots';

const Bar = () => {
  const [data, updateDate] = useState([
    {
      name: '庫存',
      type: '襯衫',
      num: 30,
    },
    {
      name: '銷量',
      type: '襯衫',
      num: 20,
    },
    {
      name: '庫存',
      type: '羊毛衫',
      num: 30,
    },
    {
      name: '銷量',
      type: '羊毛衫',
      num: 20,
    },
    {
      name: '庫存',
      type: '雪紡衫',
      num: 60,
    },
    {
      name: '銷量',
      type: '雪紡衫',
      num: 40,
    },
    {
      name: '庫存',
      type: '鞋子',
      num: 44,
    },
    {
      name: '銷量',
      type: '鞋子',
      num: 25,
    },
    {
      name: '庫存',
      type: '高跟鞋',
      num: 64,
    },
    {
      name: '銷量',
      type: '高跟鞋',
      num: 85,
    },
    {
      name: '庫存',
      type: '襪子',
      num: 44,
    },
    {
      name: '銷量',
      type: '襪子',
      num: 35,
    },
    {
      name: '庫存',
      type: '牛仔褲',
      num: 104,
    },
    {
      name: '銷量',
      type: '牛仔褲',
      num: 25,
    },
  ]);
  const config = {
    data,
    isGroup: true,
    xField: 'type',
    yField: 'num',
    seriesField: 'name',
    legend: {
      layout: 'horizontal',
      position: 'top'
    },

    /** 设置颜色 */
    color: ['#1ca9e6', '#f88c24'],

    /** 设置间距 */
    // marginRatio: 0.1,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
  };

  const updateBar = () => {
    const newData = data.reduce((pre, cur) => {
      if(cur.name === '庫存') {
        cur.num--
      }
      if(cur.name === '銷量') {
        cur.num++
      }
      return [...pre, cur]
    }, []);
    updateDate(newData);
  }

  return (
    <Card title={<Button type="primary" onClick={updateBar}>更新</Button>}>
      <Card type="inner" title="柱狀圖一">
        <Column {...config} />
      </Card>
    </Card>
  );
}

export default Bar;

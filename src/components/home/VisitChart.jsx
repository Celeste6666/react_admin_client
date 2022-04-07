import React from 'react';
import { Card } from 'antd';

import { Column } from '@ant-design/plots';

const VisitChart = () => {
  const data = [
    {
      type: 'Jan',
      sales: 38,
    },
    {
      type: 'Feb',
      sales: 52,
    },
    {
      type: 'Mar',
      sales: 61,
    },
    {
      type: 'Apr',
      sales: 145,
    },
    {
      type: 'May',
      sales: 48,
    },
    {
      type: 'Jun',
      sales: 53,
    },
    {
      type: 'Jul',
      sales: 38,
    },
    {
      type: 'Aug',
      sales: 87,
    },
    {
      type: 'Sep',
      sales: 43,
    },
    {
      type: 'Oct',
      sales: 67,
    },
    {
      type: 'Nov',
      sales: 54,
    },
    {
      type: 'Dec',
      sales: 67,
    },
  ];
  const config = {
    data,
    height: 200,
    xField: 'type',
    yField: 'sales',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };
  return (
    <Card title="訪問趨勢">
      <Column {...config} />
    </Card>
  )
}

export default VisitChart
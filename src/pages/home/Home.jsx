import React from 'react';
import { Card, Row, Col, Statistic, Timeline, DatePicker } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Line } from '@ant-design/plots';
import locale from 'antd/es/date-picker/locale/zh_TW';
import VisitChart from '@/components/home/VisitChart';

const { Item } = Timeline;
const { RangePicker } = DatePicker;

export default function Home() {

  const data = [
    {
      time: 'Jan',
      value: 123,
      type: 'a',
    },
    {
      time: 'Feb',
      value: 900,
      type: 'a',
    },
    {
      time: 'Mar',
      value: 300,
      type: 'a',
    },
    {
      time: 'Apr',
      value: 450,
      type: 'a',
    },
    {
      time: 'May',
      value: 470,
      type: 'a',
    },
    {
      time: 'Jun',
      value: 220,
      type: 'a',
    },
    {
      time: 'Jul',
      value: 300,
      type: 'a',
    },
    {
      time: 'Aug',
      value: 250,
      type: 'a',
    },
    {
      time: 'Sep',
      value: 220,
      type: 'a',
    },
    {
      time: 'Oct',
      value: 362,
      type: 'a',
    },
    {
      time: 'Jan',
      value: 432,
      type: 'b',
    },
    {
      time: 'Feb',
      value: 654,
      type: 'b',
    },
    {
      time: 'Mar',
      value: 234,
      type: 'b',
    },
    {
      time: 'Apr',
      value: 454,
      type: 'b',
    },
    {
      time: 'May',
      value: 235,
      type: 'b',
    },
    {
      time: 'Jun',
      value: 896,
      type: 'b',
    },
    {
      time: 'Jul',
      value: 234,
      type: 'b',
    },
    {
      time: 'Aug',
      value: 453,
      type: 'b',
    },
    {
      time: 'Sep',
      value: 564,
      type: 'b',
    },
    {
      time: 'Oct',
      value: 134,
      type: 'b',
    },    
    {
      time: 'Jan',
      value: 345,
      type: 'c',
    },
    {
      time: 'Feb',
      value: 450,
      type: 'c',
    },
    {
      time: 'Mar',
      value: 330,
      type: 'c',
    },
    {
      time: 'Apr',
      value: 564,
      type: 'c',
    },
    {
      time: 'May',
      value: 432,
      type: 'c',
    },
    {
      time: 'Jun',
      value: 213,
      type: 'c',
    },
    {
      time: 'Jul',
      value: 754,
      type: 'c',
    },
    {
      time: 'Aug',
      value: 342,
      type: 'c',
    },
    {
      time: 'Sep',
      value: 563,
      type: 'c',
    },
    {
      time: 'Oct',
      value: 523,
      type: 'c',
    },
  ];

  const config = {
    data,
    xField: 'time',
    yField: 'value',
    seriesField: 'type',
    smooth: true,
    height: 200,
    legend: {
      layout: 'horizontal',
      position: 'bottom',
      itemHeight: 25
    }
  };

  const tabListNoTitle = [
    {
      key: 'tab1',
      tab: '?????????',
    },
    {
      key: 'tab2',
      tab: '?????????',
    }
  ]

  const contentList = {
    tab1: <VisitChart />,
    tab2: <p>content2</p>,
  };

  return (
    <Card>
      <Row gutter={32}>
        <Col span={6}>
          <Card title="????????????">
            <Statistic
              value={1234657}
              valueStyle={{ fontWeight: 'bold', fontSize: '28px'  }}
              suffix={<ArrowUpOutlined />}
              />
            <Statistic
              prefix="?????????"
              value={15}
              precision={2}
              valueStyle={{ color: 'red',  fontSize: '14px'  }}
              suffix={<div>
                % &nbsp;
                <ArrowUpOutlined />
              </div>}
            />
            <Statistic
              prefix="?????????"
              value={10}
              precision={2}
              valueStyle={{ color: '#3f8600',  fontSize: '14px'  }}
              suffix={<div>
                % &nbsp;
                <ArrowDownOutlined />
              </div>}
            />
          </Card>
        </Col>
        <Col span={18}>
          <Line {...config} />
        </Col>
      </Row>
      <Card
        style={{ width: '100%', marginTop: '50px' }}
        tabList={tabListNoTitle}
        activeTabKey={'tab1'}
        tabBarExtraContent={<RangePicker locale={locale}  />}
      >
        <Row gutter={32}>
          <Col span={16}>
            {contentList['tab1']}
          </Col>
          <Col span={8}>
            <Card title="??????">
              <Timeline>
              <Item color="green">?????????</Item>
              <Item color="green">????????????????????????</Item>
              <Item color="red">
                <p>API ????????????</p>
                <p>????????????</p>
              </Item>
              <Item>
                <p>??????????????????</p>
                <p>????????????</p>
                <p>????????????</p>
              </Item>
            </Timeline>
            </Card>
          </Col>
        </Row>
      </Card>
    </Card>
  )
}

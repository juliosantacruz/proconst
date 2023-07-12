import React from 'react';
import { Tabs } from 'antd';

const onChange = (key: string) => {
  console.log(key);
};

const InsumosTabs=[
    {
        label: `Tab 1`,
        key: '1',
        children: `Content of Tab Pane`,
      },
      {
        label: `Tab 2`,
        key: '2',
        children: `Content of Tab Pane`,
      },
      {
        label: `Tab 3`,
        key: '3',
        children: `Content of Tab Pane 3`,
      },
]

const TabSections: React.FC = () => (
  <Tabs
    onChange={onChange}
    type="card"
    items={InsumosTabs}
  />
);

export default TabSections;
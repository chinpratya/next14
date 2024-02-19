import { Meta, Story } from '@storybook/react';

import { PieChart } from './piechart';

const meta: Meta = {
  title: 'Chart/PieChart',
};

export default meta;

const dataPie = [
  {
    id: 'Microsoft',
    label:
      'Microsoft Windows Defender - Real-time protection was disabled',
    value: 9,
    color: '#B97777',
  },
  {
    id: 'created',
    label: 'New admin user was created',
    value: 20,
    color: '#594CAB',
  },
  {
    id: 'CheckPoint',
    label:
      'Check Point - Failed login attempt via SmartConsole',
    value: 11,
    color: '#A168A6',
  },
  {
    id: 'Port scanning',
    label: 'Port scanning activity was detected',
    value: 36,
    color: '#64AD06',
  },
];

const Template: Story = (props) => (
  <div style={{ width: '100%', height: '500px' }}>
    <PieChart
      data={dataPie}
      innerRadius={0}
      padAngle={0.5}
      cornerRadius={0}
      enableArcLinkLabels={false}
      {...props}
    />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  data: dataPie,
  innerRadius: 0,
  padAngle: 0.5,
  cornerRadius: 0,
  enableArcLinkLabels: false,
};

export const Withlegends = Template.bind({});

Withlegends.args = {
  data: dataPie,
  innerRadius: 0,
  padAngle: 0.5,
  cornerRadius: 0,
  enableArcLinkLabels: false,
  showlegends: true,
};

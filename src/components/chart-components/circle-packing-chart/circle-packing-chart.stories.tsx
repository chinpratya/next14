import { Meta, Story } from '@storybook/react';

import { CirclePacking } from './CirclePackingChart';

const meta: Meta = {
  title: 'Chart/CirclePackingChart',
};

export default meta;

const CirclePackingChart = {
  name: 'Device Type',
  color: 'white',
  children: [
    {
      name: 'Linux',
      label: 'Linux',
      value: 7,
      color: '#3E79F7',
      icon: `Linux`,
    },
    {
      name: 'Windows',
      label: 'Windows',
      value: 28,
      color: '#04D182',
      icon: 'Windows',
    },
    {
      name: 'MAC OS',
      label: 'MAC OS',
      value: 3,
      color: '#FFC542',
      icon: 'MAC OS',
    },
  ],
};

const Template: Story = (props) => (
  <div style={{ width: '100%', height: '100vh' }}>
    <CirclePacking
      data={CirclePackingChart}
      showlegends={false}
      //   keys={['hot dog', 'burger', 'sandwich', 'kebab']}
      //   indexBy="indexkey"
      {...props}
    />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  data: CirclePackingChart,
  showlegends: false,
};

export const Withlegends = Template.bind({});

Withlegends.args = {
  data: CirclePackingChart,
  showlegends: true,
};

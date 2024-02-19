import { BarDatum } from '@nivo/bar/dist/types';
import { Meta, Story } from '@storybook/react';

import { BarChart } from './barchart';

const meta: Meta = {
  title: 'Chart/BarChart',
};

export default meta;

const dataBar: BarDatum[] = [
  {
    indexkey: 'Brute-Force',
    'hot dog': 15,
  },
  {
    indexkey: 'Exploited Host',
    burger: 20,
  },
  {
    indexkey: 'DDoS Attack',
    sandwich: 25,
  },
  {
    indexkey: ' Phishing',
    kebab: 35,
  },
];

const Template: Story = (props) => (
  <div style={{ width: '100%', height: '100vh' }}>
    <BarChart
      data={dataBar}
      keys={['hot dog', 'burger', 'sandwich', 'kebab']}
      indexBy="indexkey"
      {...props}
    />
  </div>
);

export const Default = Template.bind({});

Default.args = {
  data: dataBar,
  keys: ['hot dog', 'burger', 'sandwich', 'kebab'],
  indexBy: 'indexkey',
};

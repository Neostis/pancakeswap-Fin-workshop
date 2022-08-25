import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 2000,
    pv: 1098,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 3000,
    pv: 1800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 3890,
    pv: 4000,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 5390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 6490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1098,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 3000,
    pv: 1800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 5780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 4890,
    pv: 4000,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 5390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page A',
    uv: 6000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1098,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 7000,
    pv: 1800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 1908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4000,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 3390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 2490,
    pv: 4300,
    amt: 2100,
  },
];
const data1 = [
  {
    name: 'Page A',
    uv: 3000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 5000,
    pv: 1098,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 3000,
    pv: 1800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 4390,
    pv: 4000,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 6490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 5000,
    pv: 1098,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 1800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 5780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 4890,
    pv: 4000,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 5390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Page A',
    uv: 2000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1098,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 5000,
    pv: 1800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 4780,
    pv: 1908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 4890,
    pv: 4000,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 3390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 6490,
    pv: 4300,
    amt: 2100,
  },
];

// export default class areaChart extends PureComponent {
export const Areachart = (state: boolean) => {
  // }
  // static demoUrl = 'https://codesandbox.io/s/simple-area-chart-4ujxw';
  if (state) {
    return (
      <div className="bg-test rounded-lg shrink hover:shrink-0">
        <ResponsiveContainer width={1200} height={500}>
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4D80CC" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4D80CC" stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* <Cell
                             key={`cell-${index}`}
                             fill={COLORS[index % COLORS.length]}
                            /> */}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#000000" />
            {/* <YAxis stroke="#000000" /> */}
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#101E59" fill="url(#colorUv)" strokeWidth={5} fillOpacity={1} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  } else {
    return (
      <div className="bg-test rounded-lg shrink hover:shrink-0">
        <ResponsiveContainer width={1200} height={500}>
          <AreaChart
            width={500}
            height={400}
            data={data1}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4D80CC" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4D80CC" stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* <Cell
                             key={`cell-${index}`}
                             fill={COLORS[index % COLORS.length]}
                            /> */}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#000000" />
            {/* <YAxis stroke="#000000" /> */}
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#101E59" fill="url(#colorUv)" strokeWidth={5} fillOpacity={1} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
};
// };
// export default Areachart;

import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Aug 01',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Aug 10',
    uv: 3500,
    pv: 1098,
    amt: 2210,
  },

  {
    name: 'Aug 20',
    uv: 2800,
    pv: 1800,
    amt: 2290,
  },

  {
    name: 'Aug 30',
    uv: 7000,
    pv: 1800,
    amt: 2290,
  },
  {
    name: 'Aug 40',
    uv: 3780,
    pv: 1908,
    amt: 2000,
  },
  {
    name: 'Aug 50',
    uv: 2890,
    pv: 4000,
    amt: 2181,
  },
  {
    name: 'Aug 60',
    uv: 4390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Aug 70',
    uv: 2490,
    pv: 4300,
    amt: 2100,
  },
];
const data1 = [
  {
    name: 'Aug 01',
    uv: 3700,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Aug 10',
    uv: 4400,
    pv: 1098,
    amt: 2210,
  },
  {
    name: 'Aug 20',
    uv: 3000,
    pv: 1800,
    amt: 2290,
  },
  {
    name: 'Aug 30',
    uv: 4780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Aug 40',
    uv: 4390,
    pv: 4000,
    amt: 2181,
  },
  {
    name: 'Aug 50',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Aug 60',
    uv: 6490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'Aug 70',
    uv: 4000,
    pv: 2400,
    amt: 2400,
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

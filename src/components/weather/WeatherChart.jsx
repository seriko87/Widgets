import React from 'react';
import './weatherChart.css';
import { Area, XAxis, Tooltip, AreaChart } from 'recharts';

const WeatherChart = ({ data, metric }) => {
  let timeW = data.map((item, index) => {
    let times = [
      '12am',
      '1am',
      '2am',
      '3am',
      '4am',
      '5am',
      '6am',
      '7am',
      '8am',
      '9am',
      '10am',
      '11am',
      '12pm',
      '1pm',
      '2pm',
      '3pm',
      '4pm',
      '5pm',
      '6pm',
      '7pm',
      '8pm',
      '9pm',
      '10pm',
      '11pm',
    ];
    return {
      '°C': item.temp_c,
      '°F': item.temp_f,
      time: times[index],
    };
  });

  //   function Time(epoch) {
  //     //   converting epoch time to local time
  //     let d = new Date(0); // The 0 there is the key, which sets the date to the epoch

  //     d.setUTCSeconds(epoch);
  //     return d.toLocaleString('en-US', { hour: 'numeric', hour12: true });
  //   }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="tooltipCharts">
          {payload[0].value} {payload[0].name}
        </div>
      );
    }
    return null;
  };

  return (
    <AreaChart
      width={400}
      height={165}
      data={timeW}
      margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
    >
      {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
      <XAxis
        dataKey="time"
        stroke="rgb(217, 217, 217)"
        fontSize="14px"
        axisLine={false}
        tickLine={false}
        // tickFormatter={(item) => {
        //   let d = item.split(' ');
        //   var timeType;
        //   if (d[1] === 'AM') {
        //     timeType = 'am';
        //   }
        //   if (d[1] === 'PM') {
        //     timeType = 'pm';
        //   }
        //   return d[0] + timeType;
        // }}
      />

      <Tooltip content={<CustomTooltip />} />

      <Area
        type="monotone"
        dataKey={metric ? '°C' : '°F'}
        stroke="#8884d8"
        fill="rgba(40, 97, 172, 0.842)"
      />
    </AreaChart>
  );
};

export default WeatherChart;

import React from 'react';
import './covidChart.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const CovidChart = ({ covidData, item }) => {
  const data = covidData.sort((a, b) => b[item.dataKey] - a[item.dataKey]);

  let newData = covidData
    ? data.slice(0, 10).map((e) => {
        return {
          country: e.country,
          number: e[item.dataKey],
          iso3: e.countryInfo.iso3,
        };
      })
    : '';

  // formatting the Y axis of chart
  function kFormatter(num) {
    if (num >= 1000000) {
      return (Math.abs(num) / 1000000).toFixed(1) + 'm';
    }
    return (Math.abs(num) / 1000).toFixed(1) + 'k';
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active) {
      return (
        <div className="covidTooltip">
          <span>{payload[0].payload.country}</span>
          <p>
            {item.dataKey} :{' '}
            {payload[0].payload.number.toLocaleString(undefined)}
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="totalChartData">
      <BarChart
        width={700}
        height={400}
        data={newData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="iso3" />
        <YAxis
          tickFormatter={(e) => {
            return kFormatter(e);
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="number" fill={item.color} />
      </BarChart>
    </div>
  );
};

export default CovidChart;

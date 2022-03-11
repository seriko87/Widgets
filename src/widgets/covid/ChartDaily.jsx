import './chartDaily.css';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { numberFormatter } from '../../functions/functions';

const ChartDaily = ({ dData, activeTab }) => {
  let newData = dData && dData.slice(-1);

  let date = dData && Object.keys(newData[0].timeline.cases);
  let sCases = dData && Object.values(newData[0].timeline.cases);
  let dDeaths = dData && Object.values(newData[0].timeline.deaths);

  let casess = [];

  if (dData) {
    for (let index = 0; index < date.length; index++) {
      let d = date[index].split('/');
      casess.push({
        d_date: d[0] + '/' + d[1],
        c_cases: sCases[index] - sCases[index - 1],
        d_deaths: dDeaths[index] - dDeaths[index - 1],
        dates: date[index],
      });
    }
    casess.shift();
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active) {
      return (
        <div className="covidTooltip">
          <span>{dData && payload[0].payload.dates}</span>
          <p>
            {dData && payload[0].name === 'c_cases' ? 'Cases' : 'Deaths'}:{' '}
            {dData && payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="dailyChart">
      <div
        className={activeTab === 'cases' ? 'chartTab activeChart' : 'chartTab'}
      >
        <LineChart
          width={700}
          height={400}
          data={casess}
          margin={{
            top: 5,
            right: 5,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="d_date" />
          <YAxis
            tickFormatter={(e) => {
              return numberFormatter(e);
            }}
          />
          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="c_cases"
            stroke="#8884d8"
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </div>
      <div
        className={activeTab === 'deaths' ? 'chartTab activeChart' : 'chartTab'}
      >
        <LineChart
          width={700}
          height={400}
          data={casess}
          margin={{
            top: 5,
            right: 5,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="d_date" />
          <YAxis
            tickFormatter={(e) => {
              return numberFormatter(e);
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="d_deaths"
            stroke="#82ca9d"
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default ChartDaily;

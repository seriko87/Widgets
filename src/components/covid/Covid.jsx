import { useEffect, useState } from 'react';
import axios from 'axios';
import CovidChart from './CovidChart';
import './covid.css';
import { countries } from './countries';
import ChartDaily from './ChartDaily';

import Draggable from 'react-draggable';

const Covid = () => {
  const [covidData, setCovidData] = useState();
  const [dailyData, setDailyData] = useState();
  const [activeTab, setActiveTab] = useState('cases');
  const [selCountry, setSelCountry] = useState();
  const [isActiveChart, setIsActiveChart] = useState(false);

  const url1 = 'https://disease.sh/v3/covid-19/countries';
  const url2 = 'https://disease.sh/v3/covid-19/historical?lastdays=30';

  const getData = async (url, a) => {
    try {
      const res = await axios.get(url);
      if (a === 'covid') {
        setCovidData(res.data);
      } else {
        setDailyData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(url1, 'covid');
    getData(url2, 'daily');
  }, []);

  const charData = [
    { name: 'Cases', dataKey: 'cases', color: '#8884d8' },
    { name: 'Death', dataKey: 'deaths', color: '#82ca9d' },
    { name: 'Active', dataKey: 'active', color: '#00bfff' },
  ];
  const dailData = [
    { name: 'Cases', dataKey: 'cases', color: '#8884d8' },
    { name: 'Death', dataKey: 'deaths', color: '#82ca9d' },
  ];

  const handleClick = (e) => {
    if (e === 'cases') {
      setActiveTab('cases');
    }
    if (e === 'deaths') {
      setActiveTab('deaths');
    }
    if (e === 'active') {
      setActiveTab('active');
    }
  };

  useEffect(() => {
    const country =
      dailyData &&
      dailyData.filter((item) => {
        return item.country === 'USA';
      });

    setSelCountry(country);
  }, [dailyData]);

  const handleSelect = (e) => {
    const newD = dailyData.filter((item) => {
      return item.country === e;
    });

    setSelCountry(newD);
  };

  return (
    <Draggable handle="strong">
      <div className="chartWrapper box no-cursor">
        <strong className="cursor">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="20px"
          >
            <path d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v5a7 7 0 11-14 0V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z" />
          </svg>
        </strong>
        <button
          onClick={() => setIsActiveChart(!isActiveChart)}
          className={
            !isActiveChart ? 'chartTotalsBtn activeTBtn' : 'chartTotalsBtn'
          }
        >
          Totals
        </button>
        <button
          onClick={() => {
            setIsActiveChart(!isActiveChart);
            handleClick('cases');
          }}
          className={
            isActiveChart ? 'chartDailyBtn activeTBtn' : 'chartDailyBtn'
          }
        >
          Daily
        </button>
        {isActiveChart ? (
          <div className="chartTotal">
            <h2 className="chartTitle">
              Daily Covid-19 Cases - {selCountry[0]?.country}
            </h2>
            <div className="selCountry">
              <label htmlFor="country">Countries: </label>
              <select
                name="country"
                onChange={(e) => handleSelect(e.target.value)}
                defaultValue="USA"
              >
                {countries.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            {dailyData &&
              dailData.map((item, index) => {
                return (
                  <button
                    onClick={() => handleClick(item.dataKey)}
                    className={
                      activeTab === item.dataKey
                        ? `${item.dataKey}Btn activeTotalBtn`
                        : `${item.dataKey}Btn`
                    }
                    key={index}
                  >
                    {item.name}
                  </button>
                );
              })}

            <ChartDaily dData={selCountry} activeTab={activeTab} />
          </div>
        ) : (
          <div className="chartTotal">
            <h2 className="chartTitle">
              Total Covid-19 Cases (top 10 countries)
            </h2>
            {covidData &&
              charData.map((item, index) => {
                return (
                  <div key={item.dataKey}>
                    <button
                      onClick={() => handleClick(item.dataKey)}
                      className={
                        activeTab === item.dataKey
                          ? `${item.dataKey}Btn activeTotalBtn`
                          : `${item.dataKey}Btn`
                      }
                    >
                      {' '}
                      {item.name}
                    </button>
                    <div
                      className={
                        activeTab === item.dataKey
                          ? 'chartTab activeChart'
                          : 'chartTab'
                      }
                    >
                      <CovidChart covidData={covidData} item={item} />
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default Covid;

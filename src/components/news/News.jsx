import { useState, useEffect } from 'react';
import axios from 'axios';
import './news.css';
import CloseWidget from '../closeWidget/CloseWidget';
import EachNews from './EachNews';
import { newsCategory } from './newsCategory';
import Loading from '../loading/Loading';
import Draggable from 'react-draggable';
const News = () => {
  const [news, setNews] = useState();
  const [category, setCategory] = useState(newsCategory[0]);

  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.REACT_APP_RAPID_API;

  const config_data = {
    method: 'GET',
    url: 'https://bing-news-search1.p.rapidapi.com/news',
    params: {
      textFormat: 'Raw',
      safeSearch: 'Off',
      mkt: 'en-US',
      originalImg: 'true',
      category: category.category,
    },
    headers: {
      'x-bingapis-sdk': 'true',
      'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
      'x-rapidapi-key': API_KEY,
    },
  };

  const getNews = async () => {
    try {
      const res = await axios(config_data);

      setNews(res.data.value);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNews();
  }, [category]);

  const handleClick = (cate) => {
    setLoading(true);
    setCategory(cate);
  };

  return (
    <Draggable handle="strong">
      <div className="newsWrapper box no-cursor">
        <strong className="cursor" style={{ width: 100 + '%' }}></strong>
        <CloseWidget id="news" />
        <h1>News: {category.name}</h1>
        <div className="newsCategory">
          {newsCategory.map((item) => {
            return (
              <button
                className="catButton"
                key={item.name}
                onClick={() => handleClick(item)}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        <div className="newsScroll">
          {loading ? (
            <Loading width={'50px'} height={'50px'} />
          ) : (
            <div className="newsWrap">
              {news &&
                news.map((item, index) => {
                  return <EachNews newss={item} key={index} />;
                })}
            </div>
          )}
        </div>
      </div>
    </Draggable>
  );
};

export default News;

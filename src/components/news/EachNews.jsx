import React from 'react';
import './eachNews.css';

const EachNews = ({ newss }) => {
  const item = newss;
  const pubDate = new Date(item.datePublished);
  const curDate = new Date();
  const newsHour = Math.floor((curDate - pubDate) / (1000 * 60 * 60));
  const desc = item.description;
  const imgUrl = item.image
    ? item.image.thumbnail.contentUrl.split('&')[0]
    : item.provider[0].image.thumbnail.contentUrl.split('&')[0];
  const newsUrl = item.url;
  const topic = item.name;
  const orgName = item.provider[0].name;
  const orgImg = item.provider[0].image
    ? item.provider[0].image.thumbnail.contentUrl.split('&')[0]
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqpiB0j7pMqj4PVYxRcv0_R8LGYuuBUwVHR4m41XDqXR3CPk2EOeXs_IYN5SBAXAmR7dg&usqp=CAU';

  //   const opt = pubDate.toLocaleString([], {
  //     hour: 'numeric',
  //     hour12: false,
  //     minute: 'numeric',
  //     weekday: 'long',
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric',
  //   });

  return (
    <div className="indiNews">
      <img src={imgUrl} alt={topic} />
      <div className="newsContent">
        <a href={newsUrl} target={'_blank'} rel="noreferrer">
          {' '}
          {topic}
        </a>

        <p className="newsDesc">{desc}</p>
        <span className="orgName">
          <img src={orgImg} alt={orgName} />
          {orgName} - {newsHour < 24 ? newsHour + 'h' : newsHour - 24 + 'd'}
        </span>
      </div>
    </div>
  );
};

export default EachNews;

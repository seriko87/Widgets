import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ImgWidget = () => {
  const [imgUrl, setImgUrl] = useState();
  const url =
    'https://api.unsplash.com/photos/?client_id=k8VpBIuFTS7pRJKa1bxgmuSERkeUOuuMs2tuaGOZDZQ';

  const getImg = async () => {
    try {
      const res = axios.get(url);
      setImgUrl(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImg();
  }, []);

  console.log(imgUrl);
  return <div>{/* <img src={imgUrl} alt="" /> */}</div>;
};

export default ImgWidget;

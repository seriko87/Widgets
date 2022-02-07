import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import CloseWidget from '../../components/closeWidget/CloseWidget';
import './imgWidget.css';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import Loading from '../../components/loading/Loading';
import DownloadIcon from '@mui/icons-material/Download';
const cat = [
  'Nature',
  'Tigers',
  'Ocean',
  'Dogs',
  'Cats',
  'Fantasy',
  'Abstract',
  'Natural',
  'Adult',
  'Landscape',
  'Dark',
  'Crypto',
  'Money',
  'Trading',
  'Business',
  'Dance',
  'Roses',
  'Forest',
  'Sky',
  'Alone',
  'Motivational Quotes',
];

const ImgWidget = () => {
  const [imgUrl, setImgUrl] = useState({ id: 0, img: '' });
  const [imgList, setImgList] = useState();
  const [refresh, setRefresh] = useState(false);
  const [category, setCategory] = useState(cat[0]);
  const [loading, setLoading] = useState(true);
  const SITE_KEY = process.env.REACT_APP_PEXELS_KEY;

  const getImg = async (cat) => {
    let options = {
      method: 'GET',
      url: `https://api.pexels.com/v1/search?`,
      params: {
        query: cat,
        page: 1,
        per_page: 80,
        orientation: 'squarish',
      },
      headers: { Authorization: SITE_KEY },
    };

    setLoading(true);
    try {
      const res = await axios(options);
      setImgUrl({ id: 0, img: res.data.photos[0] });
      setImgList(res.data.photos);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImg(category);
  }, []);

  const handleNext = (page) => {
    if (page === 39) {
      setImgUrl({ id: 0, img: imgList[0] });
    } else {
      setImgUrl({ id: page + 1, img: imgList[page + 1] });
    }
  };

  const handlePrev = (page) => {
    if (page === 0) {
      setImgUrl({ id: 39, img: imgList[39] });
    } else {
      setImgUrl({ id: page - 1, img: imgList[page - 1] });
    }
  };

  //   const handleRefresh = () => {
  //     setRefresh(true);
  //     setTimeout(() => {
  //       setRefresh(false);
  //     }, 60000);
  //     // getImg();
  //   };

  const handleCategory = (e) => {
    setCategory(e.target.value);
    getImg(e.target.value);
  };

  return (
    <Draggable handle="strong">
      <div className="imgWidgetCont box no-cursor">
        <strong className="cursor" style={{ width: 90 + '%' }}></strong>
        <CloseWidget id="imgWidget" />
        <div className="imgWidCategory">
          <label htmlFor="category">Category : </label>
          <select
            name="category"
            id="imgWidgetCatSel"
            onChange={handleCategory}
          >
            {cat.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </div>
        {loading ? (
          <div className="imgLoading">
            <Loading width={'50px'} height={'50px'} />
          </div>
        ) : (
          <>
            {imgList && (
              <div className="imgWidgetWrap">
                <div className="imgPexelsInfo">
                  <a
                    href={imgUrl.img.url}
                    className="imgPexelsUser"
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    by {imgUrl.img.photographer}
                  </a>

                  <a
                    href={imgUrl.img.src.original}
                    download="nature"
                    className="imgWidgetDown"
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    <DownloadIcon fontSize="small" />
                  </a>
                </div>
                <a href="https://www.pexels.com" className="imgPexelsLink">
                  photos provided by Pexels
                </a>
                <img src={imgUrl.img.src.medium} alt={imgUrl.img.alt} />
              </div>
            )}
          </>
        )}

        <button className="imgNextBtn" onClick={() => handleNext(imgUrl.id)}>
          <ArrowForwardIosOutlinedIcon fontSize="large" />
        </button>
        <button className="imgPrevBtn" onClick={() => handlePrev(imgUrl.id)}>
          <ArrowBackIosNewOutlinedIcon fontSize="large" />
        </button>

        {/* <div className="imgWidgetControls">
          <button
            className="imgRefBtn"
            onClick={() => handleRefresh()}
            disabled={refresh}
          >
            Refresh
          </button>
        </div> */}
      </div>
    </Draggable>
  );
};

export default ImgWidget;

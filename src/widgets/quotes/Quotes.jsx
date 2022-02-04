import React, { useEffect, useState } from 'react';
import './quotes.css';
import axios from 'axios';
import Draggable from 'react-draggable';
import CloseWidget from '../../components/closeWidget/CloseWidget';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Loading from '../../components/loading/Loading';

const Quotes = () => {
  const [quotes, setQuotes] = useState();

  const [loading, setLoading] = useState(true);
  const RAPID_KEY = process.env.REACT_APP_RAPID_API;
  var options = {
    method: 'GET',
    url: 'https://quotes15.p.rapidapi.com/quotes/random/',
    params: { language_code: 'en' },
    headers: {
      'x-rapidapi-host': 'quotes15.p.rapidapi.com',
      'x-rapidapi-key': RAPID_KEY,
    },
  };

  const getQuotes = async () => {
    setLoading(true);
    await axios(options)
      .then((data) => {
        setQuotes(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getQuotes();

    let interval = setInterval(() => {
      getQuotes();
    }, 300000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleRefresh = () => {
    getQuotes();
  };
  const handleCopy = () => {
    quotes && navigator.clipboard.writeText(quotes.content);
  };
  return (
    <Draggable handle="strong">
      <div className="quotesCont box no-cursor">
        <strong className="cursor" style={{ width: 90 + '%' }}></strong>
        <CloseWidget id="quotes" />

        {loading ? (
          <div className="quoteLoading">
            <Loading width={'30px'} height={'30px'} />
          </div>
        ) : (
          <q className="quotesQuote">{quotes?.content}</q>
        )}
        <div className="quotesAuthor">
          <div className="quotesBtn">
            <button onClick={handleRefresh}>Refresh</button>
            <button onClick={handleCopy}>Copy</button>
          </div>

          <div>{quotes?.originator.name}</div>
        </div>
      </div>
    </Draggable>
  );
};

export default Quotes;

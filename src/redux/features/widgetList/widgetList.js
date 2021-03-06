import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CalculateIcon from '@mui/icons-material/Calculate';
import StyleIcon from '@mui/icons-material/Style';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import CasinoIcon from '@mui/icons-material/Casino';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
export const widgetsList = {
  version: 5,
  data: [
    {
      id: 'clock',
      name: 'Clock',
      status: false,
      user: false,
    },
    {
      id: 'weather',
      name: 'Weather',
      status: false,
      user: false,
    },

    {
      id: 'covid',
      name: 'Covid Info',
      status: false,
      user: false,
    },
    {
      id: 'blackScreen',
      name: 'Colorful Screen',
      status: false,
      user: false,
    },
    {
      id: 'calculator',
      name: 'Calculator',
      status: false,
      user: false,
    },
    {
      id: 'forex',
      name: 'Crypto Prices',
      status: false,
      user: false,
    },
    {
      id: 'matchCards',
      name: 'Match Cards',
      status: false,
      user: false,
    },
    {
      id: 'currency',
      name: 'Currency Convert',
      status: false,
      user: false,
    },
    {
      id: 'quotes',
      name: 'Quotes',
      status: false,
      user: false,
    },
    {
      id: 'rollDice',
      name: 'Roll Dice',
      status: false,
      user: false,
    },
    {
      id: 'imgWidget',
      name: 'Images',
      status: false,
      user: false,
    },
    {
      id: 'todo',
      name: 'To-do',
      status: false,
      user: false,
    },
    {
      id: 'news',
      name: 'News',
      status: false,
      user: true,
    },
  ],
};
export const iconList = [
  {
    id: 'clock',
    icon: <AccessTimeIcon />,
  },
  {
    id: 'weather',
    icon: <WbSunnyIcon />,
  },
  {
    id: 'covid',
    icon: <CoronavirusIcon />,
  },
  {
    id: 'blackScreen',
    icon: <ColorLensIcon />,
  },
  {
    id: 'calculator',
    icon: <CalculateIcon />,
  },
  {
    id: 'forex',
    icon: <PriceChangeIcon />,
  },
  {
    id: 'matchCards',
    icon: <StyleIcon />,
  },
  {
    id: 'currency',
    icon: <CurrencyExchangeIcon />,
  },
  {
    id: 'quotes',
    icon: <FormatQuoteIcon />,
  },
  {
    id: 'rollDice',
    icon: <CasinoIcon />,
  },
  {
    id: 'imgWidget',
    icon: <PhotoCameraBackIcon />,
  },
  { id: 'todo', icon: <NoteAltIcon /> },
  {
    id: 'news',
    icon: <NewspaperIcon />,
  },
];

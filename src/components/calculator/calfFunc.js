import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';

export const calcFunc = [
  {
    id: 'percentage',
    label: '%',
    className: 'calcFunc',
    func: function (num1, num2) {
      return (num1 * num2) / 100;
    },
  },
  {
    id: 'cancel',
    label: 'CE',
    className: 'calcFunc',
  },
  {
    id: 'clearAll',
    label: 'C',
    className: 'calcFunc',
  },
  {
    id: 'backspace',
    label: <KeyboardBackspaceOutlinedIcon />,
    className: 'calcFunc',
  },
  {
    id: 'divideOne',
    label: '1/x',
    className: 'calcFunc',
    func: (num) => {
      return 1 / num;
    },
  },
  {
    id: 'square',
    label: 'x*x',
    className: 'calcFunc',
    func: (num1) => {
      return num1 * num1;
    },
  },
  {
    id: 'squareRoot',
    label: 'sqrt(x)',
    className: 'calcFunc',
    func: (num) => {
      return Math.sqrt(num);
    },
  },
  {
    id: 'divide',
    label: '/',
    className: 'calcFunc',
    func: (num1, num2) => {
      return num1 / num2;
    },
  },
  {
    id: 'seven',
    label: '7',
    className: 'calcNum',
    func: 7,
  },
  {
    id: 'eight',
    label: '8',
    className: 'calcNum',
    func: 8,
  },
  {
    id: 'nine',
    label: '9',
    className: 'calcNum',
    func: 9,
  },
  {
    id: 'multiply',
    label: 'x',
    className: 'calcFunc',
    func: (num1, num2) => {
      return num1 * num2;
    },
  },
  {
    id: 'four',
    label: '4',
    className: 'calcNum',
    func: 4,
  },
  {
    id: 'five',
    label: '5',
    className: 'calcNum',
    func: 5,
  },
  {
    id: 'six',
    label: '6',
    className: 'calcNum',
    func: 6,
  },
  {
    id: 'minus',
    label: '-',
    className: 'calcFunc',
    func: (num1, num2) => {
      return num1 - num2;
    },
  },
  {
    id: 'one',
    label: '1',
    className: 'calcNum',
    func: 1,
  },
  {
    id: 'two',
    label: '2',
    className: 'calcNum',
    func: 2,
  },
  {
    id: 'three',
    label: '3',
    className: 'calcNum',
    func: 3,
  },
  {
    id: 'plus',
    label: '+',
    className: 'calcFunc',
    func: (num1, num2) => {
      return num1 + num2;
    },
  },
  {
    id: 'negPoz',
    label: '+/-',
    className: 'calcFunc',
    func: (num) => {
      return -num;
    },
  },
  {
    id: 'zero',
    label: '0',
    className: 'calcNum',
    func: 0,
  },
  {
    id: 'dot',
    label: '.',
    className: 'calcFunc',
    func: (num1, num2) => {
      return num1.num2;
    },
  },
  {
    id: 'equal',
    label: '=',
    className: 'calcEqual',
    func: 'equal',
  },
];

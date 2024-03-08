export interface Theme {
  name: string;
  main: string;
  background: string;
  panel: string;
  hover: string;
  stroke: string;
  text: string;
  muted: string;
  emphasis: string;
}

export const Light: Theme = {
  name: 'light',
  main: '#ffffff',
  background: '#f8f8f8',
  panel: '#f2f2f2',
  hover: '#f2f2f2',
  stroke: '#d4d4d4',
  text: '#202020',
  muted: '#424242',
  emphasis: '#ff8200',
};

export const Dark: Theme = {
  name: 'dark',
  main: '#222222',
  background: '#1f1f1f',
  hover: '#2f2f2f',
  panel: '#292929',
  stroke: '#464646',
  text: '#eeeeee',
  muted: '#adadad',
  emphasis: '#35c9ff',
};

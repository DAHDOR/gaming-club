import { FC } from 'react';

interface LogoProps {
  theme: string;
  mode: string;
}

const Logo: FC<LogoProps> = (props) => {
  const theme =
    props.theme.charAt(0).toUpperCase() + props.theme.slice(1).toLowerCase();
  const mode =
    props.mode.charAt(0).toUpperCase() + props.mode.slice(1).toLowerCase();

  return (
    <img
      src={'/logo/' + theme + mode + '.svg'}
      alt="Universidad Metropolitana"
      style={{ maxWidth: '100%', maxHeight: '100%' }}
    />
  );
};

export default Logo;

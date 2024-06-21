import { FC } from 'react';
import { Root } from './styles';

type SeparatorProps = {
  className?: string;
};

const Separator: FC<SeparatorProps> = ({ className }) => {
  return <Root className={className} />;
};

export default Separator;

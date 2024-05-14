import type { FC } from "react";
import { Dot, Wrapper } from "./styles";

const DotsLoader: FC<{ color?: string }> = ({ color }) => {
  return (
    <Wrapper>
      <Dot first color={color} />
      <Dot second color={color} />
      <Dot third color={color} />
      <Dot fourth color={color} />
    </Wrapper>
  );
};

export default DotsLoader;

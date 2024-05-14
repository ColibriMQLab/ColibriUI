import { Dot, Wrapper } from "./styles";
import type { FC } from "react";

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

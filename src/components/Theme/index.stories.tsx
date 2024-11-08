import React from "react";
import chroma from 'chroma-js';
import generateUniqID from '../helpers/generateUniqID';
import ColorsDefault from './themes/default';
import ColorsBA from './themes/buenos_aires';
import Typography from '../Typography'

const meta = {
  title: "UI/Theme",
};

export default meta;

export const Themes = () => {
  const style = `
    #storybook-root {
      flex: 1;
      display: block;
    }
  `;

  function isColorDark(color) {
    const rgb = chroma(color).rgb();
    const [r, g, b] = rgb.map(Number);
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
    return brightness < 128;
  }

  function getTextColorForBackground(bgColor) {
    return isColorDark(bgColor) ? 'white' : 'black';
  }

  return (
    <>
      <style>{style}</style>
      <div>
        <div style={{ display: 'flex', gap: '16px', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}/>
          <div style={{ flex: 1 }}>
            <Typography tag="h5" size="h5">Theme Default</Typography>
          </div>
          <div style={{ flex: 1 }}>
            <Typography tag="h5" size="h5">Theme BA</Typography>
          </div>
        </div>
          {Object.entries(ColorsDefault).map((item, index) => {
            const backgroundColor = item[1];
            const textColor = getTextColorForBackground(backgroundColor);
            const backgroundBAColor = ColorsBA[item[0]];
            const textBAColor = getTextColorForBackground(backgroundColor);

            return (
              <div style={{ display: 'flex', gap: '16px' }} key={generateUniqID(index)}>
                <div style={{ flex: 1 }}>
                  {`--${item[0]}`}
                </div>
                <div style={{ backgroundColor, color: textColor, flex: 1 }}>
                  {item[1]}
                </div>
                <div style={{ backgroundColor: backgroundBAColor, color: textBAColor, flex: 1 }}>
                  {ColorsBA[item[0]]}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
};
import React from "react";
import chroma from "chroma-js";
import { THEMES } from ".";
import { Typography } from "../Typography";

const meta = {
  title: "UI/Theme",
};

export default meta;

export const Themes = () => {
  const ColorsJaipur = THEMES.JAIPUR;
  const ColorsBA = THEMES.BA;
  const themeKeys = Array.from(
    new Set([...Object.keys(ColorsJaipur), ...Object.keys(ColorsBA)]),
  );

  const style = `
    #storybook-root {
      flex: 1;
      display: block;
    }
  `;

  function isColorToken(value: unknown) {
    return typeof value === "string" && chroma.valid(value);
  }

  function isColorDark(color: string) {
    const rgb = chroma(color).rgb();
    const [r, g, b] = rgb.map(Number);
    const brightness = r * 0.299 + g * 0.587 + b * 0.114;
    return brightness < 128;
  }

  function getTextColorForBackground(bgColor: unknown) {
    if (!isColorToken(bgColor)) {
      return "var(--color-text-primary)";
    }

    return isColorDark(bgColor)
      ? "var(--color-text-inverse)"
      : "var(--color-text-primary)";
  }

  function renderTokenValue(value: unknown) {
    if (value == null) {
      return "-";
    }

    return String(value);
  }

  return (
    <>
      <style>{style}</style>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-4)",
          }}
        >
          <div style={{ display: "flex", gap: "var(--space-4)" }}>
            <div style={{ flex: 1 }} />
            <div style={{ flex: 1 }}>
              <Typography tag="h5" size="h5">
                Theme Jaipur
              </Typography>
            </div>
            <div style={{ flex: 1 }}>
              <Typography tag="h5" size="h5">
                Theme BA
              </Typography>
            </div>
          </div>
          {themeKeys.map((key, index) => {
            const backgroundColor = ColorsJaipur[key];
            const textColor = getTextColorForBackground(backgroundColor);
            const backgroundBAColor = ColorsBA[key];
            const textBAColor = getTextColorForBackground(backgroundBAColor);
            const isJaipurColor = isColorToken(backgroundColor);
            const isBAColor = isColorToken(backgroundBAColor);

            return (
              <div
                key={index}
                style={{ display: "flex", gap: "var(--space-4)" }}
              >
                <div style={{ flex: 1 }}>{`--${key}`}</div>
                <div
                  style={{
                    backgroundColor: isJaipurColor
                      ? backgroundColor
                      : "transparent",
                    color: textColor,
                    flex: 1,
                  }}
                >
                  {renderTokenValue(backgroundColor)}
                </div>
                <div
                  style={{
                    backgroundColor: isBAColor
                      ? backgroundBAColor
                      : "transparent",
                    color: textBAColor,
                    flex: 1,
                  }}
                >
                  {renderTokenValue(backgroundBAColor)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

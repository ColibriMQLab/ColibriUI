import React, { useState, useCallback, useEffect } from "react";
import { addons, types, useParameter } from "@storybook/manager-api";
import {
  IconButton,
  TooltipLinkList,
  WithTooltip,
} from "@storybook/components";
import { PhotoIcon } from "@storybook/icons";

import { ADDON_ID, PARAM_KEY, events } from "./constants";

interface ColoredIconProps {
  background: string;
}

const ColoredIcon = ({ background }: ColoredIconProps): JSX.Element => (
  <div
    style={{
      background,
      borderRadius: "1rem",
      display: "block",
      height: "1rem",
      width: "1rem",
    }}
  />
);

const ThemeSelect = ({ channel }): JSX.Element => {
  const [activeTheme, setActiveTheme] = useState();

  const handleSelect = useCallback(
    (name) => {
      channel.emit(events.CHANGE, { name });
      window.location.reload();
    },
    [activeTheme],
  );

  useEffect(() => {
    const handleChange = ({ name }) => setActiveTheme(name);
    channel.on(events.CHANGE, handleChange);

    return () => {
      channel.off(events.CHANGE, handleChange);
    };
  }, []);

  const themes = useParameter(PARAM_KEY) || [];
  const links = themes.map(({ name, color }) => ({
    active: activeTheme === name,
    id: name,
    onClick: () => handleSelect(name),
    right: color ? <ColoredIcon background={color} /> : undefined,
    title: name,
    value: name,
  }));

  return (
    <WithTooltip
      placement="top"
      tooltip={<TooltipLinkList links={links} />}
      trigger="click"
    >
      <IconButton key="theme" active={true} title="">
        <PhotoIcon />
      </IconButton>
    </WithTooltip>
  );
};

addons.register(ADDON_ID, () => {
  const channel = addons.getChannel();

  addons.add(ADDON_ID, {
    title: "Themes",
    type: types.TOOL,
    render: () => <ThemeSelect channel={channel} />,
  });
});

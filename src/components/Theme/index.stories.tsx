import React from "react";
import GridItem from "../Grid/Item";
import Grid from "../Grid";
import Typography from '../Typography';
import type { Meta } from "@storybook/react";
import generateUniqID from '../helpers/generateUniqID';
import { Common, Backgrounds, Accents } from './colors/common';
import { Primary, Secondary, Tretiary, Brand } from './colors/theme_default';
import { PrimaryBA, SecondaryBA, TretiaryBA, BrandBA } from './colors/theme_buenos_aires';

const meta: Meta<typeof Grid> = {
  title: "UI/Theme",
} satisfies Meta<typeof Grid>;

export default meta;

export const CommonColors = () => {
  const style = `
    #storybook-root {
      flex: 1;
      display: block;
    }
  `;

  const common = Object.values(Common);
  const backgrounds = Object.values(Backgrounds);
  const accents = Object.values(Accents);

  return (
    <>
      <style>{style}</style>
      <Typography size="h3" tag="h3">Common</Typography>
      <Grid>
        {common.map((item, index) => (
          <GridItem
            key={generateUniqID(index)}
            style={{ backgroundColor: item }}
          >
            {item}
          </GridItem>
        ))}
      </Grid>
      <Typography size="h3" tag="h3">Backgrounds</Typography>
      <Grid>
        {backgrounds.map((item, index) => (
          <GridItem
            key={generateUniqID(index)}
            style={{ backgroundColor: item }}
          >
            {item}
          </GridItem>
        ))}
      </Grid>
      <Typography size="h3" tag="h3">Accents</Typography>
      <Grid>
        {accents.map((item, index) => (
          <GridItem
            key={generateUniqID(index)}
            style={{ backgroundColor: item }}
          >
            {item}
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export const ThemeDefault = () => {
  const style = `
    #storybook-root {
      flex: 1;
      display: block;
    }
  `;

  const primary = Object.values(Primary);
  const secondary = Object.values(Secondary);
  const tretiary = Object.values(Tretiary);
  const brand = Object.values(Brand);

  return (
    <>
      <style>{style}</style>
      <Typography size="h3" tag="h3">Primary</Typography>
      <Grid>
        {primary.map((item, index) => (
          <GridItem
            key={generateUniqID(index)}
            style={{ backgroundColor: item }}
          >
            {item}
          </GridItem>
        ))}
      </Grid>
      <Typography size="h3" tag="h3">Secondary</Typography>
      <Grid>
        {secondary.map((item, index) => (
          <GridItem
            key={generateUniqID(index)}
            style={{ backgroundColor: item }}
          >
            {item}
          </GridItem>
        ))}
      </Grid>
      <Typography size="h3" tag="h3">Tretiary</Typography>
      <Grid>
        {tretiary.map((item, index) => (
          <GridItem
            key={generateUniqID(index)}
            style={{ backgroundColor: item }}
          >
            {item}
          </GridItem>
        ))}
      </Grid>
      <Typography size="h3" tag="h3">Brand</Typography>
      <Grid>
        {brand.map((item, index) => (
          <GridItem
            key={generateUniqID(index)}
            style={{ backgroundColor: item }}
          >
            {item}
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export const ThemeBuenosAires = () => {
  const style = `
    #storybook-root {
      flex: 1;
      display: block;
    }
  `;

  const primary = Object.values(PrimaryBA);
  const secondary = Object.values(SecondaryBA);
  const tretiary = Object.values(TretiaryBA);
  const brand = Object.values(BrandBA);

  return (
    <>
      <style>{style}</style>
      <Typography size="h3" tag="h3">Primary</Typography>
      <Grid>
        {primary.map((item, index) => (
          <GridItem
            key={generateUniqID(index)}
            style={{ backgroundColor: item }}
          >
            {item}
          </GridItem>
        ))}
      </Grid>
      <Typography size="h3" tag="h3">Secondary</Typography>
      <Grid>
        {secondary.map((item, index) => (
          <GridItem
            key={generateUniqID(index)}
            style={{ backgroundColor: item }}
          >
            {item}
          </GridItem>
        ))}
      </Grid>
      <Typography size="h3" tag="h3">Tretiary</Typography>
      <Grid>
        {tretiary.map((item, index) => (
          <GridItem
            key={generateUniqID(index)}
            style={{ backgroundColor: item }}
          >
            {item}
          </GridItem>
        ))}
      </Grid>
      <Typography size="h3" tag="h3">Brand</Typography>
      <Grid>
        {brand.map((item, index) => (
          <GridItem
            key={generateUniqID(index)}
            style={{ backgroundColor: item }}
          >
            {item}
          </GridItem>
        ))}
      </Grid>
    </>
  );
};
/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";

import "./../src/index.css";
import { useState } from "react";
import Color from "colorjs.io";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const annotateColor = (UtopiaColor) => {
  let ColorObj = new Color(UtopiaColor.value);
  let ColorWhite = new Color("white");
  let ColorBlack = new Color("black");

  const space = ColorObj.space;
  const alpha = ColorObj.alpha;
  const lightness = ColorObj.oklch.l;
  const hue = isNaN(ColorObj.oklch.h) ? 0 : ColorObj.oklch.h;
  const chroma = isNaN(ColorObj.oklch.c) ? 0 : ColorObj.oklch.c;
  const isBlackish = isNaN(ColorObj.oklch.h) & (lightness < 0.2);
  const isWhiteish = isNaN(ColorObj.oklch.h) & (lightness > 0.9);
  const contrastToWhite = ColorWhite.contrastWCAG21(ColorObj);

  let nearestSRGB = ColorObj.to("srgb");

  return {
    label: UtopiaColor.label,
    value: UtopiaColor.value,
    lightness: lightness,
    hue: hue,
    chroma: chroma,
    space: space,
    alpha: alpha,
    inGamut: nearestSRGB.inGamut(),
    contrastToWhite: contrastToWhite,
    drawOutlineOnWhite: lightness > 0.93,
  };
};

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

// fifteenth iteration of using chatgpt
// euclidean distance does not cut it

function calculateDistance(color1, color2) {
  const L1 = color1.lightness;
  const C1 = color1.chroma;
  const H1 = color1.hue;

  const L2 = color2.lightness;
  const C2 = color2.chroma;
  const H2 = color2.hue;

  const deltaL = L1 - L2;
  const deltaC = C1 - C2;
  const deltaH =
    2 *
    Math.sqrt(C1 * C2) *
    Math.sin(
      (Math.min(Math.abs(H1 - H2), 360 - Math.abs(H1 - H2)) / 2) *
        (Math.PI / 180)
    );

  // Weight adjustments for lightness, chroma, and hue
  const kL = 1.0;
  const kC = 1.0;
  const kH = 1.0;

  const SL = 1.0;
  const SC = 1.0 + 0.045 * C1;
  const SH = 1.0 + 0.015 * C1;

  const deltaE = Math.sqrt(
    (deltaL / (kL * SL)) ** 2 +
      (deltaC / (kC * SC)) ** 2 +
      (deltaH / (kH * SH)) ** 2
  );

  return deltaE;
}
function assignLabel(color, referenceColors) {
  let closestColor = referenceColors[0];
  let minDistance = calculateDistance(color, closestColor);

  for (const refColor of referenceColors) {
    const distance = calculateDistance(color, refColor);
    if (distance < minDistance) {
      closestColor = refColor;
      minDistance = distance;
    }
  }
  return (
    <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
      <div>{closestColor.label}</div>
      <div>{minDistance.toFixed(1)}</div>
      <div
        data-tooltip-content={closestColor.value}
        style={{
          width: 10,
          borderRadius: 5,
          height: 10,
          background: closestColor.value,
          boxShadow: "inset 0px 0px 0px 1px #00000044",
        }}
      />
    </div>
  );
}

const ReferenceColors = [
  { value: "#FFF9C4", popularity: 3, label: "Yellow 100" },
  { value: "#FFF59D", popularity: 3, label: "Yellow 200" },
  { value: "#FFF176", popularity: 3, label: "Yellow 300" },
  { value: "#FFEE58", popularity: 3, label: "Yellow 400" },
  { value: "#FFEB3B", popularity: 3, label: "Yellow 500" },
  { value: "#FDD835", popularity: 3, label: "Yellow 600" },
  { value: "#FBC02D", popularity: 3, label: "Yellow 700" },
  { value: "#F9A825", popularity: 3, label: "Yellow 800" },
  { value: "#F57F17", popularity: 3, label: "Yellow 900" },
  { value: "#FFFF8D", popularity: 3, label: "Yellow A100" },
  { value: "#FFFF00", popularity: 3, label: "Yellow A200" },
  { value: "#FFEA00", popularity: 3, label: "Yellow A400" },
  { value: "#FFD600", popularity: 3, label: "Yellow A700" },
  { value: "#FFECB3", popularity: 3, label: "Amber 100" },
  { value: "#FFE082", popularity: 3, label: "Amber 200" },
  { value: "#FFD54F", popularity: 3, label: "Amber 300" },
  { value: "#FFCA28", popularity: 3, label: "Amber 400" },
  { value: "#FFC107", popularity: 3, label: "Amber 500" },
  { value: "#FFB300", popularity: 3, label: "Amber 600" },
  { value: "#FFA000", popularity: 3, label: "Amber 700" },
  { value: "#FF8F00", popularity: 3, label: "Amber 800" },
  { value: "#FF6F00", popularity: 3, label: "Amber 900" },
  { value: "#FFE57F", popularity: 3, label: "Amber A100" },
  { value: "#FFD740", popularity: 3, label: "Amber A200" },
  { value: "#FFC400", popularity: 3, label: "Amber A400" },
  { value: "#FFAB00", popularity: 3, label: "Amber A700" },
  { value: "oklch(0.95 0.01 0.0)", label: "Pure White" },
  { value: "oklch(0.90 0.02 90.0)", label: "Off White" },
  { value: "oklch(0.85 0.03 180.0)", label: "Light Gray" },
  { value: "oklch(0.75 0.05 270.0)", label: "Gray" },
  { value: "oklch(0.60 0.10 270.0)", label: "Dark Gray" },
  { value: "oklch(0.40 0.10 270.0)", label: "Charcoal" },
  { value: "oklch(0.20 0.05 270.0)", label: "Almost Black" },
  { value: "oklch(0.95 0.03 30.0)", label: "Ivory" },
  { value: "oklch(0.90 0.05 40.0)", label: "Pale Peach" },
  { value: "oklch(0.85 0.10 50.0)", label: "Light Coral" },
  { value: "oklch(0.80 0.10 60.0)", label: "Light Lemon" },
  { value: "oklch(0.75 0.05 120.0)", label: "Mint Green" },
  { value: "oklch(0.70 0.10 200.0)", label: "Sky Blue" },
  { value: "oklch(0.65 0.10 30.0)", label: "Soft Pink" },
  { value: "oklch(0.60 0.15 40.0)", label: "Peach" },
  { value: "oklch(0.55 0.20 50.0)", label: "Salmon" },
  { value: "oklch(0.50 0.20 60.0)", label: "Golden Yellow" },
  { value: "oklch(0.45 0.15 150.0)", label: "Pale Green" },
  { value: "oklch(0.40 0.10 200.0)", label: "Light Teal" },
  { value: "oklch(0.35 0.10 30.0)", label: "Blush" },
  { value: "oklch(0.30 0.15 40.0)", label: "Apricot" },
  { value: "oklch(0.25 0.15 50.0)", label: "Coral" },
  { value: "oklch(0.20 0.10 60.0)", label: "Amber" },
  { value: "oklch(0.15 0.05 120.0)", label: "Olive" },
  { value: "oklch(0.10 0.05 200.0)", label: "Teal" },
  { value: "oklch(0.05 0.05 30.0)", label: "Rose" },
  { value: "oklch(0.00 0.05 40.0)", label: "Tangerine" },
  { value: "oklch(0.95 0.03 0.0)", label: "Snow" },
  { value: "oklch(0.90 0.10 20.0)", label: "Cream" },
  { value: "oklch(0.85 0.15 30.0)", label: "Light Pink" },
  { value: "oklch(0.80 0.10 40.0)", label: "Light Yellow" },
  { value: "oklch(0.75 0.05 120.0)", label: "Light Mint" },
  { value: "oklch(0.70 0.10 180.0)", label: "Light Cyan" },
  { value: "oklch(0.65 0.10 30.0)", label: "Pink" },
  { value: "oklch(0.60 0.15 40.0)", label: "Peachy" },
  { value: "oklch(0.55 0.20 50.0)", label: "Light Salmon" },
  { value: "oklch(0.50 0.20 60.0)", label: "Yellow" },
  { value: "oklch(0.45 0.15 150.0)", label: "Mint" },
  { value: "oklch(0.40 0.10 180.0)", label: "Cyan" },
  { value: "oklch(0.35 0.10 30.0)", label: "Blush Pink" },
  { value: "oklch(0.30 0.15 40.0)", label: "Apricot Orange" },
  { value: "oklch(0.25 0.15 50.0)", label: "Salmon Pink" },
  { value: "oklch(0.20 0.10 60.0)", label: "Amber Yellow" },
  { value: "oklch(0.15 0.05 120.0)", label: "Olive Green" },
  { value: "oklch(0.10 0.05 180.0)", label: "Teal Blue" },
  { value: "oklch(0.05 0.05 30.0)", label: "Rose Red" },
  { value: "oklch(0.00 0.05 40.0)", label: "Tangerine Orange" },
  { value: "oklch(0.95 0.03 0.0)", label: "Ivory White" },
  { value: "oklch(0.90 0.10 30.0)", label: "Pale Pink" },
  { value: "oklch(0.85 0.15 40.0)", label: "Light Red" },
  { value: "oklch(0.80 0.10 50.0)", label: "Light Gold" },
  { value: "oklch(0.75 0.05 120.0)", label: "Minty Green" },
  { value: "oklch(0.70 0.10 180.0)", label: "Sky Cyan" },
  { value: "oklch(0.65 0.10 30.0)", label: "Soft Red" },
  { value: "oklch(0.60 0.15 40.0)", label: "Peach Orange" },
  { value: "oklch(0.55 0.20 50.0)", label: "Salmon Red" },
  { value: "oklch(0.50 0.20 60.0)", label: "Golden Yellow" },
  { value: "oklch(0.95 0.1 145)", label: "Mint Green" },
  { value: "oklch(0.90 0.1 150)", label: "Seafoam Green" },
  { value: "oklch(0.98 0.05 145)", label: "Honeydew" },
  { value: "oklch(0.90 0.05 140)", label: "Pale Green" },
  { value: "oklch(0.95 0.1 150)", label: "Light Mint" },
  { value: "oklch(0.85 0.1 150)", label: "Celadon" },
  { value: "oklch(0.95 0.05 150)", label: "Tea Green" },
  { value: "oklch(0.85 0.2 150)", label: "Spring Green" },
  { value: "oklch(0.90 0.1 150)", label: "Pastel Green" },
  { value: "oklch(0.80 0.2 150)", label: "Light Green" },
  { value: "oklch(0.85 0.3 150)", label: "Granny Smith Apple" },
  { value: "oklch(0.85 0.4 150)", label: "Inchworm" },
  { value: "oklch(0.70 0.2 150)", label: "Moss Green" },
  { value: "oklch(0.75 0.1 150)", label: "Sage" },
  { value: "oklch(0.60 0.3 150)", label: "Fern Green" },
  { value: "oklch(0.50 0.2 150)", label: "Olive Drab" },
  { value: "oklch(0.65 0.1 150)", label: "Artichoke" },
  { value: "oklch(0.75 0.2 150)", label: "Pistachio" },
  { value: "oklch(0.65 0.2 150)", label: "Asparagus" },
  { value: "oklch(0.55 0.3 150)", label: "Avocado" },
  { value: "oklch(0.70 0.1 150)", label: "Laurel Green" },
  { value: "oklch(0.70 0.2 150)", label: "Light Olive" },
  { value: "oklch(0.65 0.1 150)", label: "Dark Sea Green" },
  { value: "oklch(0.60 0.2 150)", label: "Medium Sea Green" },
  { value: "oklch(0.70 0.3 150)", label: "Jade" },
  { value: "oklch(0.75 0.4 150)", label: "Shamrock Green" },
  { value: "oklch(0.65 0.5 150)", label: "Emerald" },
  { value: "oklch(0.80 0.4 150)", label: "Green Apple" },
  { value: "oklch(0.75 0.5 150)", label: "Lime Green" },
  { value: "oklch(0.85 0.6 150)", label: "Lime" },
  { value: "oklch(0.90 0.6 150)", label: "Chartreuse" },
  { value: "oklch(0.85 0.5 150)", label: "Yellow-Green" },
  { value: "oklch(0.90 0.5 150)", label: "Green-Yellow" },
  { value: "oklch(0.80 0.6 150)", label: "Lawn Green" },
  { value: "oklch(0.70 0.2 150)", label: "Mantis" },
  { value: "oklch(0.60 0.2 150)", label: "Celery" },
  { value: "oklch(0.50 0.2 150)", label: "Olive" },
  { value: "oklch(0.40 0.2 150)", label: "Dark Olive" },
  { value: "oklch(0.30 0.2 150)", label: "Army Green" },
  { value: "oklch(0.20 0.2 150)", label: "Forest Green" },
  { value: "oklch(0.10 0.2 150)", label: "Dark Green" },
  { value: "oklch(0.80 0.3 150)", label: "Pear" },
  { value: "oklch(0.75 0.3 150)", label: "Moss" },
  { value: "oklch(0.70 0.3 150)", label: "Grass" },
  { value: "oklch(0.65 0.3 150)", label: "Clover" },
  { value: "oklch(0.60 0.3 150)", label: "Pine" },
  { value: "oklch(0.55 0.3 150)", label: "Myrtle" },
  { value: "oklch(0.50 0.3 150)", label: "Hunter Green" },
  { value: "oklch(0.45 0.3 150)", label: "Bottle Green" },
  { value: "oklch(0.40 0.3 150)", label: "British Racing Green" },
  { value: "oklch(0.35 0.3 150)", label: "Sacramento Green" },
  { value: "oklch(0.30 0.3 150)", label: "Seaweed" },
  { value: "oklch(0.25 0.3 150)", label: "Juniper" },
  { value: "oklch(0.20 0.3 150)", label: "Laurel" },
  { value: "oklch(0.15 0.3 150)", label: "Basil" },
  { value: "oklch(0.10 0.3 150)", label: "Thyme" },
  { value: "oklch(0.05 0.3 150)", label: "Holly" },
  { value: "oklch(0.95 0.1 160)", label: "Mint Cream" },
  { value: "oklch(0.90 0.1 160)", label: "Light Sea Green" },
  { value: "oklch(0.85 0.1 160)", label: "Medium Aquamarine" },
  { value: "oklch(0.80 0.1 160)", label: "Aquamarine" },
  { value: "oklch(0.75 0.1 160)", label: "Turquoise" },
  { value: "oklch(0.70 0.1 160)", label: "Medium Turquoise" },
  { value: "oklch(0.65 0.1 160)", label: "Dark Turquoise" },
  { value: "oklch(0.60 0.1 160)", label: "Light Cyan" },
  { value: "oklch(0.55 0.1 160)", label: "Cyan" },
  { value: "oklch(0.50 0.1 160)", label: "Dark Cyan" },
  { value: "oklch(0.45 0.1 160)", label: "Teal" },
  { value: "oklch(0.40 0.1 160)", label: "Dark Teal" },
  { value: "oklch(0.35 0.1 160)", label: "Cadet Blue" },
  { value: "oklch(0.30 0.1 160)", label: "Steel Blue" },
  { value: "oklch(0.25 0.1 160)", label: "Light Steel Blue" },
  { value: "oklch(0.20 0.1 160)", label: "Powder Blue" },
  { value: "oklch(0.15 0.1 160)", label: "Light Blue" },
  { value: "oklch(0.10 0.1 160)", label: "Sky Blue" },
  { value: "oklch(0.05 0.1 160)", label: "Light Sky Blue" },
  { value: "oklch(0.95 0.1 170)", label: "Mint Blue" },
  { value: "oklch(0.90 0.1 170)", label: "Light Mint Blue" },
  { value: "oklch(0.85 0.1 170)", label: "Medium Mint Blue" },
  { value: "oklch(0.80 0.1 170)", label: "Aquamarine Blue" },
  { value: "oklch(0.75 0.1 170)", label: "Turquoise Blue" },
  { value: "oklch(0.70 0.1 170)", label: "Medium Turquoise Blue" },
  { value: "oklch(0.65 0.1 170)", label: "Dark Turquoise Blue" },
  { value: "oklch(0.60 0.1 170)", label: "Light Cyan Blue" },
  { value: "oklch(0.55 0.1 170)", label: "Cyan Blue" },
  { value: "oklch(0.50 0.1 170)", label: "Dark Cyan Blue" },
  { value: "oklch(0.45 0.1 170)", label: "Teal Blue" },
  { value: "oklch(0.40 0.1 170)", label: "Dark Teal Blue" },
  { value: "oklch(0.35 0.1 170)", label: "Cadet Blue Green" },
  { value: "oklch(0.30 0.1 170)", label: "Steel Blue Green" },
  { value: "oklch(0.25 0.1 170)", label: "Light Steel Blue Green" },
  { value: "oklch(0.20 0.1 170)", label: "Powder Blue Green" },
  { value: "oklch(0.15 0.1 170)", label: "Light Blue Green" },
  { value: "oklch(0.10 0.1 170)", label: "Sky Blue Green" },
  { value: "oklch(0.05 0.1 170)", label: "Light Sky Blue Green" },
];

const TestColors = [
  { value: "#FF3131", label: "UI Red" },
  { value: "oklch(0.67 0.21 242.58 / .1)", label: "UI Blue (old inverted)" },
  { value: "oklch(0.67 0.21 242.58 / .8)", label: "UI Blue (bg new!)" },
  { value: "oklch(0.67 0.21 242.58 / .8)", label: "¨UI Blue (use this 2024)" },
  { value: "oklch(0.67 0.21 242.58 / .9)", label: "UI Blue (" },
  { value: "#D84D4Daa", label: "UI Red (final)" },
  { value: "oklch(0.67 0.21 242.58 / 70%)", label: "P3 Blue transparent" },
  { value: "#F07969", label: "UI Red (latest)" },
  { value: "#B21C25", label: "Squirrel" },
  { value: "#794539", label: "Squirrel Winter" },
  { value: "#D83737", label: "Floorboards" },
  { value: "#691510", label: "Chestnut (edible)" },
  { value: "#A33526", label: "Brick (inedible)" },
  { value: "#B73518", label: "Rust? Orange?" },
  { value: "#C33636", label: "Pink, kinda" },
  { value: "#F094D1", label: "Pink, kinda but better?" },
  { value: "#DB7B21", label: "Burnt Orange" },
  { value: "#FF8A00", label: "Inflamed Orange" },
  { value: "#C16005", label: "Is it even Orange" },
  { value: "#D7981E", label: "wtf is Goldenrod" },
  { value: "#F8B86D", label: "Georgia State Fruit" },
  { value: "#985C14", label: "Matt Bronze" },
  { value: "#FAB123", label: "Artificial Lemon 700" },
  { value: "#FFA500", label: "Ambergris" },
  { value: "#997413", label: "Olive Brown" },
  { value: "#FFEAB4", label: "Pale Beige" },
  { value: "#F6C58B", label: "Light Orange" },
  { value: "#EFF268", label: "Lemon Yellow" },
  { value: "#807D23", label: "Dark Olive" },
  { value: "#D2DF3B", label: "Lime Green" },
  { value: "#EBFF00", label: "Neon Yellow" },
  { value: "#F2ED6F", label: "Pale Yellow" },
  { value: "#FFFB95", label: "Light Yellow" },
  { value: "#FFFF00", label: "Yellow" },
  { value: "#D8D136", label: "Mustard Yellow" },
  { value: "#DED8A1", label: "Beige" },
  { value: "#C4BFAF", label: "Light Taupe" },
  { value: "#A19954", label: "Khaki" },
  { value: "#349424", label: "Green" },
  { value: "#74A74D", label: "Green" },
  { value: "#3FD732", label: "Green" },
  { value: "#008000", label: "Green" },
  { value: "#05AA51", label: "Green" },
  { value: "#71AC43", label: "Green" },
  { value: "#88FFA2", label: "Green" },
  { value: "#4EF869", label: "Green" },
  { value: "#0E781F", label: "Green" },
  { value: "#122307", label: "Green" },
  { value: "#084834", label: "Teal (like seal but greener)" },
  { value: "#25B592", label: "Turquoise" },
  { value: "#1298AA", label: "Aqua" },
  { value: "#386A80", label: "Steel Blue" },
  { value: "#6A808D", label: "Slate Gray" },
  { value: "#7582A4", label: "Light Slate Blue" },
  { value: "#0000FF", label: "Blue" },
  { value: "#0099FF", label: "Sky Blue" },
  { value: "#0075F9", label: "Royal Blue" },
  { value: "#8FFFF2", label: "Breakfast at Trademarked" },
  { value: "#87ABF1", label: "Periwinkle" },
  { value: "#4E4CAD", label: "hipster jeans blue" },
  { value: "#5F14AA", label: "Purple" },
  { value: "#300D5D", label: "Deep Purple" },
  { value: "#BB7FE0", label: "Lavender" },
  { value: "#DD88E4", label: "Light Purple" },
  { value: "#7B528F", label: "Medium Purple" },
  { value: "#EEBCFF", label: "Mauve" },
  { value: "#81708E", label: "Grayish Purple" },
  { value: "#2B0E42", label: "Dark Violet" },
  { value: "#7622FF", label: "Vivid Violet" },
  { value: "#50425F", label: "Slate Blue" },
  { value: "#AD54A9", label: "Magenta" },
];

const AnnotatedReferenceColors = ReferenceColors.map((c) => annotateColor(c));

const PopularityIndicator = (props) => {
  const elements = Array.from({ length: props.popularity }, (_, index) => (
    <div
      key={index}
      style={{ height: 12, width: 3, borderRadius: 4, background: "black" }}
    ></div>
  ));

  return (
    <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
      {props.popularity} {elements}
    </div>
  );
};

const InteractiveHueRangeSelector = (props) => {
  const width = 250;

  const [hueRange, setHueRange] = useState(50);
  const [offsetX, setOffsetX] = useState(40);

  const updateOffsetAndCallCallback = (x) => {
    let minHue = computeSelectedHueRange(
      computeRoundedHueMidpointFromSelectionRange(offsetX, width),
      hueRange
    ).minHue;

    let maxHue = computeSelectedHueRange(
      computeRoundedHueMidpointFromSelectionRange(offsetX, width),
      hueRange
    ).maxHue;

    props.fnUpdateHueFilter(minHue, maxHue);
    setOffsetX(x);
  };

  const [selectedHueMin, setSelectedHueMin] = useState(0);
  const [selectedHueMax, setSelectedHueMax] = useState(0);

  // LARPing LERPing
  // given a point within a control, compute the corresponding 0-360 hue, rounded to integer
  const computeRoundedHueMidpointFromSelectionRange = (
    controlPointX,
    controlWidth
  ) => Math.round((360 * controlPointX) / controlWidth, 0);

  // Compute hue bounds from midpoint + range, with sensible upper / lower bounds
  const computeSelectedHueRange = (midpoint, range) => {
    // initialise defaults
    let minHue = 0;
    let maxHue = range;

    // bound them
    maxHue = Math.min(midpoint + range / 2, 360);
    minHue = Math.max(midpoint - range / 2, 0);

    // still full range if near limits
    minHue = maxHue === 360 ? maxHue - range : minHue;
    maxHue = minHue === 0 ? minHue + range : maxHue;

    return { minHue: minHue, maxHue: maxHue };
  };

  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [pressedButton, setPressedButton] = useState(null);

  const handleMouseDown = (e) => {
    setIsButtonPressed(true);
    setPressedButton(e.button);
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    let offsetLimited = x < 0 ? 0 : x > width ? width : x;
    updateOffsetAndCallCallback(offsetLimited);
  };

  const handleMouseUp = (e) => {
    setIsButtonPressed(false);
    setPressedButton(null);
  };

  const handleMouseEnter = (e) => {
    setIsButtonPressed(false);
  };
  const handleMouseLeave = (e) => {
    setIsButtonPressed(false);
  };

  const handleMouseMove = (e) => {
    var rect = e.target.getBoundingClientRect();
    // fucked
    var x = e.clientX - rect.left;
    let offsetLimited = x < 0 ? 0 : x > width ? width : x;

    if (isButtonPressed) {
      updateOffsetAndCallCallback(offsetLimited);
    }
  };

  return (
    <div
      style={{ position: "relative" }}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        data-id="selector"
        style={{
          opacity: props.filterByHue ? 1 : 0,
          pointerEvents: "none",
          position: "absolute",
          width: hueRange,
          height: 18,
          top: -3,
          left: -3,
          transformOrigin: "center center",
          transform: `translateX(${offsetX - hueRange / 2}px)`,
          background: "transparent",
          border: "3px solid white",
          borderRadius: 3,
          boxShadow: "0px 0px 2px 0px #888",
          cursor: "pointer",
        }}
      />
      <div
        style={{
          width: width,
          height: 18,
          cursor: "pointer",
          // background: "",
          background: `
          linear-gradient(in hsl longer hue 90deg, red 0 0)`,
          backgroundBlendMode: "multiply",
        }}
      ></div>
    </div>
  );
};

function compareColorByLightness(a, b) {
  if (a.lightness < b.lightness) {
    return -1;
  }
  if (a.lightness > b.lightness) {
    return 1;
  }
  return 0;
}
function compareColorByLightnessAsc(a, b) {
  if (a.lightness < b.lightness) {
    return -1;
  }
  if (a.lightness > b.lightness) {
    return 1;
  }
  return 0;
}
function compareColorByLightnessDesc(a, b) {
  if (a.lightness > b.lightness) {
    return -1;
  }
  if (a.lightness < b.lightness) {
    return 1;
  }
  return 0;
}
function compareColorByHueAsc(a, b) {
  if (a.hue > b.hue) {
    return -1;
  }
  if (a.hue < b.hue) {
    return 1;
  }
  return 0;
}
function compareColorByHueDesc(a, b) {
  if (a.hue > b.hue) {
    return 1;
  }
  if (a.hue < b.hue) {
    return -1;
  }
  return 0;
}
function returnComparisonFn(byWhat, ascDesc) {
  if (byWhat === "lightness" && ascDesc === "asc") {
    return compareColorByLightnessAsc;
  }
  if (byWhat === "lightness" && ascDesc === "desc") {
    return compareColorByLightnessDesc;
  }
  if (byWhat === "hue" && ascDesc === "asc") {
    return compareColorByHueAsc;
  }
  if (byWhat === "hue" && ascDesc === "desc") {
    return compareColorByHueDesc;
  }
}

export const Row = (props) => (
  <div style={{ display: "flex", alignItems: "center", ...props.style }}>
    {props.children}
  </div>
);
export const Col = (props) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      ...props.style,
    }}
  >
    {props.children}
  </div>
);
export const Swatch = (props) => {
  const checkerboardPattern = `
    linear-gradient(45deg, #ccc 25%, transparent 25%), 
    linear-gradient(135deg, #ccc 25%, transparent 25%), 
    linear-gradient(45deg, transparent 75%, #ccc 75%), 
    linear-gradient(135deg, transparent 75%, #ccc 75%)
  `;

  const checkerboardBackground = {
    backgroundSize: "10px 10px",
    backgroundPosition: "0 0, 5px 0, 5px -5px, 0px 5px",
    backgroundImage: checkerboardPattern,
  };

  return (
    <div
      style={{
        width: 20,
        height: 20,
        position: "relative",
        borderRadius: 4,
        boxShadow: props.drawOutline ? "inset 0px 0px 0px 1px #00000022" : null,
        position: "relative",
        overflow: "hidden",
        ...checkerboardBackground,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          right: 0,
          background: props.color,
        }}
      ></div>
      {!props.beyondSRGB ? (
        <div
          style={{
            color: "white",
            position: "absolute",
            borderRadius: 2,
            bottom: 0,
            right: 0,
            fontSize: 9,
            fontSize: 8,
            fontWeight: 700,
            mixBlendMode: "difference",
          }}
        >
          ⎔
        </div>
      ) : null}
    </div>
  );
};

const PreparedColors = [
  { value: "#FFCDD2", popularity: 3, label: "Red 100" },
  { value: "#EF9A9A", popularity: 3, label: "Red 200" },
  { value: "#E57373", popularity: 3, label: "Red 300" },
  { value: "#EF5350", popularity: 3, label: "Red 400" },
  { value: "#F44336", popularity: 3, label: "Red 500" },
  { value: "#E53935", popularity: 3, label: "Red 600" },
  { value: "#D32F2F", popularity: 3, label: "Red 700" },
  { value: "#C62828", popularity: 3, label: "Red 800" },
  { value: "#B71C1C", popularity: 3, label: "Red 900" },
  { value: "#FF8A80", popularity: 3, label: "Red A100" },
  { value: "#FF5252", popularity: 3, label: "Red A200" },
  { value: "#FF1744", popularity: 3, label: "Red A400" },
  { value: "#D50000", popularity: 3, label: "Red A700" },
  { value: "#F8BBD0", popularity: 3, label: "Pink 100" },
  { value: "#F48FB1", popularity: 3, label: "Pink 200" },
  { value: "#F06292", popularity: 3, label: "Pink 300" },
  { value: "#EC407A", popularity: 3, label: "Pink 400" },
  { value: "#E91E63", popularity: 3, label: "Pink 500" },
  { value: "#D81B60", popularity: 3, label: "Pink 600" },
  { value: "#C2185B", popularity: 3, label: "Pink 700" },
  { value: "#AD1457", popularity: 3, label: "Pink 800" },
  { value: "#880E4F", popularity: 3, label: "Pink 900" },
  { value: "#FF80AB", popularity: 3, label: "Pink A100" },
  { value: "#FF4081", popularity: 3, label: "Pink A200" },
  { value: "#F50057", popularity: 3, label: "Pink A400" },
  { value: "#C51162", popularity: 3, label: "Pink A700" },
  { value: "#E1BEE7", popularity: 3, label: "Purple 100" },
  { value: "#CE93D8", popularity: 3, label: "Purple 200" },
  { value: "#BA68C8", popularity: 3, label: "Purple 300" },
  { value: "#AB47BC", popularity: 3, label: "Purple 400" },
  { value: "#9C27B0", popularity: 3, label: "Purple 500" },
  { value: "#8E24AA", popularity: 3, label: "Purple 600" },
  { value: "#7B1FA2", popularity: 3, label: "Purple 700" },
  { value: "oklch(0.67 0.21 242.58 20%)", popularity: 3, label: "P3 Blue 1" },
  { value: "oklch(0.67 0.21 242.58 50%)", popularity: 3, label: "P3 Blue 2" },
  { value: "oklch(0.67 0.21 242.58 .8)", popularity: 3, label: "P3 Blue 3" },
  { value: "#6A1B9A", popularity: 3, label: "Purple 800" },
  { value: "#4A148C", popularity: 3, label: "Purple 900" },
  { value: "#EA80FC", popularity: 3, label: "Purple A100" },
  { value: "#E040FB", popularity: 3, label: "Purple A200" },
  { value: "#D500F9", popularity: 3, label: "Purple A400" },
  { value: "#AA00FF", popularity: 3, label: "Purple A700" },
  { value: "#D1C4E9", popularity: 3, label: "Deep Purple 100" },
  { value: "#B39DDB", popularity: 3, label: "Deep Purple 200" },
  { value: "#9575CD", popularity: 3, label: "Deep Purple 300" },
  { value: "#7E57C2", popularity: 3, label: "Deep Purple 400" },
  { value: "#673AB7", popularity: 3, label: "Deep Purple 500" },
  { value: "#5E35B1", popularity: 3, label: "Deep Purple 600" },
  { value: "#512DA8", popularity: 3, label: "Deep Purple 700" },
  { value: "#4527A0", popularity: 3, label: "Deep Purple 800" },
  { value: "#311B92", popularity: 3, label: "Deep Purple 900" },
  { value: "#B388FF", popularity: 3, label: "Deep Purple A100" },
  { value: "#7C4DFF", popularity: 3, label: "Deep Purple A200" },
  { value: "#651FFF", popularity: 3, label: "Deep Purple A400" },
  { value: "#6200EA", popularity: 3, label: "Deep Purple A700" },
  { value: "#C5CAE9", popularity: 3, label: "Indigo 100" },
  { value: "#9FA8DA", popularity: 3, label: "Indigo 200" },
  { value: "#7986CB", popularity: 3, label: "Indigo 300" },
  { value: "#5C6BC0", popularity: 3, label: "Indigo 400" },
  { value: "#3F51B5", popularity: 3, label: "Indigo 500" },
  { value: "#3949AB", popularity: 3, label: "Indigo 600" },
  { value: "#303F9F", popularity: 3, label: "Indigo 700" },
  { value: "#283593", popularity: 3, label: "Indigo 800" },
  { value: "#1A237E", popularity: 3, label: "Indigo 900" },
  { value: "#8C9EFF", popularity: 3, label: "Indigo A100" },
  { value: "#536DFE", popularity: 3, label: "Indigo A200" },
  { value: "#3D5AFE", popularity: 3, label: "Indigo A400" },
  { value: "#304FFE", popularity: 3, label: "Indigo A700" },
  { value: "#BBDEFB", popularity: 3, label: "Blue 100" },
  { value: "#90CAF9", popularity: 3, label: "Blue 200" },
  { value: "#64B5F6", popularity: 3, label: "Blue 300" },
  { value: "#42A5F5", popularity: 3, label: "Blue 400" },
  { value: "#2196F3", popularity: 3, label: "Blue 500" },
  { value: "#1E88E5", popularity: 3, label: "Blue 600" },
  { value: "#1976D2", popularity: 3, label: "Blue 700" },
  { value: "#1565C0", popularity: 3, label: "Blue 800" },
  { value: "#0D47A1", popularity: 3, label: "Blue 900" },
  { value: "#82B1FF", popularity: 3, label: "Blue A100" },
  { value: "#448AFF", popularity: 3, label: "Blue A200" },
  { value: "#2979FF", popularity: 3, label: "Blue A400" },
  { value: "#2962FF", popularity: 3, label: "Blue A700" },
  { value: "#B3E5FC", popularity: 3, label: "Light Blue 100" },
  { value: "#81D4FA", popularity: 3, label: "Light Blue 200" },
  { value: "#4FC3F7", popularity: 3, label: "Light Blue 300" },
  { value: "#29B6F6", popularity: 3, label: "Light Blue 400" },
  { value: "#03A9F4", popularity: 3, label: "Light Blue 500" },
  { value: "#039BE5", popularity: 3, label: "Light Blue 600" },
  { value: "#0288D1", popularity: 3, label: "Light Blue 700" },
  { value: "#0277BD", popularity: 3, label: "Light Blue 800" },
  { value: "#01579B", popularity: 3, label: "Light Blue 900" },
  { value: "#80D8FF", popularity: 3, label: "Light Blue A100" },
  { value: "#40C4FF", popularity: 3, label: "Light Blue A200" },
  { value: "#00B0FF", popularity: 3, label: "Light Blue A400" },
  { value: "#0091EA", popularity: 3, label: "Light Blue A700" },
  { value: "#B2EBF2", popularity: 3, label: "Cyan 100" },
  { value: "#80DEEA", popularity: 3, label: "Cyan 200" },
  { value: "#4DD0E1", popularity: 3, label: "Cyan 300" },
  { value: "#26C6DA", popularity: 3, label: "Cyan 400" },
  { value: "#00BCD4", popularity: 3, label: "Cyan 500" },
  { value: "#00ACC1", popularity: 3, label: "Cyan 600" },
  { value: "#0097A7", popularity: 3, label: "Cyan 700" },
  { value: "#00838F", popularity: 3, label: "Cyan 800" },
  { value: "#006064", popularity: 3, label: "Cyan 900" },
  { value: "#84FFFF", popularity: 3, label: "Cyan A100" },
  { value: "#18FFFF", popularity: 3, label: "Cyan A200" },
  { value: "#00E5FF", popularity: 3, label: "Cyan A400" },
  { value: "#00B8D4", popularity: 3, label: "Cyan A700" },
  { value: "#B2DFDB", popularity: 3, label: "Teal 100" },
  { value: "#80CBC4", popularity: 3, label: "Teal 200" },
  { value: "#4DB6AC", popularity: 3, label: "Teal 300" },
  { value: "#26A69A", popularity: 3, label: "Teal 400" },
  { value: "#009688", popularity: 3, label: "Teal 500" },
  { value: "#00897B", popularity: 3, label: "Teal 600" },
  { value: "#00796B", popularity: 3, label: "Teal 700" },
  { value: "#00695C", popularity: 3, label: "Teal 800" },
  { value: "#004D40", popularity: 3, label: "Teal 900" },
  { value: "#A7FFEB", popularity: 3, label: "Teal A100" },
  { value: "#64FFDA", popularity: 3, label: "Teal A200" },
  { value: "#1DE9B6", popularity: 3, label: "Teal A400" },
  { value: "#00BFA5", popularity: 3, label: "Teal A700" },
  { value: "#DCEDC8", popularity: 3, label: "Light Green 100" },
  { value: "#C5E1A5", popularity: 3, label: "Light Green 200" },
  { value: "#AED581", popularity: 3, label: "Light Green 300" },
  { value: "#9CCC65", popularity: 3, label: "Light Green 400" },
  { value: "#8BC34A", popularity: 3, label: "Light Green 500" },
  { value: "#7CB342", popularity: 3, label: "Light Green 600" },
  { value: "#689F38", popularity: 3, label: "Light Green 700" },
  { value: "#558B2F", popularity: 3, label: "Light Green 800" },
  { value: "#33691E", popularity: 3, label: "Light Green 900" },
  { value: "#CCFF90", popularity: 3, label: "Light Green A100" },
  { value: "#B2FF59", popularity: 3, label: "Light Green A200" },
  { value: "#76FF03", popularity: 3, label: "Light Green A400" },
  { value: "#64DD17", popularity: 3, label: "Light Green A700" },
  { value: "#F0F4C3", popularity: 3, label: "Lime 100" },
  { value: "#E6EE9C", popularity: 3, label: "Lime 200" },
  { value: "#DCE775", popularity: 3, label: "Lime 300" },
  { value: "#D4E157", popularity: 3, label: "Lime 400" },
  { value: "#CDDC39", popularity: 3, label: "Lime 500" },
  { value: "#C0CA33", popularity: 3, label: "Lime 600" },
  { value: "#AFB42B", popularity: 3, label: "Lime 700" },
  { value: "#9E9D24", popularity: 3, label: "Lime 800" },
  { value: "#827717", popularity: 3, label: "Lime 900" },
  { value: "#F4FF81", popularity: 3, label: "Lime A100" },
  { value: "#EEFF41", popularity: 3, label: "Lime A200" },
  { value: "#C6FF00", popularity: 3, label: "Lime A400" },
  { value: "#AEEA00", popularity: 3, label: "Lime A700" },
  { value: "#FFF9C4", popularity: 3, label: "Yellow 100" },
  { value: "#FFF59D", popularity: 3, label: "Yellow 200" },
  { value: "#FFF176", popularity: 3, label: "Yellow 300" },
  { value: "#FFEE58", popularity: 3, label: "Yellow 400" },
  { value: "#FFEB3B", popularity: 3, label: "Yellow 500" },
  { value: "#FDD835", popularity: 3, label: "Yellow 600" },
  { value: "#FBC02D", popularity: 3, label: "Yellow 700" },
  { value: "#F9A825", popularity: 3, label: "Yellow 800" },
  { value: "#F57F17", popularity: 3, label: "Yellow 900" },
  { value: "#FFFF8D", popularity: 3, label: "Yellow A100" },
  { value: "#FFFF00", popularity: 3, label: "Yellow A200" },
  { value: "#FFEA00", popularity: 3, label: "Yellow A400" },
  { value: "#FFD600", popularity: 3, label: "Yellow A700" },
  { value: "#FFECB3", popularity: 3, label: "Amber 100" },
  { value: "#FFE082", popularity: 3, label: "Amber 200" },
  { value: "#FFD54F", popularity: 3, label: "Amber 300" },
  { value: "#FFCA28", popularity: 3, label: "Amber 400" },
  { value: "#FFC107", popularity: 3, label: "Amber 500" },
  { value: "#FFB300", popularity: 3, label: "Amber 600" },
  { value: "#FFA000", popularity: 3, label: "Amber 700" },
  { value: "#FF8F00", popularity: 3, label: "Amber 800" },
  { value: "#FF6F00", popularity: 3, label: "Amber 900" },
  { value: "#FFE57F", popularity: 3, label: "Amber A100" },
  { value: "#FFD740", popularity: 3, label: "Amber A200" },
  { value: "#FFC400", popularity: 3, label: "Amber A400" },
  { value: "#FFAB00", popularity: 3, label: "Amber A700" },
  { value: "#FFE0B2", popularity: 3, label: "Orange 100" },
  { value: "#FFCC80", popularity: 3, label: "Orange 200" },
  { value: "#FFB74D", popularity: 3, label: "Orange 300" },
  { value: "#FFA726", popularity: 3, label: "Orange 400" },
  { value: "#FF9800", popularity: 3, label: "Orange 500" },
  { value: "#FB8C00", popularity: 3, label: "Orange 600" },
  { value: "#F57C00", popularity: 3, label: "Orange 700" },
  { value: "#EF6C00", popularity: 3, label: "Orange 800" },
  { value: "#E65100", popularity: 3, label: "Orange 900" },
  { value: "#FFD180", popularity: 3, label: "Orange A100" },
  { value: "#FFAB40", popularity: 3, label: "Orange A200" },
  { value: "#FF9100", popularity: 3, label: "Orange A400" },
  { value: "#FF6D00", popularity: 3, label: "Orange A700" },
  { value: "#FFCCBC", popularity: 3, label: "Deep Orange 100" },
  { value: "#FFAB91", popularity: 3, label: "Deep Orange 200" },
  { value: "#FF8A65", popularity: 3, label: "Deep Orange 300" },
  { value: "#FF7043", popularity: 3, label: "Deep Orange 400" },
  { value: "#FF5722", popularity: 3, label: "Deep Orange 500" },
  { value: "#F4511E", popularity: 3, label: "Deep Orange 600" },
  { value: "#E64A19", popularity: 3, label: "Deep Orange 700" },
  { value: "#D84315", popularity: 3, label: "Deep Orange 800" },
  { value: "#BF360C", popularity: 3, label: "Deep Orange 900" },
  { value: "#FF9E80", popularity: 3, label: "Deep Orange A100" },
  { value: "#FF6E40", popularity: 3, label: "Deep Orange A200" },
  { value: "#FF3D00", popularity: 3, label: "Deep Orange A400" },
  { value: "#DD2C00", popularity: 3, label: "Deep Orange A700" },
  { value: "#D7CCC8", popularity: 3, label: "Brown 100" },
  { value: "#BCAAA4", popularity: 3, label: "Brown 200" },
  { value: "#A1887F", popularity: 3, label: "Brown 300" },
  { value: "#8D6E63", popularity: 3, label: "Brown 400" },
  { value: "#795548", popularity: 3, label: "Brown 500" },
  { value: "#6D4C41", popularity: 3, label: "Brown 600" },
  { value: "#5D4037", popularity: 3, label: "Brown 700" },
  { value: "#4E342E", popularity: 3, label: "Brown 800" },
  { value: "#3E2723", popularity: 3, label: "Brown 900" },
  { value: "#F5F5F5", popularity: 3, label: "Grey 100" },
  { value: "#EEEEEE", popularity: 3, label: "Grey 200" },
  { value: "#E0E0E0", popularity: 3, label: "Grey 300" },
  { value: "#BDBDBD", popularity: 3, label: "Grey 400" },
  { value: "#9E9E9E", popularity: 3, label: "Grey 500" },
  { value: "#757575", popularity: 3, label: "Grey 600" },
  { value: "#616161", popularity: 3, label: "Grey 700" },
  { value: "#424242", popularity: 3, label: "Grey 800" },
  { value: "#212121", popularity: 3, label: "Grey 900" },
  { value: "#CFD8DC", popularity: 3, label: "Blue Grey 100" },
  { value: "#B0BEC5", popularity: 3, label: "Blue Grey 200" },
  { value: "#90A4AE", popularity: 3, label: "Blue Grey 300" },
  { value: "#78909C", popularity: 3, label: "Blue Grey 400" },
  { value: "#607D8B", popularity: 3, label: "Blue Grey 500" },
  { value: "#546E7A", popularity: 3, label: "Blue Grey 600" },
  { value: "#455A64", popularity: 3, label: "Blue Grey 700" },
  { value: "#37474F", popularity: 3, label: "Blue Grey 800" },
  { value: "#263238", popularity: 3, label: "Blue Grey 900" },
];

// const ProcessedColors = PreparedColors.map((c) => annotateColor(c));
export const ProcessedColors = TestColors.map((c) => annotateColor(c));

export const Picker = (props) => {
  const [sortBy, setSortBy] = useState("lightness");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showAlt, setShowAlt] = useState(false);

  // filtering by hue
  const [minHue, setMinHue] = useState(40);
  const [maxHue, setMaxHue] = useState(70);

  const [filterByHue, setFilterByHue] = useState(true);
  const [filterByLabel, setFilterByLabel] = useState(false);

  // filtering by string
  const [filterLabel, setFilterLabel] = useState("");

  const handleEdit = (event) => {
    setFilterLabel(event.target.value);
    if (event.target.value !== "") {
      setFilterByHue(false);
      setFilterByLabel(true);
      console.log("filtering for", event.target.value);
    } else {
      setFilterByHue(true);
      setFilterByLabel(false);
      console.log("no longer filtering");
    }
  };

  const toggleSortOrder = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    }
    if (sortOrder === "desc") {
      setSortOrder("asc");
    }
  };
  const toggleSortBy = () => {
    if (sortBy === "hue") {
      setSortBy("lightness");
    }
    if (sortBy === "lightness") {
      setSortBy("hue");
    }
  };

  const toggleShowAlt = () => {
    setShowAlt(!showAlt);
  };

  const fnUpdateHueFilter = (minHue, maxHue) => {
    setMinHue(minHue);
    setMaxHue(maxHue);
    setFilterByHue(true);
    setFilterByLabel(false);
    setFilterLabel("");
  };

  return (
    <div
      style={{
        background: "white",
        boxShadow: "0px 2px 5px 0px #00000044",
        width: 250,
        borderRadius: 8,
      }}
    >
      <Tooltip id="my-tooltip" />
      <Row
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 20px 20px",
          minHeight: 40,
          padding: "0px 8px",
          fontWeight: "600",
        }}
      >
        <div style={{ flexGrow: 1 }}>Picker</div>

        <div
          style={{
            width: 20,
            height: 20,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={toggleSortOrder}
        >
          {sortOrder === "asc" ? "↑" : "↓"}
        </div>
        <div
          style={{
            width: 20,
            height: 20,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={toggleShowAlt}
        >
          {showAlt ? "Alt" : "Norm"}
        </div>
      </Row>
      <Row>
        <InteractiveHueRangeSelector
          fnUpdateHueFilter={fnUpdateHueFilter}
          filterByHue={filterByHue}
        />
      </Row>
      <Row style={{ display: "grid", gridTemplateColumns: "1fr", height: 40 }}>
        <input
          onInput={handleEdit}
          placeholder="Type to filter"
          css={{ padding: 8, border: 0, outline: "none" }}
        />
      </Row>

      <Col>
        {props.colors
          .filter(({ label }) =>
            filterByLabel ? label.includes(filterLabel) : true
          )
          .filter(({ hue }) =>
            filterByHue ? hue >= minHue && hue <= maxHue : true
          )
          .sort(returnComparisonFn(sortBy, sortOrder))
          .map((x) => (
            <div
              css={{
                gap: 8,
                paddingLeft: 8,
                paddingRight: 8,
                minHeight: 33,
                display: "grid",
                gridTemplateColumns: "30px 1fr 20px min-content ",
                alignItems: "center",
                cursor: "pointer",
                "&:hover": {
                  background: "#007aff",
                  color: "white",
                },
              }}
            >
              <span data-tooltip-id="my-tooltip" data-tooltip-content={x.value}>
                <Swatch
                  color={x.value}
                  beyondSRGB={x.inGamut}
                  drawOutline={x.drawOutlineOnWhite}
                />
              </span>
              <div>
                {!showAlt ? (
                  <span>
                    {x.label}
                    <span style={{ opacity: 0.5 }}>
                      {x.alpha < 1 ? ` ${(x.alpha * 100).toFixed(0)}%` : null}
                    </span>
                  </span>
                ) : (
                  <div>{assignLabel(x, AnnotatedReferenceColors)}</div>
                )}
              </div>

              <PopularityIndicator popularity={x.popularity} />

              <div style={{ opacity: 0.5 }}>
                {(x.lightness * 100).toFixed(0)}
              </div>
            </div>
          ))}
      </Col>
      <div
        style={{
          marginTop: 8,
          padding: "4px 8px",
          borderTop: "1px solid #00000022",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
        }}
      ></div>
    </div>
  );
};

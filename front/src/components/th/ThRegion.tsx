/* eslint-disable react/react-in-jsx-scope */

export default function ThRegion(subContinent: string) {
  let continentParam = '';
  if (subContinent.subContinent !== undefined) {
    continentParam = subContinent.subContinent.toLowerCase();
  } else if (subContinent === undefined) {
    console.log('aki');
  }
  let backgroundColorDiv = '';

  if (continentParam === 'caribbean') {
    backgroundColorDiv = '#59ad59';
  } else if (continentParam === 'south america') {
    backgroundColorDiv = '#0f430f';
  } else if (continentParam === 'central america') {
    backgroundColorDiv = '##208120';
  } else if (continentParam === 'north america') {
    backgroundColorDiv = '#61c161';
  } else if (continentParam === 'southeast europe') {
    backgroundColorDiv = '#836183';
  } else if (continentParam === 'southern europe') {
    backgroundColorDiv = '#d566d5';
  } else if (continentParam === 'central europe') {
    backgroundColorDiv = '#511551';
  } else if (continentParam === 'eastern europe') {
    backgroundColorDiv = '#3f063f';
  } else if (continentParam === 'western europe') {
    backgroundColorDiv = '#9f099f';
  } else if (continentParam === 'northern europe') {
    backgroundColorDiv = '#bb15bb';
  } else if (continentParam === 'southern asia') {
    backgroundColorDiv = '#737edb';
  } else if (continentParam === 'western asia') {
    backgroundColorDiv = '#182ee1';
  } else if (continentParam === 'south-eastern asia') {
    backgroundColorDiv = '#031499';
  } else if (continentParam === 'central asia') {
    backgroundColorDiv = '#3d3de5';
  } else if (continentParam === 'eastern asia') {
    backgroundColorDiv = '#3d3de5';
  } else if (continentParam === 'eastern africa') {
    backgroundColorDiv = '#9d2d2d';
  } else if (continentParam === 'western africa') {
    backgroundColorDiv = '#9f0909';
  } else if (continentParam === 'middle africa') {
    backgroundColorDiv = '#f32f2f';
  } else if (continentParam === 'northern africa') {
    backgroundColorDiv = '#976161';
  } else if (continentParam === 'southern africa') {
    backgroundColorDiv = '#8d2d2d';
  } else if (continentParam === 'polynesia') {
    backgroundColorDiv = '#737306';
  } else if (continentParam === 'australia and new zealand') {
    backgroundColorDiv = '#b7b750';
  } else if (continentParam === 'melanesia') {
    backgroundColorDiv = '#e1e141';
  } else if (continentParam === 'micronesia') {
    backgroundColorDiv = '#e1e141';
  }

  return (
    <th style={{ backgroundColor: backgroundColorDiv, color: 'black' }}>
      {subContinent.subContinent}
    </th>
  );
}

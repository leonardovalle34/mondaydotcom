/* eslint-disable react/react-in-jsx-scope */
export default function Th(continent: string) {
  const continentParam = continent.continent.toLocaleLowerCase();
  let backgroundColorDiv = '';

  if (continentParam === 'asia') {
    backgroundColorDiv = '#343495';
  } else if (continentParam === 'americas') {
    backgroundColorDiv = '#4ed74e';
  } else if (continentParam === 'africa') {
    backgroundColorDiv = '#c55a5a';
  } else if (continentParam === 'europe') {
    backgroundColorDiv = '#e767e7';
  } else if (continentParam === 'oceania') {
    backgroundColorDiv = '#d5d542';
  }

  return (
    <th style={{ backgroundColor: backgroundColorDiv, color: 'black' }}>{continent.continent}</th>
  );
}

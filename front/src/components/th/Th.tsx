/* eslint-disable react/react-in-jsx-scope */
export default function Th(continent: string) {
  const continentParam = continent.continent.toLocaleLowerCase();
  let backgroundColorDiv = '';

  if (continentParam === 'asia') {
    backgroundColorDiv = 'blue';
  } else if (continentParam === 'americas') {
    backgroundColorDiv = 'green';
  } else if (continentParam === 'africa') {
    backgroundColorDiv = 'red';
  } else if (continentParam === 'europe') {
    backgroundColorDiv = 'purple';
  } else if (continentParam === 'oceania') {
    backgroundColorDiv = 'yellow';
  }

  return (
    <th style={{ backgroundColor: backgroundColorDiv, color: 'black' }}>{continent.continent}</th>
  );
}

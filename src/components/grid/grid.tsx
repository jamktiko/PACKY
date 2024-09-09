import React from 'react';
import GridButton from '../buttons/GridButton';
let length = 81;
//functional component grid, creating an array with 9x9 buttons
const Grid: React.FC = () => {
  const cells = Array.from({ length }, (_, i) => {
    let initialColor = 'bg-blue-500';
    let initialText = 'Inactive';

    // Check if the button is the 40th one and set its initial state accordingly
    if (i === (length - 1) / 2) {
      initialColor = 'bg-yellow-500';
      initialText = 'Choosable';
    }

    return (
      <GridButton
        key={i}
        onClick={() => console.log(i - 9, i - 1, i, i + 1, i + 9)}
        initialColor={initialColor}
        initialText={initialText}
      >
        {i}
      </GridButton>
    );
  });
  /*
    <GridButton
      key={i}
      onClick={() => console.log(i - 9, i - 1, i, i + 1, i + 9)}
      //näyttää ne mitkä pitäisi vaihtaa väriä
      //tarvitsee oman deactivointi funktion
      //ja jonkin systeemin ettei useampi activoidu choosabeleista

      //mahollisesti niin että se kerää ympärillä olevat arrayhyn ja käy ne läpi
      //ja muuttaa ne niiden tilojen mukaan inactivesta choosable jne
      //ongelma: reuninmaiset osat niillä ei ole päällinmäistä/alempaa tai viereistä
    >
      {i}
    </GridButton>
  });
*/
  return <div className="grid grid-cols-9 gap-4">{cells}</div>;
};

export default Grid;

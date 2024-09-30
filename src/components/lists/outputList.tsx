import React from 'react';
interface LabelTypes {
  [key: string]: string[];
}
const OutputList = ({ labelTypes }: { labelTypes: LabelTypes }) => {
  const keyMapping: { [key: string]: string } = {
    frontendFramework: 'frontendFramework',
    backendFramework: 'backendFramework',
    api: 'api',
    database: 'database',
    Language: 'Language',
    library: 'library',
    service: 'service',
  };
  return (
    <div>
      <h3>
        Here are the technologies that will help you achieve these selected
        features
      </h3>
      <br></br>
      <div>
        {Object.entries(labelTypes).map(([key, value]) => {
          const techType = keyMapping[key];
          if (techType) {
            const techs = value.join(' | ');
            let sentence = '';

            if (techType === 'frontendFramework') {
              sentence = `For the frontend, we recommend these frameworks:  ${techs}.`;
            } else if (techType === 'backendFramework') {
              sentence = `We suggest using this framework for the backend: ${techs}.`;
            } else if (techType === 'api') {
              sentence = `For this feature, consider these API's: ${techs}.`;
            } else if (techType === 'database') {
              sentence = `As for the database, we recommend: ${techs}.`;
            } else if (techType === 'Language') {
              sentence = `You might find these languages useful: ${techs}.`;
            } else if (techType === 'library') {
              sentence = `These libraries could be beneficial for your project: ${techs}.`;
            } else if (techType === 'service') {
              sentence = `We recommend these services: ${techs}.`;
            }

            return (
              <div key={key}>
                <p>{sentence}</p>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default OutputList;

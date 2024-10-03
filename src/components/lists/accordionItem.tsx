import React, { useState } from 'react';

// Define the AccordionProps interface with two properties
interface AccordionProps {
  title: string;
  description: { [key: string]: string[] };
}

export const AccordionItem = ({ title, description }: AccordionProps) => {
  console.log('description:', description);
  // Initialize the isOpen state variable to false
  const [isOpen, setIsOpen] = useState(false);
  // Define the handleToggle function to toggle the isOpen state variable
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Define the descriptionText variable by transforming the description object into a string
  const descriptionText = description
    ? Object.entries(description)
        .map(([key, value]) => {
          const techs = value.join(' | ');
          let sentence = '';
          switch (key) {
            case 'frontendFramework':
              sentence = `For the frontend, we recommend these frameworks:  ${techs}.`;
              break;
            case 'backendFramework':
              sentence = `We suggest using this framework for the backend: ${techs}.`;
              break;
            case 'api':
              sentence = `For this feature, consider these API's: ${techs}.`;
              break;
            case 'library':
              sentence = `You might find these libraries useful: ${techs}.`;
              break;
            case 'service':
              sentence = `We suggest using these services: ${techs}.`;
              break;
            case 'database':
              sentence = `We suggest using these databases: ${techs}.`;
              break;
            case 'Language':
              sentence = `For this feature, consider these languages: ${techs}.`;
              break;
          }
          return sentence;
        })
        .filter(Boolean) // Filter out any falsey values
        .join(' ') // Join the sentences into a single string
    : '';

  return (
    <div className="bg-slate-500 px-6 bg-opacity-50 w-96 border rounded-xl">
      <button className="w-full flex justify-between" onClick={handleToggle}>
        <p>{title}</p>
        <p className="bg-slate-900 w-10 h-full rounded-xl">
          {isOpen ? '-' : '+'}
        </p>
      </button>
      {isOpen && <div className="text-base text-left">{descriptionText}</div>}
    </div>
  );
};

import { useEffect, useState } from 'react';
import { getTechsForFeature } from '@/utils/neo4j/neo4j';
import { RecordShape } from 'neo4j-driver';

interface Feature {
  row: number;
  col: number;
  item: { name: string; desc: string }[];
  id?: string;
}
// Interfaces for Tech and Feature
interface Tech {
  name: string;
  type: string[];
}

export const useOutputFetch = (features: Feature[], outputModal: boolean) => {
  // Initialize the labelTypes state variable as an empty array of objects
  // with string keys and string array values
  const [labelTypes, setLabelTypes] = useState<{ [key: string]: string[] }[]>(
    []
  );
  useEffect(() => {
    // Define the fetchTechnologies function to fetch technologies for each feature
    const fetchTechnologies = async () => {
      //Checking if outputModal is true
      if (outputModal) {
        // Use Promise.all to wait for all promises to resolve
        const newLabelTypes = await Promise.all(
          // Map over the features array and call the getTechsForFeature function for each feature
          features.map(async (feature: Feature) => {
            // Call the getTechsForFeature function and wait for the result
            const techs = await getTechsForFeature(feature.item[0].name);
            // If the result is null or undefined, return an empty object
            if (!techs) {
              return {};
            }
            // Using reduce to group the technologies by type
            const types = techs.reduce(
              (categories: { [key: string]: string[] }, tech: RecordShape) => {
                // For each type in the tech object, add the tech name to the corresponding category in the categories object
                (tech as Tech).type.forEach((type: string) => {
                  // If the category doesn't exist yet, create it
                  categories[type] = categories[type] || [];
                  // Add the tech name to the category
                  categories[type].push((tech as Tech).name);
                });
                console.log(categories);
                return categories;
              },
              {}
            );
            console.log(types);
            return types;
          })
        );
        setLabelTypes(newLabelTypes);
      }
    };
    // Call the fetchTechnologies function when the component mounts or updates
    if (outputModal) {
      fetchTechnologies();
    }
  }, [features, outputModal]);

  return { labelTypes };
};

import { useCallback, useEffect, useState } from 'react';
import { getTechs } from '@/utils/neo4j/neo4j';

export const useOutputFetch = (features: any, outputModal: any) => {
  // Define state variables for technologies and label types
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [labelTypes, setLabelTypes] = useState<{ [key: string]: string[] }>({});

  // Define a callback funtion to fetch technologies
  const fetchTechnologies = useCallback(async () => {
    // if the outputModal is open, fetch techs
    if (outputModal) {
      // Get the names of the features
      const featureNames = features.map(
        (feature: { name: any }) => feature.name
      );
      // Fetch technologies for the features
      const techs = await getTechs(featureNames);
      // Extract the names of the technologies
      const technologies = techs.map((tech) => tech.name);
      // Reduce the technologies into a map of label types to technology names
      const types = techs.reduce((categories, tech) => {
        // For each type of the technology, add it to the categories map
        tech.type.forEach((type: any) => {
          if (!categories[type]) {
            categories[type] = [];
          }
          categories[type].push(tech.name);
        });
        return categories;
      }, {});
      // Update the state with the technologies and label types
      setTechnologies(technologies);
      setLabelTypes(types);
    }
  }, [features, outputModal]);
  // When the output modal or features change, fetch technologies
  useEffect(() => {
    if (outputModal) {
      fetchTechnologies();
    }
  }, [fetchTechnologies, outputModal]);
  // Return the technologies and label types
  return { labelTypes };
};

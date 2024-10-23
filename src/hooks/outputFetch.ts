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
  const [labelTypes, setLabelTypes] = useState<{ [key: string]: string[] }[]>(
    []
  );

  useEffect(() => {
    const fetchTechnologies = async () => {
      if (!outputModal) return; // Exit early if modal is not active

      const newLabelTypes = await Promise.all(
        features.map(async (feature: Feature) => {
          const techs = await getTechsForFeature(feature.item[0].name);
          if (!techs || !Array.isArray(techs) || techs.length === 0) {
            return {}; // Return empty object for invalid or empty results
          }

          // Grouping technologies by their categories
          const types = techs.reduce(
            (categories: { [key: string]: string[] }, tech: RecordShape) => {
              const techCategories = tech.technologyCategory; // Adjusted to use technologyCategory
              techCategories.forEach((category: string) => {
                categories[category] = categories[category] || [];
                categories[category].push(tech.technology); // Add technology name under the category
              });
              console.log(categories);
              return categories;
            },
            {}
          );
          return types;
        })
      );

      setLabelTypes(newLabelTypes);
    };

    fetchTechnologies(); // Fetch only if outputModal is true
  }, [features, outputModal]);

  return { labelTypes };
};

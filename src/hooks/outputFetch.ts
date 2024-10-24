import { useEffect, useState } from 'react';
import { getTechsForFeature } from '@/utils/neo4j/neo4j';

// Define the interface for the Feature object
interface Feature {
  row: number;
  col: number;
  item: { name: string; desc: string }[];
  id?: string;
}

export const useOutputFetch = (features: Feature[], outputModal: boolean) => {
  const [labelTypes, setLabelTypes] = useState<{ [key: string]: any[] }[]>([]);

  useEffect(() => {
    const fetchTechnologies = async () => {
      // If output modal is not active, exit the function
      if (!outputModal) return;
      // Fetching technologies for each feature and then flatten the results.
      const allTechs = await Promise.all(
        features.map(async (feature: Feature) => {
          const techs = await getTechsForFeature(feature.item[0].name);
          return techs || [];
        })
      );

      // Flatten the results into a single array
      const combinedTechs = allTechs.flat();

      // Calculate total weight for each technology across all features
      const techWeights: { [technology: string]: number } = {};
      combinedTechs.forEach((tech) => {
        const techName = tech.technology;
        techWeights[techName] = (techWeights[techName] || 0) + tech.totalScore;
      });

      // Create an array of technologies with their total weights
      const techsWithWeights: {
        technology: string;
        totalWeight: number;
        technologyCategory: string[];
      }[] = combinedTechs.map((tech) => ({
        technology: tech.technology,
        totalWeight: techWeights[tech.technology],
        technologyCategory: tech.technologyCategory,
      }));

      // Sort technologies by total weight in descending order
      techsWithWeights.sort((a, b) => b.totalWeight - a.totalWeight);

      // Group technologies by technology category (labels)
      const groups: { [key: string]: any[] }[] = [{}, {}, {}];
      let currentGroup = 0;

      // Create a Set to keep track of used categories in each group
      const usedCategoriesInGroups: { [key: string]: boolean }[] = [{}, {}, {}];

      // Distribute technologies across groups, ensuring one tech per category per group
      techsWithWeights.forEach((tech) => {
        const category = tech.technologyCategory[0];

        let added = false;
        for (let i = 0; i < groups.length; i++) {
          const groupIndex = (currentGroup + i) % groups.length; // Cycle through groups
          if (!usedCategoriesInGroups[groupIndex][category]) {
            groups[groupIndex][category] = (
              groups[groupIndex][category] || []
            ).concat(tech);
            usedCategoriesInGroups[groupIndex][category] = true;
            added = true;
            break;
          }
        }

        if (added) {
          currentGroup = (currentGroup + 1) % groups.length; // Move to the next group
        }
      });

      setLabelTypes(groups);
    };
    // Call the fetchTechnologies function
    fetchTechnologies();
  }, [features, outputModal]);

  // finally returning the labelTypes
  return { labelTypes };
};

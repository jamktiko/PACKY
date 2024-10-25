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
  // Initialize state to store grouped technologies
  // The state will contain three arrays
  // Each array contains objects grouping technologies by category
  const [technologyGroups, setTechnologyGroups] = useState<
    { [key: string]: any[] }[]
  >([]);

  useEffect(() => {
    // defining async function to fetch  technologies
    const fetchTechnologies = async () => {
      // If 'outputModal' is false, exit early without fetching
      if (!outputModal) return;

      // Promise.all takes an array of promises and waits for all of them to complete
      const allTechs = await Promise.all(
        // create an array of promises
        features.map(async (feature: Feature) => {
          // Getting techs for each feature
          // feature.item[0].name is the name of the feature
          // getTechsForFeature makes call to get the techs for feature
          // await waits for the API response
          const techs = await getTechsForFeature(feature.item[0].name);
          return techs || [];
          // If techs is null/undefined, return empty array instead
          // This prevents errors in later processing
        })
      );

      // Flatten the nested arrays into a single array of technolgies
      const combinedTechs = allTechs.flat();

      // Create an object to store the total weight of each technology
      const techWeights: { [technology: string]: number } = {};

      // Looping through the flattened array of technologies
      combinedTechs.forEach((tech) => {
        // Getting the technology name
        const techName = tech.technology;
        // Adding weight to any existing weight
        // If "React" appears multiple times, add up all its scores
        techWeights[techName] = (techWeights[techName] || 0) + tech.totalScore;
      });

      // Defining the type for the array of technology objects
      const techsWithWeights: {
        technology: string;
        totalWeight: number;
        technologyCategory: string[];
      }[] =
        // Mapping through the array of technologies
        combinedTechs.map((tech) => ({
          technology: tech.technology,
          totalWeight: techWeights[tech.technology],
          technologyCategory: tech.technologyCategory,
        }));

      // Sort the array by weight in descending order (highest to lowest)
      techsWithWeights.sort((a, b) => b.totalWeight - a.totalWeight);

      // Calculate size of each group (dividing into thirds)
      const groupSize = Math.ceil(techsWithWeights.length / 3);
      // Split sorted technologies into three groups based on weight
      const highestWeightGroup = techsWithWeights.slice(0, groupSize);
      const mediumWeightGroup = techsWithWeights.slice(
        groupSize,
        groupSize * 2
      );
      const lowestWeightGroup = techsWithWeights.slice(groupSize * 2);

      // function to group technologies by their category
      const groupByCategory = (
        techGroup: {
          technology: string;
          totalWeight: number;
          technologyCategory: string[];
        }[]
      ) => {
        // Reduce array into object grouped by category
        return techGroup.reduce((acc: { [key: string]: any[] }, tech) => {
          const category = tech.technologyCategory[0];
          if (!acc[category]) {
            acc[category] = []; // Initialize category array if it doesn't exist
          }
          acc[category].push(tech); // Add technology to its category array
          console.log(acc);
          return acc;
        }, {});
      };
      // Update state with all three groups
      setTechnologyGroups([
        groupByCategory(highestWeightGroup),
        groupByCategory(mediumWeightGroup),
        groupByCategory(lowestWeightGroup),
      ]);
    };

    fetchTechnologies();
  }, [features, outputModal]);

  return { technologyGroups };
};

export default useOutputFetch;

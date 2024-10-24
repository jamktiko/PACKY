import { useEffect, useState } from 'react';
import { getTechsForFeature } from '@/utils/neo4j/neo4j';

// Define the interface for the Feature object
interface Feature {
  row: number;
  col: number;
  item: { name: string; desc: string }[];
  id?: string;
}

// The custom hook to fetch and categorize technologies based on the selected features
export const useOutputFetch = (features: Feature[], outputModal: boolean) => {
  // State to store the grouped technologies (3 arrays for 3 sliders)
  const [technologyGroups, setTechnologyGroups] = useState<
    { [key: string]: any[] }[] // Array of objects representing the three groups (highest, medium, lowest weights)
  >([]);

  // useEffect hook runs when 'features' or 'outputModal' change
  useEffect(() => {
    // Asynchronous function to fetch and process the technologies for each feature
    const fetchTechnologies = async () => {
      // If 'outputModal' is false, exit early without fetching
      if (!outputModal) return;

      // Fetch the technologies for each feature using 'Promise.all' to run all fetches concurrently
      const allTechs = await Promise.all(
        features.map(async (feature: Feature) => {
          // Fetch technologies related to the feature based on its name
          const techs = await getTechsForFeature(feature.item[0].name);
          return techs || []; // If no technologies are returned, fallback to an empty array
        })
      );

      // Flatten the array of arrays (each feature's technologies) into a single array of technologies
      const combinedTechs = allTechs.flat();

      // Create an object to hold the cumulative total weight (score) for each technology
      const techWeights: { [technology: string]: number } = {};

      // Loop through all the combined technologies and accumulate their total weight
      combinedTechs.forEach((tech) => {
        const techName = tech.technology; // Get the technology name
        // Add or update the total score for each technology (cumulative if the tech is found multiple times)
        techWeights[techName] = (techWeights[techName] || 0) + tech.totalScore;
      });

      // Create an array of technologies that includes their total weight and technology category
      const techsWithWeights: {
        technology: string; // Technology name
        totalWeight: number; // Total weight (cumulative score across features)
        technologyCategory: string[]; // Array of categories (e.g., frontend, backend)
      }[] = combinedTechs.map((tech) => ({
        technology: tech.technology, // Set the technology name
        totalWeight: techWeights[tech.technology], // Set the cumulative total weight of the technology
        technologyCategory: tech.technologyCategory, // Set the categories this technology belongs to
      }));

      // Sort the array of technologies by their total weight in descending order (highest first)
      techsWithWeights.sort((a, b) => b.totalWeight - a.totalWeight);

      // Divide the sorted technologies into three groups based on weight rank
      const groupSize = Math.ceil(techsWithWeights.length / 3); // Divide equally into 3 parts

      // Split the sorted array into three arrays for the sliders
      const highestWeightGroup = techsWithWeights.slice(0, groupSize); // First third (highest weights)
      const mediumWeightGroup = techsWithWeights.slice(
        groupSize,
        groupSize * 2
      ); // Second third (medium weights)
      const lowestWeightGroup = techsWithWeights.slice(groupSize * 2); // Last third (lowest weights)

      const groupByCategory = (
        techGroup: {
          technology: string;
          totalWeight: number;
          technologyCategory: string[];
        }[]
      ) => {
        return techGroup.reduce((acc: { [key: string]: any[] }, tech) => {
          const category = tech.technologyCategory[0]; // Using the first category
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(tech);
          return acc;
        }, {});
      };

      setTechnologyGroups([
        groupByCategory(highestWeightGroup),
        groupByCategory(mediumWeightGroup),
        groupByCategory(lowestWeightGroup),
      ]);
    };

    // Call the async function to fetch and process the technologies
    fetchTechnologies();

    // This useEffect runs whenever 'features' or 'outputModal' changes
  }, [features, outputModal]);

  // Return the grouped technologies for use in components
  return { technologyGroups };
};

export default useOutputFetch;

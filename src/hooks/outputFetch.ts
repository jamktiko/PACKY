import { useEffect, useState } from 'react';
import { getTechsForFeature } from '@/utils/neo4j/neo4j';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

// Define the interface for the Feature object
interface Feature {
  row: number;
  col: number;
  item: { name: string; desc: string }[];
  id?: string;
}

export const useOutputFetch = (features: Feature[], outputModal: boolean) => {
  // State to store technology groups, initialized as an empty array
  // Each group will contain technologies categorized by their type
  const [technologyGroups, setTechnologyGroups] = useState<
    { [key: string]: any[] }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const techsAndWeights = useSelector(
    (state: RootState) => state.libraryDataReducer.value
  );
  console.log(techsAndWeights);
  useEffect(() => {
    const fetchTechnologies = async () => {
      // Early return if outputModal is false - prevents unnecessary fetching
      if (!outputModal) return;

      setIsLoading(true);

      // Fetch technologies for each feature in parallel using Promise.all
      const allTechs = await Promise.all(
        // create an array of promises
        features.map(async (feature: Feature) => {
          const techs = await getTechsForFeature(feature.item[0].name);
          return techs || []; // Return empty array if no techs found
        })
      );

      // Combine all technology arrays into a single flat array
      const combinedTechs = allTechs.flat();

      // Create object to track total weight for each technology
      const techWeights: { [technology: string]: number } = {};

      // Calculate total weight for each technology by summing their scores
      combinedTechs.forEach((tech) => {
        const techName = tech.technology;
        techWeights[techName] = (techWeights[techName] || 0) + tech.totalScore;
      });

      // Create new array with technologies and their total weights
      // uses techsAndWeights from store to retrieve the weight for each technology
      const techsWithWeights: {
        technology: string;
        totalWeight: number;
        technologyCategory: string[];
      }[] = combinedTechs.map((tech) => ({
        technology: tech.technology,
        totalWeight:
          techsAndWeights.find((t) => t.name === tech.technology)?.weights[0]
            .weight || 0,
        technologyCategory: tech.technologyCategory,
      }));

      // Sort the array by weight in descending order (highest to lowest)
      techsWithWeights.sort((a, b) => b.totalWeight - a.totalWeight);

      // Calculate the size of one group
      // by dividing the length of the array by 3
      // Using Math.ceil to round up, so all tech's fit into groups
      const groupSize = Math.ceil(techsWithWeights.length / 3);

      //Group with highest weights
      // taking the first groupSize elements, so the first techs
      const highestWeightGroup = techsWithWeights.slice(0, groupSize);

      // Second highest weight group
      // slice(groupSize, groupSize * 2) takes elements from index groupSize to (groupSize * 2)
      const mediumWeightGroup = techsWithWeights.slice(
        groupSize,
        groupSize * 2
      );
      // Lowest weight group, take the remaining technologies
      // slice(groupSize * 2) takes all elements from index (groupSize * 2)
      //to the end of the array
      const lowestWeightGroup = techsWithWeights.slice(groupSize * 2);

      // Helper function to group technologies by their category
      const groupByCategory = (
        techGroup: {
          technology: string;
          totalWeight: number;
          technologyCategory: string[];
        }[]
      ) => {
        // Categories where only one technology item should be assigned per category
        const singleSelectCategories = [
          'backendFramework',
          'frontendFramework',
          'Language',
          'Database',
        ];

        // Reduce iterates over each item in the techGroup arry and
        // builds an object that groups technologies by their category
        return techGroup.reduce((acc: { [key: string]: any[] }, tech) => {
          const category = tech.technologyCategory[0];
          // Check if the category is in the single-select list
          acc[category] = singleSelectCategories.includes(category)
            ? acc[category] || [tech] // Single-select
            : (acc[category] || []).concat(tech); // not in singleselectCategory

          return acc; // returning the accumulator
        }, {});
      };

      // Update state with all three groups after categorizing them
      setTechnologyGroups([
        groupByCategory(highestWeightGroup),
        groupByCategory(mediumWeightGroup),
        groupByCategory(lowestWeightGroup),
      ]);
      setIsLoading(false);
    };

    fetchTechnologies();
  }, [features, outputModal, techsAndWeights]);

  return { technologyGroups, isLoading };
};

export default useOutputFetch;

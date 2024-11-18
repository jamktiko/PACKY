import { useEffect, useState } from 'react';
import { getTechsForFeature } from '@/utils/neo4j/neo4j';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { Weight } from '@/utils/interface/weight';
import { Feature } from '@/utils/interface/feature';
import { Technology } from '@/utils/interface/technology';
import { TechnologyGroup } from '@/utils/interface/technologyGroup';

export const useOutputFetch = (features: Feature[], outputModal: boolean) => {
  // State for storing techgroups
  const [technologyGroups, setTechnologyGroups] = useState<TechnologyGroup[]>(
    []
  );
  // State for loading status
  const [isLoading, setIsLoading] = useState(true);

  // Technology weights from redux store
  const techsAndWeights = useSelector(
    (state: RootState) => state.libraryDataReducer.value
  );

  useEffect(() => {
    const fetchTechnologies = async () => {
      // Return if modal is not open
      if (!outputModal) return;
      // Setting loading state to true at start of fetch
      setIsLoading(true);

      try {
        // Use Promise.all() to execute multiple async operations in parallel,
        // reducing overall execution time and improving performance.
        // This allows us to fetch technologies for all selected features simultaneously.
        const allTechs = await Promise.all(
          features.map(async (feature) => {
            // Fetching techs for each feature from Neo4j
            const techs = await getTechsForFeature(feature.item[0].name);
            // And finally returning array or empty if none found
            return techs;
          })
        );
        // Making Tech objects,
        // Each object have the tech,label/category and the weight
        const featureNames = features.map((feature) => feature.item[0].name);
        console.log(featureNames);
        const techObject = allTechs.flat().map((tech) => {
          const techData = techsAndWeights.find(
            (t) => t.name === tech.technology
          );
          // Sum weights for all matching features
          const totalWeight = (techData?.weights as Weight[])
            .filter((w) => featureNames.includes(w.feature)) // Only include weights for selected features
            .reduce((sum, w) => sum + w.weight, 0); // Sum the weights
          return {
            technology: tech.technology,
            technologyCategory: tech.technologyCategory,
            totalWeight,
          };
        });

        // Initialize an empty object to store technologies by category
        // The object will have string keys (labels/categories) and values will be arrays of Technology objects
        const techsByCategory: { [key: string]: Technology[] } = {};
        // Iterate over the techObject array
        techObject.forEach((tech) => {
          // Extract the first category from the technologys categories array
          const category = tech.technologyCategory[0];
          // Check if the category is not already a key in the techsByCategory object
          if (!techsByCategory[category]) {
            // If not, initialize the category key with an empty array
            techsByCategory[category] = [];
          }
          // Check if the technology is not already in the categorys array
          // using the some method to iterate over the array and check for a match
          if (
            !techsByCategory[category].some(
              // Iterate over the array and check if any technology has the same name as the current tech
              (t) => t.technology === tech.technology
            )
          ) {
            // If the technology is not already in the array, add it to the category's array
            techsByCategory[category].push(tech as Technology);
          }
        });

        // Sort technologies by weight within each category
        Object.keys(techsByCategory).forEach((category) => {
          techsByCategory[category].sort(
            (a, b) => b.totalWeight - a.totalWeight
          );
        });

        // Define required technology categories
        const requiredCategories = [
          'frontendFramework',
          'backendFramework',
          'Database',
          'Language',
          'CSSframework',
        ];

        // Find maximum number of technologies in any required category
        const maxTechnologies = Math.max(
          ...requiredCategories.map((cat) =>
            techsByCategory[cat] ? techsByCategory[cat].length : 0
          )
        );

        // Initialize array to store technology groups
        const groups: TechnologyGroup[] = [];

        // Create as many groups as the maximum number of technologies in any required category
        for (let i = 0; i < maxTechnologies; i++) {
          // Initialize partial group object
          const group: Partial<TechnologyGroup> = {};
          // Add one technology from each required category
          requiredCategories.forEach((category) => {
            // Get technologies for current category
            const techs = techsByCategory[category] || [];
            if (techs.length > 0) {
              // Use modulo to cycle through available technologies
              group[category] = techs[i % techs.length];
            } else {
              // This is just for postProd to see if there is no relationships :-)
              group[category] = {
                technology: 'No relationship',
                totalWeight: 0,
                technologyCategory: [category],
              };
            }
          });

          // Add remaining non-required categories
          Object.keys(techsByCategory).forEach((category) => {
            if (!requiredCategories.includes(category)) {
              group[category] = techsByCategory[category];
            }
          });

          // Add completed group to groups array
          groups.push(group as TechnologyGroup);
        }

        // Updating the state with techGroups
        setTechnologyGroups(groups);
      } catch (error) {
        // If errors are occured the fetch fails
        console.error('Error fetching technologies:', error);
        setTechnologyGroups([]);
      } finally {
        // Setting the loading state back to false
        setIsLoading(false);
      }
    };

    fetchTechnologies();
  }, [features, outputModal, techsAndWeights]);

  return { technologyGroups, isLoading };
};

export default useOutputFetch;

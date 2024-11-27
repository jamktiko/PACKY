import { useEffect, useState } from 'react';
import { getTechsForFeature } from '@/utils/neo4j/neo4j';
import { getTutorialsForTechAndFeatures } from '@/utils/neo4j/neo4j';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { Weight } from '@/utils/interface/weight';
import { Feature } from '@/utils/interface/feature';
import { Technology } from '@/utils/interface/technology';
import { TechnologyGroup } from '@/utils/interface/technologyGroup';
import { CategoryNewNames } from '@/utils/interface/categoryNewNames';

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

        const categoryNewNames: CategoryNewNames = {
          frontendFramework: 'Frontend',
          backendFramework: 'Backend',
          cssFramework: 'CSS Framework',
          Database: 'Database',
          Language: 'Language',
        };

        const requiredCategories = [
          'Language',
          'frontendFramework',
          'backendFramework',
          'cssFramework',
          'Database',
        ];

        const maxTechnologies = Math.max(
          ...requiredCategories.map((cat) =>
            techsByCategory[cat] ? techsByCategory[cat].length : 0
          )
        );

        const groups: TechnologyGroup[] = [];

        for (let i = 0; i < maxTechnologies; i++) {
          const group: Partial<Record<string, Technology>> = {};

          requiredCategories.forEach((category) => {
            const techs = techsByCategory[category] || [];
            const newName = categoryNewNames[category] || category;

            if (techs.length > 0) {
              group[newName] = techs[i % techs.length];
            } else {
              group[newName] = {
                technology: 'No need for this feature!',
                totalWeight: 0,
                technologyCategory: [category],
              };
            }
          });
          Object.keys(techsByCategory).forEach((category) => {
            if (!requiredCategories.includes(category)) {
              const newName = categoryNewNames[category] || category;
              group[newName] = techsByCategory[category][0];
            }
          });

          // Add completed group to groups array
          groups.push(group as TechnologyGroup);
        }

        const techNames = techObject.map((tech) => tech.technology);
        const tutorials = await getTutorialsForTechAndFeatures(
          techNames,
          featureNames
        );

        console.log(tutorials.map((t) => t.TutorialLink));
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

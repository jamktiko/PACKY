import GridButton from '@/components/buttons/GridButton';
import type { PageLayout } from './_app';

const Page: PageLayout = () => {
  return (
    <div>
      <GridButton onClick={() => console.log('Clicked')}></GridButton>
    </div>
  );
};

export default Page;

import { type RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';

const useWholeItem = () => {
  const wholeItem = useSelector(
    (state: RootState) => state.gridButtonReducer.wholeItem
  );
  return wholeItem;
};

export default useWholeItem;

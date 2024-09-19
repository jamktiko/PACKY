import { type RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';

const useOutPutItem = () => {
  const wholeItem = useSelector(
    (state: RootState) => state.gridButtonReducer.outPutItem
  );
  return wholeItem;
};

export default useOutPutItem;

import { type RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';

const useOutPutItem = () => {
  const outPutItem = useSelector(
    (state: RootState) => state.gridButtonReducer.outPutItem
  );
  return outPutItem;
};

export default useOutPutItem;

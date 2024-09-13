/*




MUISTA KATSOA ETTÄ OLET OIKEALLA BRANCHILLA ENNEN KUIN ALAT TEKEMÄÄN ASIOITA SAATANA!!! 







*/

import React from 'react';
import { toggleModal } from '@/redux/reducers/modalReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, type RootState } from '@/redux/store/store';

const GridModal = () => {
  const modal = useSelector((state: RootState) => state.modalReducer.value);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      {modal && (
        <div className="z-50 absolute top-0 left-0 w-screen h-screen bg-red-500 opacity-50">
          <h1>
            TErevefjaioögjneaoöigjnauiöngusizgulgusrizlhglusihgzligrshuighalhgl
          </h1>
          <button
            className="bg-white p-2 rounded-md"
            onClick={() => dispatch(toggleModal(false))}
            type="button"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default GridModal;

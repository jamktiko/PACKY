import React from 'react';

//GridModal window is constructed here and it takes setIsModalOpen as a prop from stackbuilder
const GridModal = (setIsModalOpen: any) => {
  return (
    <>
      {setIsModalOpen && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-red-500 opacity-50">
          <h1>
            TErevefjaioögjneaoöigjnauiöngusizgulgusrizlhglusihgzligrshuighalhgl
          </h1>
        </div>
      )}
    </>
  );
};

export default GridModal;

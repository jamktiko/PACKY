import React from 'react';

//OutputModal window is constructed here and it takes setIsOutputModalOpen as a prop from stackbuilder
const OutputModal = (setIsOutputModalOpen: any) => {
  return (
    <>
      {setIsOutputModalOpen && (
        <div className="absolute top-0 left-0 w-screen h-screen bg-red-500 opacity-50">
          <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            eum perspiciatis eius? Cum illo voluptate aut consequuntur qui
            magnam. Asperiores velit, voluptas sint qui excepturi quibusdam et
            aliquid itaque nemo?
          </h1>
        </div>
      )}
    </>
  );
};

export default OutputModal;

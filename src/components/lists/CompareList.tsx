import React, { useState, useEffect } from 'react';
import { Triangle } from 'react-loader-spinner';
import { CollectionData } from '@/utils/collectionData';

/**
 * Placeholder for now. Change if you want to,
 * i think the library page is good base for it
 * if not, feel free to delete all the code
 */

const List = () => {
  return (
    <>
      <div className="content"></div>
      {/* <div className="mt-4 text-center">
        <p className="font-bold">Loading the library...</p>
        <Triangle
          visible={true}
          height="100"
          width="100"
          color="#38B2AC"
          ariaLabel="triangle-loading"
          wrapperStyle={{
            width: '100%',
            position: 'flex',
            justifyContent: 'center',
          }}
          wrapperClass=""
        />
      </div> */}
    </>
  );
};

export default List;

import React, { use, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { useOutputFetch } from '@/hooks/outputFetch';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Loader from '../loader';
import { motion } from 'framer-motion';
import * as htmlToImage from 'html-to-image';
import toPng from 'html-to-image';

const OutputModal = () => {
  const [isExporting, setIsExporting] = useState(false);

  const outputModal = useSelector(
    (state: RootState) => state.outputReducer.value
  );

  const features = useSelector(
    (state: RootState) => state.gridStateReducer.activeCells
  );

  const { technologyGroups, isLoading } = useOutputFetch(features, outputModal);

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: false,
    centerPadding: '500px',
    slidesToShow: 1,
    speed: 500,
    useTransform: true,
    useCSS: true,
  };

  const refs = useRef<HTMLDivElement[]>([]);

  if (isLoading) {
    return (
      <div className='slider-container outputmodal-loader-center'>
        <Loader />
      </div>
    );
  }

  const handleExportImage = (index: number): Promise<void> => {
    return new Promise((resolve) => {
      if (refs.current[index]) {
        htmlToImage
          .toPng(refs.current[index], { cacheBust: true })
          .then((dataUrl: any) => {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'output-image.png';
            link.click();
            resolve(); // Resolve the promise when the image export is complete
          })
          .catch((err: any) => console.error(err));
      }
    });
  };

  return (
    <>
      {outputModal && (
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          className='slider-container output-container'
        >
          <Slider {...settings} className='carousel'>
            {technologyGroups.map((group, index) => (
              <div
                ref={(ref) => {
                  if (ref) {
                    refs.current[index] = ref;
                  }
                }}
                className='carousel-item'
                key={index}
              >
                <h3 className='output-option-header'>Option {index + 1}</h3>

                {Object.entries(group).map(([category, techs]) => {
                  // Check if techs is an array or single technology
                  const techArray = Array.isArray(techs) ? techs : [techs];
                  return (
                    <div
                      key={category}
                      className='text-left md:ml-[20%] ml-[10%] mt-6'
                    >
                      <p className='pl-3 pt-1 font-bold text-xl border-t border-l border-teal-500'>
                        {category}
                      </p>

                      <ul>
                        {techArray.map((tech, i) => (
                          <li className='md:text-base text-sm' key={i}>
                            <b>Technology:</b> {tech.technology}
                            <p>Total Weight: {tech.totalWeight}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
                <button
                  onClick={() => {
                    setIsExporting(true);
                    handleExportImage(index).then(() => {
                      setIsExporting(false);
                    });
                  }}
                  disabled={isExporting}
                  className={isExporting ? 'hidden' : 'export-button'}
                >
                  Export PNG
                </button>
              </div>
            ))}
          </Slider>
        </motion.div>
      )}
    </>
  );
};

export default OutputModal;

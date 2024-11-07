import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { useOutputFetch } from '@/hooks/outputFetch';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Loader from '../loader';
import { motion } from 'framer-motion';

const OutputModal = () => {
  // Use the useSelector hook to select the outputModal value from the state
  const outputModal = useSelector(
    (state: RootState) => state.outputReducer.value
  );

  // Use the useSelector hook to select the features value from the state
  const features = useSelector(
    (state: RootState) => state.gridStateReducer.activeCells
  );

  // Use the useOutputFetch hook to get the labelTypes value
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

  if (isLoading) {
    return (
      <div className="slider-container outputmodal-loader-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {outputModal && (
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          className="slider-container output-container"
        >
          <Slider {...settings} className="carousel">
            {technologyGroups.map((group, index) => (
              <div className="carousel-item" key={index}>
                <h3 className="output-option-header">Option {index + 1}</h3>
                {Object.entries(group).map(([category, techs]) => (
                  <div key={category}>
                    <p className="font-bold">{category}:</p>
                    <ul>
                      {techs.map((tech, i) => (
                        <li key={i}>
                          Technology: {tech.technology} | Total Weight:
                          {tech.totalWeight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </Slider>
        </motion.div>
      )}
    </>
  );
};
export default OutputModal;

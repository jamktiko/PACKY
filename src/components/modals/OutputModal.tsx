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
                <h3 className="output-option-header">
                  Stack Option {index + 1}
                </h3>
                {Object.entries(group).map(([category, techs]) => {
                  // Check if techs is an array or single technology
                  const techArray = Array.isArray(techs) ? techs : [techs];

                  return (
                    <div
                      key={category}
                      className="text-left md:ml-[20%] ml-[10%] mt-6"
                    >
                      <p className="pl-3 pt-1 font-bold text-xl border-t border-l border-teal-500">
                        {category}
                      </p>
                      <ul>
                        {techArray.map((tech, i) => (
                          <li className="md:text-base text-sm" key={i}>
                            <b>Technology:</b> {tech.technology}
                            <p>Total Weight: {tech.totalWeight}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            ))}
          </Slider>
        </motion.div>
      )}
    </>
  );
};

export default OutputModal;

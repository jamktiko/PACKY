import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { useOutputFetch } from '@/hooks/outputFetch';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Loader from '../ui/loader';
import { motion } from 'framer-motion';
import * as htmlToImage from 'html-to-image';

const OutputModal = () => {
  const [isExporting, setIsExporting] = useState(false);

  const outputModal = useSelector(
    (state: RootState) => state.outputReducer.value
  );

  const features = useSelector(
    (state: RootState) => state.gridStateReducer.activeCells
  );

  const { technologyGroups, isLoading, tutorials } = useOutputFetch(
    features,
    outputModal
  );

  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    className: 'center',
    centerMode: true,
    infinite: false,
    centerPadding: '500px',
    slidesToShow: 1,
    speed: 500,
    useTransform: true,
    useCSS: true,
    afterChange: (currentSlide: number) => {
      setActiveIndex(currentSlide);
    },
  };

  const refs = useRef<HTMLDivElement[]>([]);

  if (isLoading) {
    return (
      <div className="slider-container outputmodal-loader-center">
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
            resolve();
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
          className="slider-container output-container"
        >
          <Slider {...settings} className="carousel">
            {technologyGroups.map((group, index) => (
              <div
                ref={(ref) => {
                  if (ref) {
                    refs.current[index] = ref;
                  }
                }}
                className="carousel-item"
                key={index}
              >
                <h3 className="output-option-header">Option {index + 1}</h3>
                <div className="grid grid-cols-2 md:ml-[20%] ml-[10%] mb-4">
                  {Object.entries(group).map(([category, techs]) => {
                    const techArray = Array.isArray(techs) ? techs : [techs];
                    return (
                      <div key={category} className="text-left mt-4 text-xs">
                        <p className="pl-1 pt-1 font-bold border-t border-l border-teal-500">
                          {category}
                        </p>
                        <ul>
                          {techArray.map((tech, i) => (
                            <li className="ml-1" key={i}>
                              <b>Technology:</b> {tech.technology}
                              <p>Total Weight: {tech.totalWeight.toFixed(1)}</p>
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
                    disabled={isExporting || index !== activeIndex}
                    className={isExporting ? 'hidden' : 'export-button'}
                  >
                    Export PNG
                  </button>
                </div>
                <div className="border-t border-l mt-6 md:ml-[20%] ml-[10%] border-cyan-500">
                  <h3 className="text-left ml-2 mt-1 font-bold">Tips</h3>
                  {features.map(
                    (feature, i) =>
                      feature.item[0].name !== 'Web App' &&
                      feature.item[0].tips !== null && (
                        <div
                          key={i}
                          className="text-left max-w-64 text-xs ml-2 mt-2"
                        >
                          <p>- {feature.item[0].tips}</p>
                        </div>
                      )
                  )}
                  {/* Tutorials Section */}
                  <div className="mt-4">
                    <h4 className="text-left ml-2 mt-4 font-bold">Tutorials</h4>
                    <ul className="text-left ml-4">
                      {tutorials
                        .filter((tutorial) =>
                          Object.values(group)
                            .flat()
                            .some(
                              (tech) => tech.technology === tutorial.Technology
                            )
                        )
                        .map((tutorial, idx) => (
                          <li key={idx} className="mb-2">
                            <a
                              href={tutorial.TutorialLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              {tutorial.TutorialName}
                            </a>{' '}
                            - For feature: {tutorial.Feature}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      )}
    </>
  );
};

export default OutputModal;

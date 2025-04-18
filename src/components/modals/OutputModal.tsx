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
                <div className='grid grid-cols-2 md:ml-[20%] ml-[10%] mb-4'>
                  {Object.entries(group).map(([category, techs]) => {
                    const techArray = Array.isArray(techs) ? techs : [techs];
                    // If firebase is not selected it does not recommend firebase
                    // or or tutorials related to Firebase! :-)
                    if (category === 'Service') {
                      const filteredTechs = techArray.filter(
                        (tech) => tech.totalWeight > 1
                      );
                      // Skip rendering this category if no techs match the filter
                      if (filteredTechs.length === 0) return null;
                    }
                    return (
                      <div key={category} className='text-left mt-4 text-xs'>
                        <p className='pl-1 pt-1 font-bold border-t border-l border-teal-500'>
                          {category}
                        </p>
                        <ul>
                          {techArray.map((tech, i) => (
                            <li className='ml-1' key={i}>
                              <b>Technology:</b> {tech.technology}
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
                <div className='border-t border-l mt-6 md:ml-[20%] ml-[10%] border-cyan-500'>
                  <h3 className='text-left ml-2 mt-1 font-bold'>Tips</h3>
                  <div className='grid grid-cols-2'>
                    {features
                      .filter(
                        (feature) =>
                          feature.item[0].name !== 'Web App' &&
                          feature.item[0].tips !== null
                      )
                      .slice(0, 4)
                      .map((feature, i) => (
                        <div
                          key={i}
                          className='text-left max-w-64 text-xs ml-2 mt-2'
                        >
                          {feature.item[0].name}
                          <p>- {feature.item[0].tips}</p>
                        </div>
                      ))}
                  </div>

                  {/* Tutorials Section */}
                  <div className='mt-4'>
                    <h4 className='text-left ml-2 mt-4 font-bold'>Tutorials</h4>
                    <ul className='text-left ml-4 grid grid-cols-2'>
                      {tutorials
                        .filter(
                          (tutorial, index, self) =>
                            self.findIndex(
                              (t) => t.TutorialLink === tutorial.TutorialLink
                            ) === index
                        )
                        .filter((tutorial) =>
                          Object.values(group)
                            .flat()
                            .some(
                              (tech) =>
                                tech.technology === tutorial.Technology &&
                                (tech.technology !== 'Firebase' ||
                                  (tech.technology === 'Firebase' &&
                                    tech.totalWeight > 1))
                            )
                        )
                        .slice(0, 4)
                        .map((tutorial, idx) => (
                          <li key={idx} className='mb-2 text-sm'>
                            <a
                              href={tutorial.TutorialLink}
                              target='_blank'
                              rel='noopener noreferrer'
                              tabIndex={index === activeIndex ? 0 : -1}
                              className='text-blue-500 underline'
                            >
                              {tutorial.TutorialName}
                            </a>{' '}
                            <p>For {tutorial.Feature}</p>
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

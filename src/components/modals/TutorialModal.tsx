import React, { use, useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
import Image from 'next/image';

const TutorialModal = ({ onClose }: { onClose: () => void }) => {
  const customStyles = {
    content: {
      className: 'center',
      centerMode: true,
      infinite: false,
      centerPadding: '500px',
      slidesToShow: 1,
      speed: 500,
      useTransform: true,
      useCSS: true,
    },
  };
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'none',
              border: 'none',
              fontSize: '18px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            className="slider-container output-container"
          >
            {/* Slider Content */}
            <Slider {...customStyles} className="carousel">
              <div>
                <h2>Welcome to PACKY</h2>
                <p>Firts time using PACKY?</p>
                <p>Tähän jotain paskaa</p>
              </div>
              <div>
                <h2>Libary Feature</h2>
                <p>Explanation about Feature Library</p>
                <Image
                  src={'/images/tutorial/library1.png'}
                  alt={'packy logo'}
                  width={200}
                  height={200}
                />
                <Image
                  src={'/images/tutorial/library2.png'}
                  alt={'packy logo'}
                  width={200}
                  height={200}
                />
                <Image
                  src={'/images/tutorial/library3.png'}
                  alt={'packy logo'}
                  width={200}
                  height={200}
                />
              </div>
              <div>
                <h2>Stackbuilder Feature</h2>
                <p>
                  Explanation about Feature Stackbuilder ja valehdellaan tähä
                  jotain
                </p>
                <Image
                  src={'/images/tutorial/stackbuilder1.png'}
                  alt={'packy logo'}
                  width={200}
                  height={200}
                />
                <Image
                  src={'/images/tutorial/stackbuilder2.png'}
                  alt={'packy logo'}
                  width={200}
                  height={200}
                />
                <Image
                  src={'/images/tutorial/stackbuilder3.png'}
                  alt={'packy logo'}
                  width={200}
                  height={200}
                />
                <Image
                  src={'/images/tutorial/stackbuilder4.png'}
                  alt={'packy logo'}
                  width={200}
                  height={200}
                />
              </div>
              <div>
                <h2>Output Feature</h2>
                <p>
                  Explanation about Feature Output ja valehdellaan tähä jotain
                </p>
                <Image
                  src={'/images/tutorial/outputmodal1.png'}
                  alt={'packy logo'}
                  width={200}
                  height={200}
                />
                <Image
                  src={'/images/tutorial/outputmodal2.png'}
                  alt={'packy logo'}
                  width={200}
                  height={200}
                />
              </div>
              <div>
                <p>You’re now ready to explore our app!</p>
                <p>Finish button tähän</p>
              </div>
            </Slider>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default TutorialModal;

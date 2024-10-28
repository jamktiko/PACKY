/* eslint-disable react/jsx-key */
import {
  FaAngular,
  FaGithub,
  FaReact,
  FaSass,
  FaVuejs,
  FaWordpress,
  FaYoast,
  FaYarn,
  FaGoogle,
  FaStackOverflow,
  FaLinkedinIn,
  FaUbuntu,
  FaHtml5,
  FaCcVisa,
  FaCcMastercard,
  FaCss3,
  FaJs,
  FaNode,
  FaDocker,
  FaPhp,
  FaGoogleDrive,
  FaFileCode,
  FaFileAlt,
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileImage,
  FaFileVideo,
  FaFileAudio,
  FaFileArchive,
  FaFile,
} from 'react-icons/fa';
export const InfiniteScroller = () => {
  const techList = [
    // Currently 32 items
    // Scroll transform is calculated by
    // width of each svg * number of items
    // Width = ml + w + mr
    <FaAngular />,
    <FaGithub />,
    <FaReact />,
    <FaSass />,
    <FaVuejs />,
    <FaWordpress />,
    <FaYoast />,
    <FaYarn />,
    <FaGoogle />,
    <FaStackOverflow />,
    <FaLinkedinIn />,
    <FaUbuntu />,
    <FaHtml5 />,
    <FaCcVisa />,
    <FaCcMastercard />,
    <FaCss3 />,
    <FaJs />,
    <FaNode />,
    <FaDocker />,
    <FaPhp />,
    <FaGoogleDrive />,
    <FaFileCode />,
    <FaFileAlt />,
    <FaFilePdf />,
    <FaFileWord />,
    <FaFileExcel />,
    <FaFilePowerpoint />,
    <FaFileImage />,
    <FaFileVideo />,
    <FaFileAudio />,
    <FaFileArchive />,
    <FaFile />,
  ];

  return (
    <div className="border-y border-teal-900 bg-white bg-opacity-10 py-2 w-screen overflow-clip absolute left-0 top-16">
      <div className=" flex animate-scroll">
        {techList.map((item, index) => (
          <div
            key={index}
            className="text-teal-600 text-5xl w-4 mx-6 flex-shrink-0"
          >
            {item}
          </div>
        ))}
        {techList.map((item, index) => (
          <div
            key={index}
            className="text-teal-600 text-5xl w-4 mx-6 flex-shrink-0"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

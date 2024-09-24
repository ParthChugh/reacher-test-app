

import React, { useState } from 'react';
import { Modal } from 'antd';

interface WelcomeModalProps {
    isInitialOpen: boolean;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({
    isInitialOpen = false,
    }) => {
    const [open, setOpen] = useState(isInitialOpen);

    const handleOk = () => {
        console.log('Clicked Ok button from Welcome Modal');
        setOpen(false);
    };

  return (
    <>
      <Modal
        open={open}
        footer={null}
        onCancel={handleOk}
        width={640}
        transitionName=""
        maskClosable={false}
      >
        <h1 className="text-2xl font-bold text-black mb-3">Welcome to Reacher!</h1>
        <h3 className="text-lg font-semibold text-black mb-4">
            Please create your first shop and automation. If you have any questions, please contact us at <span className='text-blue-700'>team@reacherapp.com</span>!
        </h3>
        <div className="flex justify-center mb-4">
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/VsPPXJKp-Vk?si=LpxM8VpW8Lo1waq8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-64 sm:h-80 md:h-96 lg:h-[450px]"
            ></iframe>
        </div>
        <div className={`flex justify-end mb-4 w-full mt-4`}>
            <button
              className="automation-add-new-button-bg hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-300 ease-in-out"
              onClick={handleOk} // Add onClick handler
            >
              OK!
            </button>
        </div>
      </Modal>
    </>
  );
};

export default WelcomeModal;

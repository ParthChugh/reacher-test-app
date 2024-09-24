import React from 'react';
// import { motion, useAnimation } from 'framer-motion'; // Import useAnimation hook

function LoaderSimple() {
    // useEffect(() => {
    //     if (loading) {
    //         controls.start({
    //             opacity: 1,
    //             transition: { duration: 1 }
    //         });
    //     } else {
    //         controls.start({
    //             opacity: 0,
    //             transition: { duration: 1 }
    //         });
    //     }
    // }, [loading, controls]);

    return (
        <div
            className="fixed bg-gradient-to-r h-screen top-0 left-0 w-full h-full flex justify-center items-center z-10"
            
        >
            <div className="p-4 rounded-md">
                <div className="flex justify-center">
                    <>
                        <span
                            className="w-4 h-4 my-12 mx-1 bg-white rounded-full"
                        />
                        <span
                            className="w-4 h-4 my-12 mx-1 bg-white rounded-full"
                        />
                        <span
                            className="w-4 h-4 my-12 mx-1 bg-white rounded-full"
                        />
                    </>
                </div>
            </div>
        </div>
    );
}

export default LoaderSimple;
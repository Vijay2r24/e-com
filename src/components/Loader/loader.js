import React from "react";
import { Vortex } from 'react-loader-spinner'
const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-700">
   <Vortex  visible={true}  height="80"  width="80"  ariaLabel="vortex-loading"  wrapperStyle={{}}  wrapperClass="vortex-wrapper"  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}  />
  </div>
  );
};
export default LoadingAnimation

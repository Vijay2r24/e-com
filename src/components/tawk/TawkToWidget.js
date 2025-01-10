import React, { useEffect } from 'react';
 
const TawkToWidget = () => {
  useEffect(() => {
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement('script');
      var s0 = document.getElementsByTagName('script')[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/677ce0de49e2fd8dfe03974b/1igvsspi4';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
 
    // Cleanup script on unmount
    return () => {
      const tawkScript = document.querySelector('script[src="https://embed.tawk.to/677ce0de49e2fd8dfe03974b/1igvsspi4"]');
      if (tawkScript) {
        tawkScript.remove();
      }
    };
  }, []);
 
  return null; // This component doesn't render anything
};
 
export default TawkToWidget;
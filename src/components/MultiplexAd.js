import React, { useEffect } from "react";

const MultiplexAd = () => {
  useEffect(() => {
    const pushAd = () => {
      try {
        const adsbygoogle = window.adsbygoogle || [];
        console.log({ adsbygoogle });
        adsbygoogle.push({});
      } catch (e) {
        console.error("AdSense error", e);
      }
    };

    const interval = setInterval(() => {
      
      if (window.adsbygoogle && window.adsbygoogle.loaded) {
        pushAd();
        clearInterval(interval);
      }
    }, 300);

    return () => {
      clearInterval(interval); 
    };
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-format="autorelaxed"
      data-ad-client="ca-pub-5947514247098170"  
      data-ad-slot="3186196531"
    ></ins>
  );
};

export default MultiplexAd;

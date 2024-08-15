import React, { useEffect } from "react";

const InarticleAd = () => {
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
      style={{ display: "block", textAlign: "center" }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-5947514247098170"  
      data-ad-slot="5131603521"           
    ></ins>
  );
};

export default InarticleAd;

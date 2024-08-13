import React, { useEffect } from "react";

const InfeedAd = () => {
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
      // Check if the Adsense script is loaded every 300ms
      if (window.adsbygoogle && window.adsbygoogle.loaded) {
        pushAd();
        // Clear the interval once the ad is pushed
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
      data-ad-format="fluid"
      data-ad-layout-key="-6t+ed+2i-1n-4w" 
      data-ad-client="ca-pub-5947514247098170"
      data-ad-slot="8014478239"
    ></ins>
  );


};

export default InfeedAd;

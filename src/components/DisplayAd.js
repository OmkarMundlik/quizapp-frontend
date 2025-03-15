import React, { useEffect } from "react";

const DisplayAd = () => {
  useEffect(() => {
    const pushAd = () => {
      try {
        const adsbygoogle = window.adsbygoogle || [];
        // // console.log({ adsbygoogle });
        adsbygoogle.push({});
      } catch (e) {
        console.error("AdSense error", e);
      }
    };

    const interval = setInterval(() => {
      // Check if the Adsense script is loaded every 300ms
      if (window.adsbygoogle && window.adsbygoogle.loaded) {
        pushAd();
        clearInterval(interval); // Clear interval after pushing the ad
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
      data-ad-client="ca-pub-5947514247098170" 
      data-ad-slot="1383930207"          
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default DisplayAd;

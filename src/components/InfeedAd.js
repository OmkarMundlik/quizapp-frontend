import React, { useEffect, useRef } from 'react';

const AdSenseComponent = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error', e);
      }
    }
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-format="fluid"
      data-ad-layout-key="-6t+ed+2i-1n-4w"
      data-ad-client="ca-pub-5947514247098170"
      data-ad-slot="8014478239"
    ></ins>
  );
};

export default AdSenseComponent;

import React, { useEffect } from 'react';

export default function InfeedAd() {
  useEffect(() => {
    const loadAd = () => {
      try {
        if (window.adsbygoogle && window.adsbygoogle.loaded) {
          window.adsbygoogle.push({});
        }
      } catch (e) {
        console.error('AdSense error', e);
      }
    };

    const adTimeout = setTimeout(() => {
      loadAd();
    }, 1000); // Delay to ensure DOM is ready

    return () => {
      clearTimeout(adTimeout);
    };
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-format="fluid"
      data-ad-layout-key="-6t+ed+2i-1n-4w"
      data-ad-client="ca-pub-5947514247098170"
      data-ad-slot="8014478239"></ins>
  );
}

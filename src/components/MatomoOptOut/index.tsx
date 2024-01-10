import React, { useEffect } from 'react';

const MatomoOptOut = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://reductstore.matomo.cloud/index.php?module=CoreAdminHome&action=optOutJS&divId=matomo-opt-out&language=auto&showIntro=0";
    script.async = true;

    document.getElementById('matomo-opt-out').appendChild(script);

    return () => {
      // Cleanup the script when the component is unmounted
      document.getElementById('matomo-opt-out').removeChild(script);
    };
  }, []);

  return <div id="matomo-opt-out"></div>;
};

export default MatomoOptOut;

import React, { useEffect } from "react";

const AdBanner = () => {
    useEffect(() => {
        try {
            let adsbygoogle = window.adsbygoogle || []
            adsbygoogle.push({});
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div style={{padding: '10px', textAlign:'center'}}>

            <ins className="adsbygoogle"
                style={{ display: 'block', textAlign: 'center' }}
                data-ad-layout="in-article"
                data-ad-format="fluid"
                data-ad-client="ca-pub-XXXX"
                data-ad-slot="XXXX"></ins>
        </div>
    );
};

export default AdBanner;
import React, {useEffect} from 'react';
const nonce = require('nonce')();

const LoginWithSingpass = () => {

    useEffect(() => {
        fetchJsFromCDN()

    }, [])


    const fetchJsFromCDN = ()=> {
        new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.setAttribute('src', "https://stg-id.singpass.gov.sg/static/ndi_embedded_auth.js")
            script.addEventListener('load', (d) => {
                init();
            })
            script.addEventListener('error', reject)
            document.body.appendChild(script)
        })
    }

    function init() {
        const nonceValue = nonce();

        const authParamsSupplier = async () => {
            return { state: "qwew+$45s=m#de32.-", nonce: nonceValue};
        };

        const onError = (errorId, message) => {
            console.log(`onError. errorId:${errorId} message:${message}`);
        };

        const initAuthSessionResponse = window.NDI.initAuthSession(
            'ndi-qr',
            {
                clientId: "STG-201614831N-ZUELLIG-DOCTORREG",                               // Replace with your Singpass client ID
                redirectUri: 'https://ezpharmacy.zuelligpharma.com/callback',  // Replace with Auth0 custom domain
                scope: 'openid',
                responseType: 'code'
            },
            authParamsSupplier,
            onError,
            {
                renderDownloadLink: false,
                appLaunchUrl: '' // Replace with your iOS/Android App Link
            },
        );

        console.log('initAuthSession: ', initAuthSessionResponse);
    }

    return (
        <div style={{
            width : "25%",
            margin : "auto",
        }}>
            <div style={{
                marginTop: "100px",
                textAlign : "center",
                fontFamily: "Poppins-Regular, sans-serif"
            }}>
                <div style={{ lineHeight : "8px"}}>
                    <p style={{fontSize : '20px', fontWeight : 600}}>Scan with Singpass app</p>
                    <p style={{fontSize : '16px'}}>to log in</p>
                </div>
                <div
                    style={{
                        border : "2px solid #cf0b15",
                        padding : "20px",
                        borderRadius : '5px',
                    }}>
                    <div id="ndi-qr"></div>
                </div>
            </div>
        </div>
    )
}

export default LoginWithSingpass;
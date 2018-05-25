import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CaptionsEditor from './CaptionsEditor';
import CaptionsRequest from './CaptionsRequest';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <CaptionsEditor />,
    document.getElementById('root') as HTMLElement
);

ReactDOM.render(
    <CaptionsRequest
        serviceUrl={'http://qa-reach.dev.kaltura.com'}
        clientTag={'kms_react_client'}
        ks={
            'MDk2MTkzNDQ3OGI2YjUwYjk0MDhlZWJjMGE1NDI2MzU4MmQ3NDI2M3wxMTE7MTExOzE1' +
            'MjczNTQzNjU7MjsxMDE2MTtfX0FETUlOX18yNjY4NzsqLGRpc2FibGVlbnRpdGxlbWVudA=='
        }
        entryId={'0_yfhyptvq'}
    />,
    document.getElementById('captions_request') as HTMLElement
);
registerServiceWorker();

import * as React from 'react';
import {
    KalturaAPIException, KalturaClient,
    KalturaClientException,
} from 'kaltura-typescript-client';
import { SessionGetAction } from 'kaltura-typescript-client/api/types/SessionGetAction';
import { CaptionAssetGetUrlAction } from 'kaltura-typescript-client/api/types/CaptionAssetGetUrlAction';

interface Props {
    serviceUrl: string;
    clientTag: string;
    ks: string;
    entryId: string;
}

interface State {
    error?: string;
    userId: string | null;
}

/**
 *  REACH channel page component
 */
class CaptionsRequest extends React.Component<Props, State> {

    kClient: KalturaClient;

    constructor(props: Props) {
        super(props);
        this.state = {userId: null};
        this.kClient = this.initClient();
    }

    componentDidMount() {
        this.getSessionInfo();
        this.listReachProfiles();
    }

    /**
     * initialize a client with the relevant props
     * @returns {KalturaClient}
     */
    initClient(): KalturaClient {
        const {serviceUrl, clientTag, ks} = this.props;
        return new KalturaClient(
            {
                endpointUrl: serviceUrl,
                clientTag: clientTag
            },
            {
                ks: ks
            }
        );
    }
    listReachProfiles(): void {
        const request = new CaptionAssetGetUrlAction({id: '1_11qta1x9'});
        this.kClient.request(request).then(
            profilesListResponse => {
                console.log(11);
                console.log(profilesListResponse);
                debugger;
            },
            err => {
                debugger;
                if (err instanceof KalturaClientException) {
                    // network error etc

                } else if (err instanceof KalturaAPIException) {
                    // api exception
                }
                this.setState({error: err.message});
            }
        );
    }

    getSessionInfo(): void {
        const request = new SessionGetAction();
        this.kClient.request(request).then(
            data => {
                debugger;
                if (data) {
                    // data is KalturaSessionInfo
                    this.setState({userId: data.userId});
                }
            },
            err => {
                debugger;
                if (err instanceof KalturaClientException) {
                    // network error etc

                } else if (err instanceof KalturaAPIException) {
                    // api exception

                }
                this.setState({error: err.message});
            }
        );
    }

    render() {

        return (
            <div>
                hello
            </div>
        );
    }
}

export default CaptionsRequest;

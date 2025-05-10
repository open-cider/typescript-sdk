import Document from "../modules/document";
import Social from "../modules/social";
import SummaryData from "../modules/summarydata";
import config from '../../config.json';

/**
 * Open Cider Client class
 * @param token a valid service user token generated from sucucessful authentication.
*/
class Client {

    readonly token: string
    readonly document: Document
    readonly social: Social
    readonly summaryData: SummaryData
    

    constructor(token: string) {
        if (!token.startsWith(config.request.service_user_token_prefix)) 
            throw new Error("Inavalid token supplied")

        this.token       = token
        this.document    = new Document(this.token)
        this.social      = new Social(this.token)
        this.summaryData = new SummaryData(this.token)
    }
}

export default Client;
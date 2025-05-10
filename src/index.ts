import Client from './client';
import config from '../config.json';


/**
 * Creates a client with token when token has been stored to avoid logging in everytime.
 * @param token valid token obtained from a previously valid client object.
 * @returns a new client object
*/
export function createClient(token: string): Client {
    return new Client(token)
}

/**
 * SSO initialization.
 * @param serviceKey generated on the service dashboard.
 * @returns a valid client object
*/
export function initialize(serviceKey: string): Promise<Client> {
    if (!serviceKey.startsWith(config.login.service_key_prefix)) 
        throw new Error("Inavalid service key supplied")

    window.open(config.login.request_url+btoa(serviceKey), "popup", "width=440,height=800,scrollbars=yes");

    return new Promise((resolve, reject) => {
        window.addEventListener("message", function(event) {
            if (event.origin == config.login.origin_url) {
                const token = event.data.token
                if (token == undefined) {
                    reject(event.data.error_message)
                } else {
                    resolve(new Client(token))
                }
            }
        });
    })
}
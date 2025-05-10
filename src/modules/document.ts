import { http, isSuccess } from '../http'
import { User, UpdateUser, UpdateUserHttp } from '../utils/interfaces'
import config from '../../config.json';


class Document {
    protected readonly token: string;

    constructor(token: string) {
        if (!token.startsWith(config.request.service_user_token_prefix)) 
            throw new Error("Inavalid token supplied")
        
        this.token = token;
    }

    /**
     * @returns returns user details
    */
    get(): Promise<User> {
        return new Promise((resolve, reject) => {
            http.get('/document?token=' + this.token).then(res => {
                if (isSuccess(res.status)) resolve(res.data.response as User)
                else reject(res.data.message)
            })
        })
    }

    /**
     * Update user document.
     * @param update new object with changes.
     * @returns success or failure.
    */
    set(data: UpdateUser): Promise<void> {
        return new Promise((resolve, reject) => {
            http.post('/document', this.toHttp(data)).then(res => {
                if (isSuccess(res.status)) resolve()
                else {
                    reject(res.data.message)
                }
            })
        })
    }

    private toHttp(data: UpdateUser): UpdateUserHttp {
        return { 
            token: this.token, 
            username: data.username, 
            emailAddress: data.emailAddress, 
            avatar: data.avatar 
        }
    }
}

export default Document;
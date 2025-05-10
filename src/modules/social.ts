import { http, isSuccess } from '../http'
import { User } from '../utils/interfaces'
import config from '../../config.json';
import { FriendshipAction } from '../utils/enums'


class Social {
    protected readonly token: string;

    constructor(token: string) {
        if (!token.startsWith(config.request.service_user_token_prefix)) 
            throw new Error("Inavalid token supplied")
        
        this.token = token;
    }

    //TODO: maybe check to confirm it is a UUID....
    addFriend(friendId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            http.post('/social/friends/add', { token: this.token, friendId: friendId }).then(res => {
                if (isSuccess(res.status)) resolve()
                else reject(res.data.message)
            })
        })
    }

    removeFriend(friendId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            http.post('/social/friends/remove', { token: this.token, friendId: friendId }).then(res => {
                if (isSuccess(res.status)) resolve()
                else reject(res.data.message)
            })
        })
    }

    getFriends(): Promise<Array<User>> {
        return new Promise((resolve, reject) => {
            http.get('/social/friends?token=' + this.token).then(res => {
                if (isSuccess(res.status)) resolve(res.data.response as Array<User>)
                else reject(res.data.message)
            })
        })
    }

    blockFriend(friendId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            http.post('/social/friends/block', { token: this.token, friendId: friendId }).then(res => {
                if (isSuccess(res.status)) resolve()
                else reject(res.data.message)
            })
        })
    }

    unblockFriend(friendId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            http.post('/social/friends/unblock', { token: this.token, friendId: friendId }).then(res => {
                if (isSuccess(res.status)) resolve()
                else reject(res.data.message)
            })
        })
    }

    getFriendRequests(): Promise<Array<User>> {
        return new Promise((resolve, reject) => {
            http.get('/social/friends/request?token=' + this.token).then(res => {
                if (isSuccess(res.status)) resolve(res.data.response as Array<User>)
                else reject(res.data.message)
            })
        })
    }

    updateFriendRequests(personId: string, status: FriendshipAction): Promise<void> {
        return new Promise((resolve, reject) => {
            http.post('/social/friends/request', { token: this.token, personId: personId, status: status }).then(res => {
                if (isSuccess(res.status)) resolve()
                else reject(res.data.message)
            })
        })
    }

    findPeopleByIds(ids: Array<string>): Promise<Array<User>> {
        return new Promise((resolve, reject) => {
            http.post('/social/people/find', { token: this.token, ids: ids }).then(res => {
                if (isSuccess(res.status)) resolve(res.data.response)
                else reject(res.data.message)
            })
        })
    }

    findPeople(q: string): Promise<Array<User>> {
        return new Promise((resolve, reject) => {
            if (q.length < 3) Promise.reject("Query cannot be less than 3 characters")
            else {
                http.get('/social/people/search?token=' + this.token + "&q=" + q).then(res => {
                    if (isSuccess(res.status)) resolve(res.data.response as Array<User>)
                    else reject(res.data.message)
                })
            }
        })
    }
}

export default Social;
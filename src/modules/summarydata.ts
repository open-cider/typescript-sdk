import { http, isSuccess } from '../http'
import { Leaderboard, UpdateSummaryData, UpdateSummaryDataHttp } from '../utils/interfaces';
import config from '../../config.json';

class SummaryData {
    
    protected readonly token: string;
    protected readonly maxLimit: number = 50


    constructor(token: string) {
        if (!token.startsWith(config.request.service_user_token_prefix)) 
            throw new Error("Inavalid token supplied")

        this.token = token;
    }

    get(): Promise<SummaryData> {
        return new Promise((resolve, reject) => {
            http.get('/summary-data?token=' + this.token).then(res => {
                if (isSuccess(res.status)) resolve(res.data.response as SummaryData)
                else reject(res.data.message)
            })
        })
    }

    leaderboard(limit?: number): Promise<Array<Leaderboard>> {
        if (limit && limit as number > 50) return Promise.reject("Cannot use limit greater than " + this.maxLimit)

        return new Promise((resolve, reject) => {
            http.get('/summary-data/leaderboard?token=' + this.token + '&limit=' + limit).then(res => {
                if (isSuccess(res.status)) resolve(res.data.response as Array<Leaderboard>)
                else reject(res.data.message)
            })
        })
    }

    set(data: UpdateSummaryData): Promise<void> {
        return new Promise((resolve, reject) => {
            http.post('/summary-data', this.toHttp(data)).then(res => {
                if (isSuccess(res.status)) resolve()
                else reject(res.data.message)
            })
        })
    }

    private toHttp(data: UpdateSummaryData): UpdateSummaryDataHttp {
        return {
            token: this.token,
            incrBy: data.incrBy,
            metric0: data.metric0,
            metric1: data.metric1,
            metric2: data.metric2,
            metric3: data.metric3,
            metric4: data.metric4
        }
    }
}

export default SummaryData;
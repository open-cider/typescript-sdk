/* User - user related interfaces... */
export interface User {
    id: string,
    username?: string,
    emailAddress?: string,
    avatar?: string
}

export interface UpdateUser {
    username?: string,
    emailAddress?: string,
    avatar?: string
}

export interface UpdateUserHttp {
    token: string,
    username?: string,
    emailAddress?: string,
    avatar?: string
}

/* Summary Data - summary data related interfaces... */
export interface Leaderboard {
    userId: string,
    username: string,
    avatar: string,
    metric1: number,
    metric2: number,
    metric3: number,
    metric4: number,
    timestamp: number
}


export interface SummaryData {
    metric0: string,
    metric1: number,
    metric2: number,
    metric3: number,
    metric4: number
}

export interface UpdateSummaryData{
    incrBy: boolean,
    metric0?: string,
    metric1?: number,
    metric2?: number,
    metric3?: number,
    metric4?: number
}

export interface UpdateSummaryDataHttp{
    token: string,
    incrBy: boolean,
    metric0?: string,
    metric1?: number,
    metric2?: number,
    metric3?: number,
    metric4?: number
}

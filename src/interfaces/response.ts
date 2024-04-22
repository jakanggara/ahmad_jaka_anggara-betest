export interface BaseResponse<T> {
    data: T
    message: string
    meta: any
}

export interface AuthorizedRequest {
    id: string
}

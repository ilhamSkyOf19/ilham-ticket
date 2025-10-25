// response 
export type ResponseType<T> = {
    status: 'success' | 'failed',
    message: string,
    data: T
}


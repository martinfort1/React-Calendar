export const initialState = {
    status: 'checking',
    user: {},
    errorMessage: undefined,
}
export const authenticatedState = {
    status: 'authenticated',
    user: {
        uid: 'abc123',
        name: 'Martin'
    },
    errorMessage: undefined,
}
export const notAuthenticatedState = {
    status: 'not-authenticated',
    user: {},
    errorMessage: undefined,
}
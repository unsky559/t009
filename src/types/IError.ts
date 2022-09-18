export default interface IError {
    status: number,
    error: {
        fields?: Record<string, string>[],
        code: string
    }
};

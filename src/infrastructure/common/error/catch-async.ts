type ServerBlogError = {
  status: string;
  statusCode: number;
  message: string;
};

export const catchAsync =
  (fn: Function) =>
  <I, O>(...args: I[]): Promise<O> =>
    fn(...args).catch(({ message }: ServerBlogError) => {
      throw new Error(message);
    });

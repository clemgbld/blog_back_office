type ServerBlogError = {
  status: string;
  statusCode: number;
  message: string;
};

export const catchAsync =
  (fn: any) =>
  (...args: any[]) =>
    fn(...args).catch(({ message }: ServerBlogError) => {
      throw new Error(message);
    });

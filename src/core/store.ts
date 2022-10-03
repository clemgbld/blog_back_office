export const createStore = () => ({
  getState: () => ({
    articles: {
      status: "idle",
      data: [],
    },
  }),
});

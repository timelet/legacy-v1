export const createSubscriptionEffect = (subscribe) => () => {
  const subscription = subscribe();
  return function cleanUp() {
    subscription?.unsubscribe();
  };
};
export const createAsyncSubscriptionEffect = (subscribe) => () => {
  const subscription = subscribe();
  return function cleanUp() {
    subscription.then((sub) => sub?.unsubscribe());
  };
};

export const createSubscriptionEffect = (subscribe) => () => {
  const subscription = subscribe();
  return function cleanUp() {
    subscription?.unsubscribe();
  };
};

export const createSubscriptionEffect = (subscribe) => {
  let subscription;
  Promise.resolve(subscribe()).then((sub) => {
    subscription = sub;
  });
  return function cleanUp() {
    subscription?.unsubscribe();
  };
};

export const sessionizeUser = (user) => {
  return { userId: user._id, userName: user.fullName };
};

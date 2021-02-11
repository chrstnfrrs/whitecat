import jsonwebtoken from 'jsonwebtoken';

export const createAccessToken = (user) => {
  return jsonwebtoken.sign(
    {
      email: user.email,
      tokenVersion: user.tokenVersion,
      uuid: user.uuid,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' },
  );
};

import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {
  // This userId is actuallu elements '_id' , so always be unique
  const token = jwt.sign({ userId }, process.env.hashkey);
  res.cookie('chatter', token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: 'strict',
    httpOnly: true,
    //secure: true,
  });

  return token;
};

export default generateToken;

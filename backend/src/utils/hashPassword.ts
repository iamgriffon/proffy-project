import bcrypt from 'bcrypt';

const hashPassword = async(password: String) => {
  try {
    const encryptedPw =  await bcrypt.hash(password, 10);
    return encryptedPw;
  } catch(err) {
    console.log('Could not hash your password, error is:', err);
  }
}

export default hashPassword
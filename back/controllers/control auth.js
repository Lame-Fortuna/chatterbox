import bcrypt from 'bcryptjs';      // For hashing
import crypto from 'crypto';        // For en/decryption
import User from '../models/user.model.js';
import generateToken from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js'

const secretKey = process.env.secretKey

// Encryption
function encrypt(text) {
  const algorithm = 'aes-256-cbc';
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

// Decryption
function decrypt(encryptedText) {
  const algorithm = 'aes-256-cbc';
  try {
    if (!encryptedText.includes(':')) throw new Error('Invalid format');
    const [iv, encrypted] = encryptedText.split(':');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error.message);
    throw new Error('Decryption failed');
  }
}


export const signup = async (req, res) => {
  const { fullName, email, password } = req.body

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" })
    }

    const user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: "Email already exists" })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    })

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      })
    } else {
      res.status(400).json({ message: "Invalid user data" })
    }
  } catch (error) {
    console.log("Error in signup controller", error.message)
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const logout = (req, res) => {
  try {
    res.cookie("chatter", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// For future - email verified signup
/*
// SignUp Verification Link
export const signup = async (req, res) =>{
    const { usr, email, pwd } = req.body;

    if (!usr || !email || !pwd) 
        return res.status(400).send({message: 'All fields required'});
    
    if (length(pwd) < 6) 
        return res.status(400).send({message: 'Password must be atlest 6 characters long'});

    const userExists = await User.findOne({email_ID: email});
    if (userExists) 
        return res.status(400).json({message: "Email already exists"});

    const encrypted = encrypt(`${usr},${email},${pwd}`);
    console.log(`localhost:9000/signup/${encrypted}`);
    mailer.sendVerificationEmail(email, encrypted);
    res.status(200).json({message: "Check your email inbox"});
}

// Verified and account made
export const signup2 = async (req, res) =>{
    try {
        const decrypted = decrypt(req.params.info);
        const [usr, email, pwd] = decrypted.split(',');

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);

        const userExists = await User.findOne({email_ID: email });
        if (userExists) 
            return res.status(400).json({message: "Account is already verified, you can login"});

        await new User({ username: usr, email_ID: email, password: hashedPwd }).save();
        res.status(200).json({message: 'Verified'});
    } catch (error) {
        console.error('Signup error:', error.message);
        res.status(500).json({message: 'Internal server error'})
    }
}
*/
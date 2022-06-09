const {
  validateEmail,
  validateLength,
  validateUsername,
} = require('../helpers/validation');
const User = require('../models/User');
const Code = require('../models/Code');
const bcrypt = require('bcrypt');
const { generateToken } = require('../helpers/tokens');
const { sendVerificationEmail, sendResetCode } = require('../helpers/mailer');
const jwt = require('jsonwebtoken');
const { generateCode } = require('../helpers/generateCode');

exports.register = async (req, res) => {
  try {
    const { first_name, last_name, email, password, bYear, bMonth, bDay, gender } =
      req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: 'Invalid email address',
      });
    }

    const check = await User.findOne({ email });
    if (check) {
      return res.status(400).json({
        message: 'This email address already exists',
      });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: 'First name must be between 3 and 30 characters',
      });
    }

    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: 'Last name must be between 3 and 30 characters',
      });
    }

    if (!validateLength(password, 6, 20)) {
      return res.status(400).json({
        message: 'Password must be between 6 and 20 characters',
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    const user = await new User({
      first_name,
      last_name,
      username: newUsername,
      email,
      password: cryptedPassword,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();

    const emailVerificationToken = generateToken({ id: user._id.toString() }, '1d');
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);

    const token = generateToken({ id: user._id.toString() }, '7d');
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: 'Registration Successful! Please verify your email to start',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.activateAccount = async (req, res) => {
  try {
    const validUserId = req.user.id;
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const check = await User.findById(user.id);

    if (validUserId !== user.id) {
      return res.status(400).json({
        message: "You don't have the autorization to complete this operation.",
      });
    }

    if (check.verified === true) {
      return res.status(400).json({
        message: 'This account is already verified',
      });
    } else {
      await User.findByIdAndUpdate(user.id, {
        verified: true,
      });
      return res.status(200).json({
        message: 'Account verified successfully',
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'The email you entered is not connected to an account.',
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: 'Invalid credentials. Please try again.',
      });
    }
    const token = generateToken({ id: user._id.toString() }, '7d');
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.sendVerification = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (user.verified === true) {
      return res.status(400).json({
        message: 'This account is already verified.',
      });
    }
    const emailVerificationToken = generateToken({ id: user._id.toString() }, '1d');
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    res.status(200).json({
      message: 'Check your inbox for verification email.',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      return res.status(400).json({
        message: 'No user found with this email address.',
      });
    }
    return res.status(200).json({
      email: user.email,
      picture: user.picture,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.sendResetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select('-password');
    await Code.findOneAndRemove({ user: user._id });
    const code = generateCode(5);
    await new Code({
      code,
      user: user._id,
    }).save();
    sendResetCode(user.email, user.first_name, code);
    return res.status(200).json({
      message: 'Reset password code sent to your Email.',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.validateResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    const codeObj = await Code.findOne({ user: user._id });
    if (codeObj.code !== code) {
      return res.status(400).json({
        message: 'Verification code is wrong.',
      });
    }
    return res.status(200).json({ message: 'Code verification successful.' });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const cryptedPassword = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate(
      { email },
      {
        password: cryptedPassword,
      }
    );
    return res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

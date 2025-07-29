import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    res.json({ success: false, message: "All fields are required" });
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    res.json({ success: false, message: "Username or Email already exists" });
  }

  // const avatarLocalPath = req.files?.avatar[0]?.path;

  // if (!avatarLocalPath) {
  //   res.json({ success: false, message: "Profile picture is required" });
  // }

  // const avatar = await uploadOnCloudinary(avatarLocalPath);

  // if (!avatar) {
  //   res.json({ success: false, message: "profile pictore not uploaded" });
  // }

  const user = await User.create({
    fullName,
    username: username.toLowerCase(),
    email,
    password,
    // aboutMe,
    // avatar: avatar.url,
  });

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    res.json({
      success: false,
      message: "Something went wrong while creating the user",
    });
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { createdUser, accessToken },
        "User Registered Successfully"
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email) {
    res.json({ success: false, message: "Username or Email required" });
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    res.json({ success: false, message: "User does not exist" });
  }
  const isValidPassword = await user.isPassWordCorrect(password);
  if (!isValidPassword) {
    res.json({ success: false, message: "Invalid credentials" });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPassWordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});



export {
  changeCurrentPassword,
  getCurrentUser, loginUser,
  logoutUser, registerUser
};


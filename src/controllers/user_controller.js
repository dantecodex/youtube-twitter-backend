import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user_model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
    // Get user detail from frontend aka POSTMAN
    const { fullName, email, username, password } = req.body
    console.log(fullName, email, username, password);

    // Validation which is to check all password and email are in proper way like non-empty
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "") //check if fields are empy or not
    ) {
        throw new ApiError(400, "All fields are required")
    }

    // Check if User is already exist like username and email
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with Email or username already exist")
    }

    // Files are available like {required: true} (images,avatar)
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.file?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    // Upload to Cloudinary and check avatar is uploaded
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    // create user object - create entry in DB (.create)
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // check for user creation or response is null
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    // return response

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully"))


})

export { registerUser }
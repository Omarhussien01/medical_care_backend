import User from "../models/UserModel.js";

import asyncHandler from 'express-async-handler';

export const updateUser = asyncHandler(async (req, res) =>{
    const { id } = req.params;
    try {
        // Your update logic here
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        // Handle errors
        throw new Error(error);
    }
});

export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        // Your delete logic here
        const deletedUser = await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, data: deletedUser });
    } catch (error) {
        // Handle errors
        throw new Error(error);
    }
});

export const getSingleUser = asyncHandler(async (req, res) =>{
    const { id } = req.params;
    try {
        // Your get single user logic here
        const user = await User.findById(id).select("-password");
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        // Handle errors
        throw new Error(error);
    }
});

export const getAllUsers = asyncHandler(async (req, res) =>{
    try {
        // Your get all users logic here
        const users = await User.find({}).select("-password");
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        // Handle errors
        throw new Error(error);
    }
});


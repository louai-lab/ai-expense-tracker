"use server"

import { connectToDB } from "../mongoose";
import User from "../models/user.model";

export async function createUser(user: string) {
    try {
        await connectToDB()
        const newUser = await User.create(user);
        return JSON.parse(JSON.stringify(newUser))
    } catch (error) {
        console.log(error)
    }
}

export async function fetchUser(userId: string) {
    // console.log(userId)
    try {
        connectToDB()

        return await User.findOne({ id: userId })
    } catch (error: any) {
        throw new Error(`Failed to fetch user : ${error.message}`)
    }
}
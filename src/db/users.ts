import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();

export const getUserById = async (id: string) => UserModel.findById(id);

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});

export const createUser = async (values: Record<string, any>) => {
    try {
        const user = new UserModel(values);
        const savedUser = await user.save();
        return savedUser.toObject();
    } catch (error) {
        console.log('Error creating user:', error);
    }
}

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });

export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);
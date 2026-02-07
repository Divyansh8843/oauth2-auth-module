import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

export const generateAccessToken = (user: IUser) => {
    return jwt.sign(
        { id: user._id, roles: user.roles },
        process.env.JWT_SECRET!,
        { expiresIn: '15m' } // Short-lived
    );
};

export const generateRefreshToken = (user: IUser) => {
    return jwt.sign(
        { id: user._id },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: '7d' } // Long-lived
    );
};

export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    } catch (error) {
        return null;
    }
};

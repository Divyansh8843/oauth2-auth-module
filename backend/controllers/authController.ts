import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'postmessage'
);

export const googleLogin = async (req: Request, res: Response) => {
    const { code } = req.body;
    try {
        const { tokens } = await client.getToken(code);
        const idToken = tokens.id_token;
        if (!idToken) throw new Error('No ID Token found');

        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload) throw new Error('Invalid Token Payload');

        const { sub, email, name, picture } = payload;
        
        let user = await User.findOne({ googleId: sub });
        if (!user) {
            user = await User.create({
                googleId: sub,
                email,
                name,
                picture
            });
        } else {
            // Update profile with latest info from Google
            user.name = name || user.name;
            user.picture = picture || user.picture;
            await user.save();
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Secure Cookie for Refresh Token
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Essential for cross-site (Vercel -> Render)
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.json({
            accessToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                roles: user.roles
            }
        });
    } catch (error) {
        console.error('Google Login Error:', error);
        res.status(401).json({ message: 'Google authentication failed' });
    }
};

export const refresh = async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized, no refresh token' });

    const refreshToken = cookies.jwt;
    
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;
        
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: 'Unauthorized, user not found' });

        const accessToken = generateAccessToken(user);
        
        res.json({ accessToken });
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden, invalid refresh token' });
    }
};

export const logout = (req: Request, res: Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); 
    
    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production'
    });
    res.json({ message: 'Cookie cleared' });
};

export const getProfile = async (req: Request, res: Response) => {
    const user = await User.findById((req as any).user.id).select('-password');
    if(!user) return res.status(404).json({message: 'User not found'});
    res.json(user);
};

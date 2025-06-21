const express = require('express');
const axios = require('axios');
const User = require('../models/User');

const router = express.Router();

// URLs OAuth Google
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo';

// URLs OAuth Facebook
const FACEBOOK_AUTH_URL = 'https://www.facebook.com/v13.0/dialog/oauth';
const FACEBOOK_TOKEN_URL = 'https://graph.facebook.com/v13.0/oauth/access_token';
const FACEBOOK_USERINFO_URL = 'https://graph.facebook.com/me';

// 1. Redirigir a Google OAuth
router.get('/login/google', (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
  });
  res.redirect(`${GOOGLE_AUTH_URL}?${params.toString()}`);
});

// 2. Callback Google
router.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('No code received');

  try {
    // Obtener access token
    const tokenRes = await axios.post(GOOGLE_TOKEN_URL, new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    }).toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const accessToken = tokenRes.data.access_token;

    // Obtener perfil usuario
    const userRes = await axios.get(GOOGLE_USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const profile = userRes.data;

    // Guardar o actualizar usuario en MongoDB
    let user = await User.findOne({ provider: 'google', providerId: profile.id });
    if (!user) {
      user = new User({
        provider: 'google',
        providerId: profile.id,
        nombre: profile.name,
        email: profile.email,
        foto: profile.picture,
      });
      await user.save();
    }

    // Guardar sesión
    req.session.userId = user._id;
    req.session.nombre = user.nombre;

    // Redirigir a frontend (ajusta la URL)
    res.redirect('http://localhost:3000');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en autenticación Google');
  }
});

// 3. Redirigir a Facebook OAuth
router.get('/login/facebook', (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.FACEBOOK_CLIENT_ID,
    redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
    response_type: 'code',
    scope: 'email public_profile',
  });
  res.redirect(`${FACEBOOK_AUTH_URL}?${params.toString()}`);
});

// 4. Callback Facebook
router.get('/auth/facebook/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('No code received');

  try {
    // Obtener access token
    const tokenRes = await axios.get(FACEBOOK_TOKEN_URL, {
      params: {
        client_id: process.env.FACEBOOK_CLIENT_ID,
        client_secret: process.env.FACEBOOK_CLIENT_SECRET,
        redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
        code,
      }
    });

    const accessToken = tokenRes.data.access_token;

    // Obtener perfil usuario
    const userRes = await axios.get(FACEBOOK_USERINFO_URL, {
      params: {
        access_token: accessToken,
        fields: 'id,name,email,picture',
      }
    });

    const profile = userRes.data;

    // Guardar o actualizar usuario en MongoDB
    let user = await User.findOne({ provider: 'facebook', providerId: profile.id });
    if (!user) {
      user = new User({
        provider: 'facebook',
        providerId: profile.id,
        nombre: profile.name,
        email: profile.email,
        foto: profile.picture.data.url,
      });
      await user.save();
    }

    // Guardar sesión
    req.session.userId = user._id;
    req.session.nombre = user.nombre;

    // Redirigir a frontend
    res.redirect('http://localhost:3000');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en autenticación Facebook');
  }
});

// 5. Obtener datos usuario autenticado
router.get('/me', (req, res) => {
  if (!req.session.userId) return res.status(401).json({ mensaje: 'No autenticado' });

  res.json({
    userId: req.session.userId,
    nombre: req.session.nombre,
  });
});

// 6. Logout y destruir sesión
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ mensaje: 'Error al cerrar sesión' });
    res.clearCookie('connect.sid');
    res.json({ mensaje: 'Sesión cerrada' });
  });
});

module.exports = router;

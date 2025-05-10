import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { nom, email, sujet, message } = data;

    // Configuration du transporteur d'emails
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'horizondimpact3.01@gmail.com',
        pass: 'kkzx mfvy nlei yqup' // Mot de passe d'application
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Configuration de l'email
    const mailOptions = {
      from: 'horizondimpact3.01@gmail.com',
      to: 'horizondimpact3.01@gmail.com',
      subject: `Nouveau message de contact : ${sujet}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Sujet :</strong> ${sujet}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({
      message: 'Email envoyé avec succès'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return new Response(JSON.stringify({
      message: 'Erreur lors de l\'envoi de l\'email'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}; 
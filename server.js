const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.send("Servidor de lavandería funcionando 🚀");
});

// Configurar correo (Gmail ejemplo)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "juliangarces@lavanti.com",
    pass: "gptp bxci qrgu uhmq"
  }
});

app.post("/enviar", async (req, res) => {
  const { email, pdfBase64 } = req.body;

  try {
    await transporter.sendMail({
      from: "juliangarces@lavanti.com",
      to: email,
      subject: "Comprobante de Devolución",
      text: "Adjunto tu comprobante",
      attachments: [
        {
          filename: "comprobante.pdf",
          content: pdfBase64.split("base64,")[1],
          encoding: "base64"
        }
      ]
    });

    res.send("Correo enviado");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al enviar");
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
"use server";

import { v4 as uuidv4 } from "uuid";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function uploadImagesAction(formData: FormData) {
  const currentSession = await auth.api.getSession({
    headers: await headers(),
  });

  if (!currentSession) {
    throw new Error(`User not Authenticated`);
  }

  const images = formData.getAll("images"); // el nombre debe coincidir con el input

  if (!images.length) {
    throw new Error("No images uploaded");
  }

  const uploadedImages = [];

  for (const file of images) {
    if (!(file instanceof File)) continue;

    // Validaciones básicas
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "image/svg+xml",
      "image/heic", // iPhone HEIC format (si quieres soportarlo)
      "image/heif",
      // vídeos
      "video/mp4",
      "video/quicktime", // .mov
      "video/x-matroska", // .mkv
      "video/webm",
      "video/avi",
      "video/mpeg",
      // Añade más si fuera necesario
    ];
    if (!allowedTypes.includes(file.type)) {
      throw new Error(`Tipo de archivo no permitido: ${file.type}`);
    }

    const maxImageSize = 30 * 1024 * 1024; // 100MB para imagen
    const maxVideoSize = 200 * 1024 * 1024; // 500MB para vídeo

    if (file.size > maxImageSize) {
      throw new Error(
        `Archivo demasiado grande (${Math.round(file.size / 1024 / 1024)} MB)`
      );
    }

    // Subir el archivo a almacenamiento (ejemplo simple con sistema de ficheros)
    // En producción te recomiendo usar Cloud Storage como AWS S3, Cloudinary, etc.
    // Aquí ejemplo simple con 'fs/promises' (solo en server!!!!)

    // Importante: Next.js 13 app directory corre código server, pero no puedes usar rutas relativas simples

    const buffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    const path = require("path");
    const fs = require("fs/promises");

    // Carpeta pública o dedicada para uploads
    const uploadsDir = path.resolve(
      `./public/uploads/${currentSession.user.email}`
    );

    // Crear carpeta si no existe
    await fs.mkdir(uploadsDir, { recursive: true });

    // Generar nombre único: por ej, cuid + extensión
    const extension = path.extname(file.name);
    const filename = `${uuidv4()}${extension}`;
    const filepath = path.join(uploadsDir, filename);

    await fs.writeFile(filepath, fileBuffer);

    // Guardar en base de datos
    const imageDb = await prisma.image.create({
      data: {
        filename: file.name,
        url: `/uploads/${currentSession.user.email}/${filename}`, // ruta pública relativa
        mimetype: file.type,
        size: file.size,
      },
    });

    uploadedImages.push(imageDb);
  }

  return uploadedImages;
}

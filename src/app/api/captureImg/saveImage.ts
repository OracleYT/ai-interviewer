import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const saveImage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // Get the base64 image data and filename from the request body
      const { imageBase64, filename } = req.body;


      if (!imageBase64 || !filename) {
        console.log("Image data or filename is missing.")
        return res.status(400).json({ error: 'Image data or filename is missing.' });
      }

      // Remove base64 prefix and convert it to binary
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      // Convert the buffer to a Uint8Array if needed (works with fs.writeFileSync directly)
      const uint8Array = new Uint8Array(buffer);

      // Define the file path to save the image in the public/captureImg folder
      const filePath = path.join(process.cwd(), 'public', 'captureImg', filename);

      // Ensure the 'captureImg' folder exists
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Write the buffer (or uint8Array) to a file
      fs.writeFileSync(filePath, uint8Array);

      // Respond with success message and the image URL
      res.status(200).json({ message: 'Image saved successfully!', imageUrl: `/captureImg/${filename}` });
    } catch (error) {
      console.error('Error saving image:', error);
      res.status(500).json({ error: 'Failed to save image.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default saveImage;

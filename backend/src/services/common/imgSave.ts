import multer from "multer";
import { Request, Response } from "express";

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
      const tempName = Date.now() + "_" + file.originalname;
      // imgs.push(tempName);
      callback(null, tempName);
    },
  }),
});

export default [
  upload.array("upload"),
  (req: Request, res: Response) => {
    console.log(req.files);
    const files: any = req.files;
    const fileUrls: string[] = [];
    files.forEach((item: any) => {
      fileUrls.push(`http://localhost:3000/imgs/${item.filename}`);
    });

    console.log(fileUrls);

    res.json({
      uploaded: true,
      url: fileUrls,
    });
  },
];

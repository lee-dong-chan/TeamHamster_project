import multer from "multer";
import { Request, Response } from "express";

const upload: multer.Multer = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
      file.originalname = Buffer.from(file.originalname, "ascii").toString("utf8");
      const tempName = Date.now() + "_" + file.originalname;
      callback(null, tempName);
    },
  }),
});

export default [
  upload.array("img"),
  (req: Request, res: Response) => {
    console.log(req.files);
    const files: any = req.files;
    const fileUrls: string[] = [];
    files.forEach((item: any) => {
      // fileUrls.push(`http://localhost:3001/api/imgs/${item.filename}`);
      fileUrls.push(`${item.filename}`);
    });
    console.log(fileUrls);

    res.json({
      uploaded: true,
      url: fileUrls,
    });
  },
];

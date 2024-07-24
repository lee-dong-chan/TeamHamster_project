/// 몽고DB 스키마관련
import mongoose, { Schema } from "mongoose";

const deliveryscham = new Schema(
  {
    userId: Number,
    productId: Number,
    spotX: Number,
    spotY: Number,
  },
  {
    timestamps: true,
  }
);

const pointscham = new Schema(
  {
    pointPercent: Number,
  },
  {
    timestamps: true,
  }
);

const keywordscham = new Schema(
  {
    word: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

///

const delivery = mongoose.model("delivery", deliveryscham);
const point = mongoose.model("point", pointscham);
const bankeyword = mongoose.model("bankeyword", keywordscham);

export { delivery, point, bankeyword };

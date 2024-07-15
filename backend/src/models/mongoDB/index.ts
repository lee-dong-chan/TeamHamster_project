/// 몽고DB 스키마관련
import mongoose, { Schema } from "mongoose";

const url = "mongodb://localhost:27017";

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

///

/// 몽고 DB 연결관련
mongoose.connect(url);

mongoose.connection.on("connected", () => {
  console.log("mongoose connection");
});

// mongoose.connection.dropCollection("teamhamsters");
// 이건 컬렉션(mysql로 치면 테이블)삭제

///

const delivery = mongoose.model("delivery", deliveryscham);

export { delivery };

// let connectDB: Promise<Mongoose>;

// connectDB = Mongoose.connect(url);

// Mongoose.connection.on((),=>{})

// let testmogs = new Mongoose(url).db("teamhamster");

// export { testmogs };

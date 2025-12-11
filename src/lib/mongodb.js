import { MongoClient, ObjectId } from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const mongodbUri = process.env.mongoUri;
if (!mongodbUri) throw new Error("MONGO URI tidak valid...\nSilahkan Cek kembali...\n\n");

const client = new MongoClient(mongodbUri, {});
let clientPromise = client.connect();

export { clientPromise };

export class MongoDB {
  constructor(colName) {
    this.dbName = "UrEyes";
    this.colName = colName;
    this.db = null;
  }

  async getCollection() {
    if (!this.db) {
      this.client = await clientPromise;
      this.db = this.client.db(this.dbName);
    }
    return this.db.collection(this.colName);
  }

  // ==== SESSION ====
  async createSession(userID) {
    if (this.colName != "sessions") return null;
    const sessionID = crypto.randomUUID().split("-").join("");
    const data = {
      sessionID,
      userID,
      expires: Date.now() + 1000 * 60 * 59,
    };
    const col = await this.getCollection();
    await col.insertOne(data);
    return data.sessionID;
  }
  async getUserFromSession(sessionID) {
    if (this.colName != "sessions") return null;
    const col = await this.getCollection();
    const session = await col.findOne({ sessionID: sessionID });
    if (!session) return null;
    // Cek Expired
    if (Date.now() > session.expires) {
      await col.deleteOne({ sessionID: sessionID });
      return null;
    }
    this.colName = "accounts";
    const col2 = await this.getCollection();
    return await col2.findOne({ _id: session.userID });
  }
  async deleteSession(sessionID) {
    if (this.colName != "sessions") return null;
    const col = await this.getCollection();
    return await col.deleteOne({ sessionID: sessionID });
  }

  // ==== ACCOUNT ====
  async checkAccount(email, password) {
    if (this.colName != "accounts") return null;
    const col = await this.getCollection();
    const getAccount = await col.findOne({ email: email });
    if (!getAccount) return null;
    if (getAccount.password == password) {
      return getAccount;
    } else {
      return null;
    }
  }
  async addAccount(email, password) {
    if (this.colName != "accounts") return null;
    const col = await this.getCollection();
    // Cek apabila ada akun dengan email yang sama
    const getEmail = await col.findOne({ email: email });
    if (getEmail) return { action: false, msg: "Email ini sudah digunakan!" };
    // Tambahkan Akun
    const data = {
      email,
      username: email,
      password: password,
      urlProfile: "/img/profile.png",
    };
    try {
      await col.insertOne(data);
      return { action: true, msg: "Akun telah dibuat!" };
    } catch {
      return { action: false, msg: "Terjadi kesalahan!" };
    }
  }
  async updateAccount(username, password, userID) {
    if (this.colName != "accounts") return null;
    const col = await this.getCollection();
    try {
      await col.updateOne({ _id: userID }, { $set: { username: username } });
      if (password !== "") await col.updateOne({ _id: userID }, { $set: { password: password } });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  async deleteAccount(userID) {
    if (this.colName != "accounts") return null;
    let col = await this.getCollection();
    try {
      await col.deleteOne({ _id: userID });
      this.colName = "likes";
      col = await this.getCollection();
      await col.deleteMany({ userID: userID });
      this.colName = "playlists";
      col = await this.getCollection();
      await col.deleteMany({ userID: userID });
      return { err: false, msg: "Akun berhasil dihapus." };
    } catch {
      return { err: true, msg: "Terjadi Kesalahan, coba lagi nanti!" };
    }
  }

  //   ==== READ ====
  async getAll() {
    const col = await this.getCollection();
    return await col.find({}).toArray();
  }
  async getTopFilms() {
    if (this.colName != "films") return null;
    const col = await this.getCollection();
    return await col.find({}).sort({ rating: -1 }).limit(5).toArray();
  }
  async getAllJuduls() {
    if (this.colName != "films") return null;
    const col = await this.getCollection();
    return await col.find({}).project({ judul: 1 }).toArray();
  }
  async searchFilm(keyword) {
    if (this.colName != "films") return null;
    const col = await this.getCollection();
    return await col
      .find({
        judul: { $regex: keyword, $options: "i" },
      })
      .limit(15)
      .toArray();
  }
  async searchByID(_id) {
    const col = await this.getCollection();
    return await col.findOne({ _id: new ObjectId(_id) });
  }
  async searchLike_Playlist_ByID(userID, filmID) {
    const col = await this.getCollection();
    return await col.findOne({ userID: new ObjectId(userID), filmID: new ObjectId(filmID) });
  }
  async getLike_Playlist_byUserID(userID) {
    const col = await this.getCollection();
    return await col.find({ userID: userID }).toArray();
  }

  // ==== INSERT ====
  async addPlaylist(userID, filmID) {
    const col = await this.getCollection();
    return await col.insertOne();
  }
  async addLike_Playlist(userID, filmID) {
    const col = await this.getCollection();
    const likeAlready = await col.findOne({ userID: userID, filmID: filmID });
    if (!likeAlready) {
      return await col.insertOne({ filmID: filmID, userID: userID });
    }
  }

  // ==== DELETE ====
  async rmLike_Playlist(userID, filmID) {
    const col = await this.getCollection();
    return await col.deleteOne({ filmID: filmID, userID: userID });
  }
  async deleteOne(_id) {
    const col = await this.getCollection();
    return await col.deleteOne({ _id: _id });
  }
}

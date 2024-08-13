import { db } from "@/lib/firebase";
import { IChat } from "@/lib/redux/chat";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

export class ChatService {
  async add(data: IChat) {
    try {
      const chat = await addDoc(collection(db, "chats"), {
        name: data.name,
        text: data.text,
        date: data.date.toISOString(),
      });
    } catch (err) {
      throw err;
    }
  }

  async list() {
    try {
      const chatsQuery = query(collection(db, "chats"), orderBy("date", "asc"));

      const querySnapshot = await getDocs(chatsQuery);

      const dataArray = querySnapshot.docs.map((doc) => doc.data());

      return dataArray;
    } catch (err) {
      throw err;
    }
  }
}

const chatService = new ChatService();
export default chatService;

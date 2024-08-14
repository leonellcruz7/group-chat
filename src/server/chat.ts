import { db } from "@/lib/firebase";
import { IChat } from "@/lib/redux/chat";
import { reverse } from "dns";
import {
  addDoc,
  collection,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
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

  async list(chatId?: string): Promise<IChat[]> {
    try {
      let chatsQuery = query(
        collection(db, "chats"),
        orderBy("date", "desc"),
        limit(10)
      );

      if (chatId) {
        const lastDocRef = doc(db, "chats", chatId || "");
        const lastDocSnapshot = await getDoc(lastDocRef);
        if (lastDocSnapshot.exists()) {
          chatsQuery = query(chatsQuery, startAfter(lastDocSnapshot));
        }
      }

      const querySnapshot = await getDocs(chatsQuery);

      const dataArray: any = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .reverse();

      return dataArray;
    } catch (err) {
      throw err;
    }
  }
}

const chatService = new ChatService();
export default chatService;

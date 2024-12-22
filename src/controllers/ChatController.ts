import API, { ChatApi } from '../api/chatAPI.ts';
import store from '../utils/Store.ts';
import MessageController from './MessageController.ts';

class ChatController {
  private readonly api: ChatApi;

  constructor() {
    this.api = API;
  }

  async createChat(title: string) {
    try {
      await this.api.createChat(title);

      this.fetchChats();
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchChats() {
    try {
      const chats = await this.api.getChats();

      chats.map(async (chat) => {
        const token = await this.getChatToken(chat.id);
        if (token) {
          await MessageController.connect(chat.id, token);
        }
      });

      store.set('chats', chats);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async addUserToChat(id: number, userId: number) {
    try {
      await this.api.addUsers(id, [userId]);
      await this.fetchChats();
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async deleteChat(id: number) {
    try {
      await this.api.deleteChat(id);

      this.fetchChats();
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async deleteUserFromChat(id: number, userId: number) {
    try {
      await this.api.deleteUserFromChat(id, userId);
      await this.fetchChats();
    } catch (e: any) {
      console.error(e.message);
    }

    return null;
  }

  getChatToken(id: number) {
    try {
      return this.api.getChatToken(id);
    } catch (e: any) {
      console.error(e.message);
    }

    return null;
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }

  async getChatUsers(id: number) {
    try {
      return this.api.getuser(id);
    } catch (e: any) {
      console.error(e.message);
    }

    return null;
  }
}

export default new ChatController();

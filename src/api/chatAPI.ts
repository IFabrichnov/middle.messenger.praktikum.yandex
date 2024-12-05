import BaseAPI from './baseAPI.ts';
import { IUser } from './authAPI.ts';

export interface ChatInfo {
  id: number;
  title: string;
  avatar: string;
  unread_count: number
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    },
    time: string;
    content: string;
  }
}

export class ChatApi extends BaseAPI {
  constructor() {
    super('/chats');
  }

  createChat(title: string) {
    return this.http.post('/', { title });
  }

  deleteChat(id: number): Promise<unknown> {
    return this.http.delete('/', { chatId: id });
  }

  getuser(id: number): Promise<Array<IUser & { role: string }>> {
    return this.http.get(`/${id}/users`);
  }

  getChats(): Promise<ChatInfo[]> {
    return this.http.get('/');
  }

  deleteUserFromChat(id: number, userId: number) {
    return this.http.delete('/users', { chatId: id, users: [userId] });
  }

  addUsers(id: number, users: number[]): Promise<unknown> {
    return this.http.put('/users', { users, chatId: id });
  }

  async getChatToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`);

    return response.token;
  }
}

export default new ChatApi();

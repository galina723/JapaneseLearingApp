import axios from 'axios';
import { User } from '../models/User';
import { connector } from './service';

export class accountService {
  static async getProfile() {
    const res = await connector.get('/user/profile');
    console.log(res);

    if (res.status === 200) {
      return res.data.data as User[];
    } else {
      return fail;
    }
  }
}

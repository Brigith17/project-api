import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { response } from 'express';
import { map } from 'rxjs';
import axios from 'axios';

@Injectable()
export class GithubService {
  constructor(private httpService: HttpService) {}

  public async getUsers(): Promise<any> {
    try {
      const response = await axios({
        method: 'GET',
        url: 'https://api.github.com/users',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

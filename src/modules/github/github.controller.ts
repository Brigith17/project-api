import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { GithubService } from './github.service';
import { ok } from 'assert';
import { of, pipe } from 'rxjs';
import { from, Observable } from 'rxjs';
import { response } from 'express';

@Controller('github')
export class GithubController {
  constructor(private gitHubService: GithubService) {}

  @Get()
  async getRepositories(@Res() res) {
    const data = await this.gitHubService.getUsers();
    return res.status(HttpStatus.OK).json(data);
  }
}

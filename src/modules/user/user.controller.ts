import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  Query,
  HttpStatus,
  NotFoundException,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { MorganInterceptor } from 'nest-morgan';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(): any {
    return this.userService.findAll();
  }

  // Add User: /user/create
  @Post('/create')
  async createUser(@Res() res, @Body() createProductDTO: CreateUserDto) {
    const user = await this.userService.createUser(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Usuario creado exitosamente',
      user,
    });
  }

  // Delete User: /delete?userID=5c9d45e705ea4843c8d0e8f7
  @UseInterceptors(MorganInterceptor('combined'))
  @Delete('/delete')
  async deleteUser(@Res() res, @Query('userID') userID) {
    const userDeleted = await this.userService.deleteUser(userID);
    if (!userDeleted) throw new NotFoundException('Usuario no existe!');
    return res.status(HttpStatus.OK).json({
      message: 'Usuario borrado exitosamente!',
      userDeleted,
    });
  }

  // Update User: /update?userID=5c9d45e705ea4843c8d0e8f7
  @Put('/update')
  async updateUser(
    @Res() res,
    @Body() createUserDTO: CreateUserDto,
    @Query('userID') userID,
  ) {
    const updatedUser = await this.userService.updateUser(
      userID,
      createUserDTO,
    );
    if (!updatedUser) throw new NotFoundException('User no existe!');
    return res.status(HttpStatus.OK).json({
      message: 'Usuario modificado exitosamente!',
      updatedUser,
    });
  }
}

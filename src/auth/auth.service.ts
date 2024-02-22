import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService
  ){}

  async login(loginUserDto: LoginUserDto) {

    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: {email},
      select: { id: true, email: true, password: true}
    })

    if(!user) throw new UnauthorizedException('Email no valido')

    if(! bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Password no valido')


    return {
      success:true, 
      ...user,
      token: this.getJwtToken({ id: user.id })
    }
    
    // try {
    

    // } catch (error) {

    //   this.handleDBErrors(error)

    // }

  }


  async create(createUserDto: CreateUserDto) {
    
    try {
    
      const { password, ...userData } = createUserDto
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      })

      await this.userRepository.save(user)

      delete user.password

      return {
        success:true, 
        ...user,
        token: this.getJwtToken({ id: user.id })
      }

    } catch (error) {

      this.handleDBErrors(error)

    }
  }

  
  async checkAuthStatus(user : User){
    
    return {
      success:true, 
      ...user,
      token: this.getJwtToken({ id: user.id })
    }
  }


  private handleDBErrors(error: any){
    
    if(error.code == '23505')
    {
      throw new BadRequestException(error.detail)
    }

    this.logger.error(error)

    throw new InternalServerErrorException('Unexpected error, check error log')

  }


  private getJwtToken( payload: JwtPayload){

    const token = this.jwtService.sign(payload);

    return token
  }

}

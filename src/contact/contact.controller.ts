import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { GetUser } from 'src/auth/decorators/user.decorator';
import { User } from '@prisma/client';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';

@Controller('api/contact')
export class ContactController {
  constructor(private contact: ContactService) {}

  @Get('')
  async getAllContacts(@GetUser() { id }: User) {
    return await this.contact.getAllContacts(id);
  }

  @Get(':contactId')
  async getSingleContact(@Param() contactId: string) {
    return await this.contact.getSingleContact(contactId);
  }

  @Post('')
  async createNewContact(
    @GetUser() { id }: User,
    @Body() createDto: CreateContactDto,
  ) {
    return await this.contact.createNewContact(id, createDto);
  }

  @Post(':contactId')
  async updateContact(
    @Param() contactId: string,
    @Body() updateDto: UpdateContactDto,
  ) {
    return await this.contact.updateContact(contactId, updateDto);
  }

  @Delete(':contactId')
  async deleteSingleContact(@Param() contactId: string) {
    return await this.contact.deleteSingleContact(contactId);
  }
}

import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateContactDto, UpdateContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async getAllContacts(id: string) {
    return await this.prisma.contact.findMany({
      where: {
        userId: id,
      },
    });
  }

  async getSingleContact(id: string) {
    return await this.prisma.contact.findUnique({
      where: {
        id,
      },
    });
  }

  async createNewContact(id: string, createDto: CreateContactDto) {
    const contact = await this.prisma.contact.create({
      data: {
        ...createDto,
        userId: id,
      },
    });

    return {
      message: 'Contact created successfully',
      data: { ...contact },
      statusCode: HttpStatus.OK,
    };
  }

  async updateContact(id: string, update: UpdateContactDto) {
    const contact = await this.prisma.contact.update({
      where: {
        id,
      },
      data: {
        ...update,
      },
    });

    return {
      message: 'Contact updated successfully',
      data: { ...contact },
      statusCode: HttpStatus.OK,
    };
  }

  async deleteSingleContact(id: string) {
    return await this.prisma.contact.delete({
      where: {
        id,
      },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Prisma } from '@prisma/client'; 
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = search
      ? {
          name: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        }
      : {};

    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: 'desc' },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      message: 'Berhasil mengambil data produk',
      data,
      meta: {
        page,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async create(dto: CreateProductDto, userId: number) {
    const product = await this.prisma.product.create({
      data: {
        ...dto,
        userId,
      },
    });

    return {
      message: 'Produk berhasil ditambahkan',
      data: product,
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Produk tidak ditemukan');
    }

    return {
      message: 'Berhasil mengambil detail produk',
      data: product,
    };
  }

  async update(id: number, dto: CreateProductDto) {
    const product = await this.prisma.product.update({
      where: { id },
      data: dto,
    });

    return {
      message: 'Produk berhasil diperbarui',
      data: product,
    };
  }

  async remove(id: number) {
    await this.prisma.product.delete({
      where: { id },
    });

    return {
      message: 'Produk berhasil dihapus',
    };
  }
}

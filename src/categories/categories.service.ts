import { Injectable, NotAcceptableException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { FindManyOptions, ILike, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    try {
      const category = this.categoryRepository.create(createCategoryDto);

      return await this.categoryRepository.save(category);
    } catch (error) {
      // Handle the error appropriately (e.g., log, throw custom exception)
      throw new Error('Failed to create category');
    }
  }

  async findAll(
    page: number,
    perPage: number,
    query: string | null,
  ): Promise<Category[]> {
    try {
      const skip = (page - 1) * perPage;
      const findOptions: FindManyOptions<Category> = {
        skip,
        take: perPage,
      };

      if (query) {
        findOptions.where = {
          name: ILike(`%${query}%`),
        };
      }

      return await this.categoryRepository.find(findOptions);
    } catch (error) {
      // Handle the error appropriately (e.g., log, throw custom exception)
      throw new NotAcceptableException(error.message);
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      return await this.categoryRepository.findOneBy({ id });
    } catch (error) {
      // Handle the error appropriately (e.g., log, throw custom exception)
      throw new Error(`Failed to fetch category with ID ${id}`);
    }
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOneBy({ id });
      if (!category) {
        throw new Error(`Category with ID ${id} not found`);
      }
      Object.assign(category, updateCategoryDto);
      return await this.categoryRepository.save(category);
    } catch (error) {
      // Handle the error appropriately (e.g., log, throw custom exception)
      throw new Error(`Failed to update category with ID ${id}`);
    }
  }

  async remove(id: number): Promise<string> {
    try {
      await this.categoryRepository.delete(id);
      return 'Your category has been removed successfully.';
    } catch (error) {
      // Handle the error appropriately (e.g., log, throw custom exception)
      throw new Error(`Failed to remove category with ID ${id}`);
    }
  }
}

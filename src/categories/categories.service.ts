import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

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

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      // Handle the error appropriately (e.g., log, throw custom exception)
      throw new Error('Failed to fetch categories');
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

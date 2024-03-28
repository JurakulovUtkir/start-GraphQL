import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { Category } from './entities/category.entity';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  createCategory(
    @Args('createCategoryInput')
    createCategoryInput: CreateCategoryDto,
  ) {
    return this.categoriesService.create(createCategoryInput);
  }

  @Query(() => [Category])
  findAllCategories() {
    return this.categoriesService.findAll();
  }

  @Query(() => Category)
  findOneCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategoryInput')
    updateCategoryInput: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(
      updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation(() => String)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.remove(id);
  }
}

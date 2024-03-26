import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsInt, Min } from 'class-validator';

@InputType()
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id: number;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  category_id: number;
}

import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsInt, Min } from 'class-validator';

@InputType()
export class CreateCategoryDto {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  category_id: number;
}

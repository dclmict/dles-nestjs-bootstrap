import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class PaginationMetadataDto {
  @ApiProperty({
    description: 'Page Number',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }: { value: string }) => Number(value))
  @IsInt({ message: 'Page number must be an integer' })
  @Min(1, { message: 'Page number must be at least 1' })
  page?: number;

  @ApiProperty({
    description: 'Rows Per Page',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }: { value: string }) => Number(value))
  @IsInt({ message: 'Number of rows per page must be an integer' })
  @Min(1, { message: 'Number of rows per page must be at least 1' })
  rows_per_page?: number;

  @ApiProperty({
    description: 'Search String',
    required: false,
  })
  @IsOptional()
  @IsString()
  search_str?: string;
}

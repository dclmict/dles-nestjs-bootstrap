import { Injectable } from '@nestjs/common';
import { PaginationMetadataDto } from './dto';

@Injectable()
export class UtilsService {
  HttpSuccess<T>(statusCode: number, message: string, data: T) {
    return {
      statusCode,
      message,
      data,
    };
  }

  queryPaginator(paginationMetaDataDto: PaginationMetadataDto) {
    const page = paginationMetaDataDto?.page || 1;
    const rowsPerPage = paginationMetaDataDto?.rows_per_page || 100;

    return {
      offset: (page - 1) * rowsPerPage,
      limit: rowsPerPage,
    };
  }

  shapePaginatedResponse<T>(
    paginated_data: T,
    paginationMetaData: PaginationMetadataDto,
    count: number,
  ) {
    return { paginated_data, metadata: { ...paginationMetaData, count } };
  }
}

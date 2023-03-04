export interface PagedApiResponseModel {
    totalRecordsCount: number;
    pageRecordsCount: number;
    pageCount: number;
    pageSize: number;
    pageNumber: number;
    orderBy: SortInfoModel;
}

export interface SortInfoModel {
    orderBy: string;
    orderDirection: string;
}
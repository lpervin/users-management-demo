export interface PagerViewModel{
    currentPageNumber: number;
    pageSize: number;

    sortByName: string;
    orderBy: string;

    numberOfpages: number;
    AvailabelPages: Array<number>;
    VisiablePageRanges: Array<number>;
    NextPageRangeAvailable: boolean;
    PreviousPageRangeAvailable: boolean;
    PagesRangeSize: number;
}
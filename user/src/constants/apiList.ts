export const PAGE_SIZE = 10;
export const isThereNext = (total: number, page: number) => {
  const numOfPages = total / PAGE_SIZE;
  return numOfPages > page;
};

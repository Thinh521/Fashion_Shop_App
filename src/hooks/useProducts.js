import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchProducts} from '../api/productApi';

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({pageParam = 1}) => fetchProducts({pageParam}),
    getNextPageParam: lastPage => lastPage.nextPage,
    staleTime: 5 * 60 * 1000,
  });
};

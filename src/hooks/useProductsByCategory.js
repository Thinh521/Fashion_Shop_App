import {useQuery} from '@tanstack/react-query';
import {fetchProductsByCategory} from '../api/productApi';

export const useProductsByCategory = slug => {
  return useQuery({
    queryKey: ['productsByCategory', slug],
    queryFn: () => fetchProductsByCategory(slug),
    enabled: !!slug,
  });
};

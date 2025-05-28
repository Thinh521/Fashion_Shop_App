import {useQuery} from '@tanstack/react-query';
import {fetchCategories} from '../api/categiriesApi';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};

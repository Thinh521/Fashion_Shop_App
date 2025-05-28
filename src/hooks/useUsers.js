import {useQuery} from '@tanstack/react-query';
import {fetchUsers} from '../api/userApi';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};

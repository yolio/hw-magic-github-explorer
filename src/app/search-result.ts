import { User } from './user';

export class SearchResult {
  total_count: number;
  incomplete_results: boolean;
  items: User[];
}

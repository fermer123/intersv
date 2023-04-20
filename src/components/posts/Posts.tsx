import {useAppDispatch, useAppSelector} from '@src/hooks/redux';
import {
  FC,
  useEffect,
  useCallback,
  useState,
  useMemo,
  ChangeEvent,
} from 'react';
import {Pagination, Stack} from '@mui/material';
import styled from 'styled-components';
import {fetchData} from '@src/store/slice/BlogSlice';
import PostItem from '../postItem/PostItem';
import ErrorLoading from '../errorLoading/ErrorLoading';

const PostsItemsWrapper = styled(Stack)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
`;

const PaginationItems = styled(Pagination)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0;
`;

const Posts: FC = () => {
  const [currPage, setCurrPage] = useState<number>(1);

  const [itemsPerPage] = useState(5);

  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.Blog.posts);
  const error = useAppSelector((state) => state.Blog.error);
  const loading = useAppSelector((state) => state.Blog.loading);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const lastItemIndex = currPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;

  const pageNumber = useMemo(() => {
    const pageNumberCells: number[] = [];
    for (let i = 1; i <= Math.ceil(posts.length / itemsPerPage); i += 1) {
      pageNumberCells.push(i);
    }
    return pageNumberCells;
  }, [itemsPerPage, posts.length]);

  const currentItem = posts.slice(firstItemIndex, lastItemIndex);
  const pagination = useCallback(
    (e: ChangeEvent<unknown>, value: number) => {
      setCurrPage(value);
    },
    [setCurrPage],
  );

  if (loading) {
    return <ErrorLoading text='Loading' />;
  }
  if (error) {
    return <ErrorLoading text='Error' />;
  }
  return (
    <PostsItemsWrapper>
      {currentItem?.map((e) => (
        <PostItem key={e.id} {...e} />
      ))}
      <PaginationItems
        color='primary'
        page={currPage}
        count={pageNumber.length}
        onChange={pagination}
      />
    </PostsItemsWrapper>
  );
};

export default Posts;

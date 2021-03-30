import { Flex, Text, Button, Link as StyledLink } from 'rebass/styled-components';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import Loader from 'react-loader-spinner';
import { removeBook } from '../api';

export const BookItem = ({id, title, author}) => {
  const queryClient = useQueryClient();
  const {mutateAsync, isLoading} = useMutation(removeBook);

  const remove = async () => {
    await mutateAsync(id);
    queryClient.invalidateQueries('books');
  };

  return (
    <Flex p={3} width="100%" alignItems="center">
      <Text mr="auto">{title}</Text>
      <Text>{author}</Text>

      <Link component={StyledLink} to={`/update-book/${id}`}>
        <Button ml="5">Update</Button>
      </Link>

      <Button ml="3" onClick={remove}>
        {isLoading ? <Loader type="ThreeDots" color="#FFF" height={10}/> : 'Remove'}
      </Button>
    </Flex>
  );
};

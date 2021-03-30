import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Box, Flex, Heading } from 'rebass/styled-components';
import Loader from 'react-loader-spinner';
import { BookForm, Container } from '../shared';
import { createBook } from '../api';

const defaultValues = {
  id: null,
  title: null,
  author: null
};

export const CreateBook = () => {
  const history = useHistory();
  const {mutateAsync, isLoading} = useMutation(createBook);

  const onFormSubmit = async data => {
    await mutateAsync(data);
    history.push('/');
  };

  if (isLoading) {
    return (
      <Container>
        <Flex py="5" justifyContent="center">
          <Loader type="ThreeDots" color="#CCC" height={30}/>
        </Flex>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{py: 3}}>
        <Heading sx={{marginBottom: 3}}>Create New Book</Heading>
        <BookForm defaultValues={defaultValues} onFormSubmit={onFormSubmit} isLoading={isLoading}/>
      </Box>
    </Container>
  );
}

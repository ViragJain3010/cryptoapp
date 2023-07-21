import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { server } from '../index';
import Loader from './Loader';
import Error from './Error.jsx';
import {
  Container,
  HStack,
  Image,
  VStack,
  Heading,
  Text,
} from '@chakra-ui/react';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges?per_page=100`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchExchanges();
  }, []);

  if (error) return <Error message={'Error while fething Exchanges'} />;
  else {
    return (
      <Container maxW={'container.xl'}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
              {exchanges.map(i => (
                <ExchangeCard
                  name={i.name}
                  img={i.image}
                  rank={i.trust_score_rank}
                  url={i.url}
                  key={i.id}
                />
              ))}
            </HStack>
          </>
        )}
      </Container>
    );
  }
};

const ExchangeCard = ({ name, img, rank, url }) => {
  return (
    <a href={url} target={'blank'}>
      <VStack
        width={'52'}
        margin={4}
        shadow={'xl'}
        padding={8}
        borderRadius={'lg'}
        transition={'all 0.3s'}
        css={{
          '&:hover': { transform: 'scale(1.1)' },
        }}
      >
        <Image
          src={img}
          objectFit={'contain'}
          w={'16'}
          h={'16'}
          alt="Exchange"
        />
        <Heading size={'md'} noOfLines={1}>
          {rank}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  );
};

export default Exchanges;

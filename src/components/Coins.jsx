import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  Button,
  ButtonGroup,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import { MdFirstPage } from 'react-icons/md';

const Exchanges = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr');
  const [page, setPage] = useState(1);

  const currencySymbol =
    currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';

  const changePage = page => {
    setPage(page);
    setLoading(true);
  };

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchExchanges();
  }, [currency, page]);

  if (error) return <Error message={'Error while fetching coins'} />;

  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={4}>
            <HStack spacing={4}>
              <Radio value="inr">INR</Radio>
              <Radio value="eur">EUR</Radio>
              <Radio value="usd">USD</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {coins.map(i => (
              <CoinCard
                type={i.market_cap_change_24h}
                name={i.name}
                img={i.image}
                symbol={i.symbol}
                currencySymbol={currencySymbol}
                price={i.current_price}
                id={i.id}
                key={i.id}
              />
            ))}
          </HStack>
          <HStack justifyContent={'space-between'} marginBottom={4} padding={4}>
            <ButtonGroup>
              <Button
                bgColor={'blackAlpha.900'}
                color={'white'}
                onClick={() => changePage(1)}
              >
                <MdFirstPage color={'white'} />
              </Button>
              <Button
                bgColor={'blackAlpha.900'}
                color={'white'}
                onClick={() => changePage(page + 1)}
              >
                Next Page
              </Button>
            </ButtonGroup>
            <Button
              bgColor={'blackAlpha.900'}
              color={'white'}
              onClick={() => changePage(page - 1)}
              isDisabled={page === 1 ? true : false}
            >
              Previous Page
            </Button>
          </HStack>
        </>
      )}
    </Container>
  );
};

const CoinCard = ({
  name,
  type,
  img,
  symbol,
  id,
  price,
  currencySymbol = '₹',
}) => {
  return (
    <Link to={`/coin/${id}`}>
      <VStack
        width={'60'}
        margin={4}
        shadow={'xl'}
        paddingY={8}
        paddingX={4}
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
          {symbol}
        </Heading>
        <Text noOfLines={1}>{name}</Text>
        <Text noOfLines={1} color={type >= 0 ? 'green.600' : 'red.500'}>
          {price ? `${currencySymbol} ${price}` : 'NA'}
        </Text>
      </VStack>
    </Link>
  );
};

export default Exchanges;

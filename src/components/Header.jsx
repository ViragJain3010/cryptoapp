import React from 'react';
import { HStack, Button } from '@chakra-ui/react';

const Header = () => {
  return (
    <HStack p='4' shadow={'base'} bgColor={'blackAlpha.900'} gap={'4'}>
      <Button variant={'unstyled'} color={'white'}>
        <a href="/">Home</a>
      </Button>
      <Button variant={'unstyled'} color={'white'}>
        <a href="/coins">Coins</a>
      </Button>
      <Button variant={'unstyled'} color={'white'}>
        <a href="/exchanges">Exchanges</a>
      </Button>
    </HStack>
  );
};

export default Header;
 
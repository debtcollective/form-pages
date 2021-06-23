import React from 'react';
import logo from '../../img/logo-light.svg';
import logoSmall from '../../img/logo-dark.svg';

const Header = () => {
  return (
    <dc-header
      logo={logo}
      logosmall={logoSmall}
      community={process.env.GATSBY_COMMUNITY_URL}
      returnurl={process.env.GATSBY_HOST_URL}
      id="dc-header"
    />
  );
};

export default Header;
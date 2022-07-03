import React, { useEffect, useState } from 'react';
import components from '../design-systems/material-ui';
import AbstractRenderer from '../infrastructure/AbstractRenderer';
import {globalNavigation} from '../templates/patterns';

const Home = () => {
  const [pageConfig, setPageConfig] = useState([]);

  useEffect(() => {
    fetch('/api/test-page')
      .then((response) => response.json())
      .then((json) => {
        setPageConfig(json);
      })
  }, []);

  return <AbstractRenderer pageConfig={[...globalNavigation, ...pageConfig]} components={components} />
};

export default Home;

import React, {useEffect, useState} from 'react';
import components from '../design-systems/material-ui/components';
import render from '../components/uiRenderer';

const Home = () => {
    const [pageConfig, setPageConfig] = useState([]);

    useEffect(() => {
        fetch('/api/test-page')
          .then((response) => response.json())
          .then((json) => {
            setPageConfig(json);
        })
      }, []);
   
     return render(pageConfig, components)
};

export default Home;

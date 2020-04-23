import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'; // Pour les components => toujours mettre des lettres majuscules en 1er
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder></BurgerBuilder>
        </Layout>
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import './App.css';
import {ArticleList} from './pages/homePage';
import {Switch, Route, withRouter} from 'react-router-dom';
import {ArticleOne} from './pages/ArticleOne';
import {ArticleTwo} from './pages/ArticleTwo';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

import './pageTransitions/slideTransition.scss';

class App extends Component {
  componentWillReceiveProps() {
    this.setState({prevDepth: this.getPathDepth(this.props.location)});
  }

  getPathDepth(location) {
    let pathArr = location.pathname.split('/');
    pathArr = pathArr.filter(n => n !== '');
    return pathArr.length;
  }

  render() {
    const {location} = this.props;

    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = {enter: 1000, exit: 1000};

    return (
      <TransitionGroup component="div" className="App">
        <CSSTransition
          key={currentKey}
          timeout={timeout}
          classNames="pageSlider"
          mountOnEnter={false}
          unmountOnExit={true}>
          <div className={this.getPathDepth(location) > 0 ? 'left' : 'right'}>
            <Switch location={location}>
              <Route path="/" exact component={ArticleList} />
              <Route path="/article-one" component={ArticleOne} />
              <Route path="/article-two" render={ArticleTwo} />
            </Switch>
          </div>
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withRouter(App);

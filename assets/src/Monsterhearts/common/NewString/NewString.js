import React, { Component } from 'react'
import { string, number, bool, func, shape, object, arrayOf } from 'prop-types'
import rx from 'resplendence'
  
import Character from './Character';
import NewSideCharacter from '../NewSideCharacter';

rx`
@import '~common/styles';
@import '~Monsterhearts/colors';
@import '~Monsterhearts/fonts';
`

const Container = rx('div')`
  width: 100%;
  max-width: 600px;
`

class NewString extends Component {
  static propTypes = {
    id: number.isRequired, 
    characters: arrayOf(number).isRequired, 
    charactersById: object.isRequired,
    slowActionsById: object.isRequired,
    createString: func.isRequired, 
    goBack: func.isRequired
  }
  
  state = {
    actionId: null
  }

  createString = ({from, to}) => {
    const {createString, goBack} = this.props;
    const actionId = createString({from, to});
    this.setState({actionId}); 
  }

  componentWillUpdate(nextProps) {
    const { actionId } = this.state;
    if(actionId) {
      const { slowActionsById, goBack } = this.props;
      if (slowActionsById[actionId] && !nextProps.slowActionsById[actionId]) {
        goBack();
      }
    }
  }
  
  render() {
    const { id, characters, charactersById, createString } = this.props;
    const { actionId } = this.state;
    let content;
    if (!actionId) {
      content = characters
        .map(c => {
          const { name, notes, mainCharacter } = charactersById[c];
          const playbook = mainCharacter ? mainCharacter.playbook : null
          return (
            <Character 
              key={c} 
              id={c} 
              createString={this.createString}
              myId={id} 
              {...{name, notes, playbook}}/>
          )
        })
      return (
        <Container>
          {content}
          <NewSideCharacter/>
        </Container>
      );
    }
    return null;
  }
}

export default NewString;
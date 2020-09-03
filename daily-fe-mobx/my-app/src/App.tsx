import React from 'react';
import { observer } from 'mobx-react';

interface IProps { 
  timePassed: any
}
interface IState { }

@observer
class App extends React.Component<IProps, IState> { 

  state = {}

  render() { 
    return (
      <div>
        {this.props.timePassed.seconds}
      </div>
    )
  }
}

export default App;

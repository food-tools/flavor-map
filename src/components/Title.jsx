import * as React from 'react';
import { Segment, Header } from 'semantic-ui-react';

const Title = () => (
  <Segment basic>
    <Header size="small">
      The Flavor Map
    </Header>
    <Header.Subheader>
      Visualizing tasty ingredient pairings
    </Header.Subheader>
  </Segment>
);

export default Title;

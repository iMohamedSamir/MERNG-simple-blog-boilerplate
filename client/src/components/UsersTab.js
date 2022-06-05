import React from 'react'
import { Tab } from 'semantic-ui-react'

const panes = [
  { menuItem: 'Users', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
  { menuItem: 'Posts', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
]

const UsersTab = () => (
  <Tab grid={{ paneWidth: 14, tabWidth: 2 }} menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} renderActiveOnly={true} />
)

export default UsersTab
import React from 'react'
import { storiesOf } from '@storybook/react'
import Badge from './Badge'

storiesOf('Badge', module)
  .add('default', () => <Badge>Hello 💩</Badge>)
  .add('with styles as props', () =>
    <Badge style={{ color: 'lime', backgroundColor: 'pink' }}>Stylish 💩</Badge>
  )

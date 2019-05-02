import React from 'react'
import { Button as NativeButton, Text } from 'native-base'

export default (props) => (
  <NativeButton>
    <Text>{props.label}</Text>
  </NativeButton>
)

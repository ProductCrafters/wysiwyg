import React from 'react'
import { Card as CardNative, CardItem, Body, Text } from 'native-base'

export default (props) => (
  <CardNative>
    <CardItem>
      <Body>
        <Text>{props.text}</Text>
      </Body>
    </CardItem>
  </CardNative>
)

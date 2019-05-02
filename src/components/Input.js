import React from 'react'
import { Item, Input as InputNative, Label, Form, Text } from 'native-base'

export default (props) => (
  <Form>
    <Item fixedLabel>
      <Label>{props.label}</Label>
      <InputNative />
    </Item>
  </Form>
)

import React from 'react'
import { Item, Input as InputNative, Label, Form, Text } from 'native-base'

export default (props) => {
  return (
    <Form>
      <Item stackedLabel>
        <Label>{props.label}</Label>
        <InputNative
          onChangeText={(text) => {
            console.log(text)
          }}
        />
      </Item>
    </Form>
  )
}

import * as React from 'react';
import { View, ScrollView } from 'react-native';
import {policy} from './../Core/data'
import { Text } from 'react-native-elements';

export interface IPolicyProps {
}

export default function Policy (props: IPolicyProps) {
  return (
    <ScrollView>
      <Text h3>
        {policy.header}
      </Text>
      <Text h4>
        {policy.paragraph1.header}
      </Text>
      <Text>
        {policy.paragraph1.text}
      </Text>
      <Text h4>
        {policy.paragraph2.header}
      </Text>
      <Text>
        {policy.paragraph2.text}
      </Text>
      <Text h4>
        {policy.paragraph3.header}
      </Text>
      <Text>
        {policy.paragraph3.text}
      </Text>
      <Text h4>
        {policy.paragraph4.header}
      </Text>
      <Text>
        {policy.paragraph4.text}
      </Text>
      <Text h4>
        {policy.paragraph5.header}
      </Text>
      <Text>
        {policy.paragraph5.text}
      </Text>
      <Text h4>
        {policy.paragraph6.header}
      </Text>
      <Text>
        {policy.paragraph6.text}
      </Text>
      <Text h4>
        {policy.paragraph7.header}
      </Text>
      <Text>
        {policy.paragraph7.text}
      </Text>
      <Text h4>
        {policy.paragraph8.header}
      </Text>
      <Text>
        {policy.paragraph8.text}
      </Text>
    </ScrollView>
  );
}

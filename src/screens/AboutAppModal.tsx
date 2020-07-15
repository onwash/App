import * as React from 'react';
import { Modal, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

export interface IAboutAppModalProps {
  modal: boolean
  setModal: React.Dispatch<boolean>
}

export default function AboutAppModal (props: IAboutAppModalProps) {
  return (
    <Modal
      animationType={'slide'}
      transparent={false}
      visible={props.modal}
      onDismiss={() => props.setModal(false)}
      onRequestClose = {() => props.setModal(false)}
    >
      <View >
        <Text>1</Text>
        <Button
          onPress = {() => props.setModal(false)} 
          title='Close' 
        />
      </View>
    </Modal>
  );
}

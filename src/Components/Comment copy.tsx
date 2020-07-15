import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CommentDataType } from './../Core/data';
import { Rating } from 'react-native-elements';

// export interface ICommentProps {
//   CommentsDataType
// }

export function Comment ({fullname,date,text,raiting,attachments}: CommentDataType) {
  return (
    <View style = {style.container}>
    <View style ={style.firstRow}>
      <View style ={{flexDirection: 'column', justifyContent:'center'}}>
        <Text style = {style.fullname}>{fullname}</Text>
      </View>
      <View style ={{flexDirection: 'column'}}>
        <Text style= {style.date}>{date}</Text>
      </View>
    </View>
    <View><Text>{text}</Text></View>
    <View style = {style.raitingContainer}>
      <Rating
      imageSize={20}
      readonly
      startingValue={raiting}
      // style={{  }}
      />
    </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa', 
    margin:20, 
    padding:10, 
  },
  firstRow:{
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  fullname:{
    margin:5,
    fontSize:16,    
  },
  date:{
    fontSize:10
  },
  raitingContainer:{ 
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    padding:5
}
})
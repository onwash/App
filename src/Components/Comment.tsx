import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CommentDataType } from './../Core/data';
import { Rating, Avatar } from 'react-native-elements';

// export interface ICommentProps {
//   CommentsDataType
// }

export function Comment ({fullname,date,text,raiting,attachments,avatarURI}: CommentDataType) {
  return (
    <View style = {style.container}>
      <View style = {style.date}><Text style={style.date_text}>{date}</Text></View>
      <View style={{flexDirection:'row', alignItems:"center"}}>
      <View>
        <Avatar
          size="medium"
          rounded
          source={{uri:avatarURI}}
        />
      </View>
        <View style ={{ margin: 10,paddingRight:10}}>
          <View>
          <Text style ={style.fullname}>{fullname}</Text>
          </View>
          <View style={{padding:10, flexWrap:'nowrap'}}>
          <Text style={style.commenttext}>{text}</Text>
          </View>
        </View>
        </View>
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
    flexDirection: 'column',
    justifyContent:'space-between'
  },
fullname:{
    margin:5,
    fontSize:16,    
  },
  commenttext:{
    color:'#a9a9a9'
  },
  date:{
    flexDirection:'row',
    justifyContent:'flex-end'
  },
  date_text:{
    fontSize:10
  },
  raitingContainer:{ 
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    padding:5
}
})
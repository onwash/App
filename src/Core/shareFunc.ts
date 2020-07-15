import { Share } from "react-native"


export const ShareApp = (title:string, message:string, url:string):void =>{
  Share.share({
    title: title,
    message: `${title}: ${message} ${url}`,
    url:url
  }, {
    dialogTitle: `Share ${title}`
  })
}

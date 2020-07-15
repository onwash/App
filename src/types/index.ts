export type ISignUpInputValues = {
  email: string 
  login: string
  region:any
  phonenumber?: number
  password: string
  repeatpassword: string
}

export type IRegion = { 
  __typename?: string
  id: string | number,
  name: string,
  latitude: number, 
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
  creator?: any
}

export interface IMapSettings{
  id: string
  title: string
  subtitle: string
  selected: boolean
  useInMapOption: boolean
  archived: boolean
  icon:string
  creator:{
    login:string
  }
}

export interface IMiniWashDes {
  coordinatesId?: string
  washname?: string
  adress?: string
  uptime?: string
  options?: Array<IMapSettings>
  social?: {
    raiting?: number
    likesCount?: {
      userId?:string
      count?:number
    }
    views?: {
      userId?:string
      count?:number
    }
  }
  postCount?: number
  region?: string
}

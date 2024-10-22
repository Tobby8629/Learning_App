const setup = {
  project: "66ef1bd6002bd99b2df6",
  platform: 'com.tobby.lms',
  Endpoint: "https://cloud.appwrite.io/v1",
  database: "66f18f6500006e898d7d",
  user: "66f18f7200056fed7a07",
  wishlist: "67108cb8002972974602"
}

import { add, update } from 'lodash';
import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

const client = new Client();
const account = new Account(client)
const avatar = new Avatars(client)
const databases = new Databases(client)
  client
    .setEndpoint(setup.Endpoint)
    .setProject(setup.project)
    .setPlatform(setup.platform);

export const Login = async (login: Login) => {
 return await account.createEmailPasswordSession(login?.email, login?.password);
}

export const Register =  async (data: Data) => {
  try {
    const create = await account.create(ID.unique(), data.email, data.password);
    await Login({ email: data.email, password: data.password });
    const avat = avatar.getInitials(data.username)
    const createUser = await databases.createDocument(
      setup.database,
      setup.user,
      ID.unique(),
      {
        accountId: create.$id,
        username: data.username,
        email: data.email,
        avatar: avat
      }
    ) 
    return createUser
  } catch (err: any) {
    throw new Error(err.message || 'An error occurred');
  }
  
} 

export const CreateWishList = async(data:wishList ) => {
  const getwishes = await databases.listDocuments(
    setup.database,
    setup.wishlist,
  )
  
  const cree = async(update?: any) => {
    await databases.createDocument(
      setup.database,
      setup.wishlist,
      ID.unique(),
      {
        title: data.title,
        wish_id: data.wish_id,
        price: data.price,
        img_1: data.img_1,
        img_2: data.img_2,
        img_3: data.img_3,
        user: update || [data.user] 
    })
  }

  if(getwishes.total <= 0){ 
    {await cree()}
    return
  } 
  
  const checkexist = getwishes?.documents?.find(doc => doc?.wish_id == data?.wish_id)
  if(!checkexist) {
   await cree()
  } 
  else {
    const checkuser = checkexist.user.find((user: any) => user.$id == data.user)
    if(checkuser) {
      const removeuser = checkexist.user.filter((user:any) => user.$id !== data.user)
      await databases.updateDocument(
        setup.database,
        setup.wishlist,
        checkexist?.$id,
        {
          user:removeuser
        }
      )
    }
    else {
      checkexist.user.push(data.user)
      await databases.updateDocument(
        setup.database,
        setup.wishlist,
        checkexist?.$id,
        {
          user:checkexist.user
        }
      )
    }
  }
}

export const getUser = async () => {
  try {
    const result = await account.get();
    const getInfo = databases.listDocuments(
      setup.database,
      setup.user,
      [Query.equal("accountId", result.$id)]
    )
    const getData = ((await getInfo).documents[0])
    const data = {
      id: getData.$id,
      email: getData.email,
      username: getData.username,
      wishlist: getData.wishlist,
      avatar: getData.avatar
    }
     return data 
    }
    catch(err: any){
      console.error(new Error(err.message))
    }
  }
  

export const Logout = async () => {
  try {
   const result = await account.deleteSession("current");
   return result
  }
  catch(err: any){
    console.error(err.message)
  }
}




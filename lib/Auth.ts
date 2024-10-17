const setup = {
  project: "66ef1bd6002bd99b2df6",
  platform: 'com.tobby.lms',
  Endpoint: "https://cloud.appwrite.io/v1",
  database: "66f18f6500006e898d7d",
  user: "66f18f7200056fed7a07",
  wishlist: "67108cb8002972974602"
}

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
  console.log(data)
  const getwishes = await databases.listDocuments(
    setup.database,
    setup.wishlist,
  )
  console.log(getwishes)
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




const setup = {
  project: "66ef1bd6002bd99b2df6",
  platform: 'com.tobby.lms',
  Endpoint: "https://cloud.appwrite.io/v1",
  database: "66f18f6500006e898d7d",
  user: "66f18f7200056fed7a07"
}

import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

const client = new Client();
const account = new Account(client)
const avatar = new Avatars(client)
const databases = new Databases(client)
  client
    .setEndpoint(setup.Endpoint)
    .setProject(setup.project)
    .setPlatform(setup.platform);

const Login = async (login: Login) => {
  await account.createEmailPasswordSession(login?.email, login?.password);
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




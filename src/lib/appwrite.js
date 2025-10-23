import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Appwrite Cloud endpoint
  .setProject("68fa568f000731c0c00b"); // Replace with your Project ID

export const account = new Account(client);
export const registerUser = async (email, password, name) => {
  try {
    const user = await account.create({
      userId: "unique()",
      email,
      password,
      name,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession({ email, password });
    return session;
  } catch (error) {
    throw error;
  }
};


export const logoutUser = async () => {
  try {
    await account.deleteSession({ sessionId: "current" });
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch {
    return null;
  }
};


import {db} from '@/firebase';
import { NextResponse } from 'next/server';
import {collection, addDoc, query, getDocs, orderBy, doc, updateDoc, where} from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const authenticateUser = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      throw new Error("You need to be logged in to fetch chats");
    }
    return user;
  };

const updateExistingChat = async (chatRef, messages) => {
    await updateDoc(chatRef, {
      message: messages,
      timestamp: new Date()
    });
  };
  
  const createNewChat = async (chatsRef, messages) => {
    await addDoc(chatsRef, {
      message: messages,
      timestamp: new Date()
    });
  };



  export async function saveChat(userId, messages, selectedChat) {
    try {
      await authenticateUser();
      const userRef = doc(db, 'users', userId);
      const chatsRef = collection(userRef, 'chats');
  
      // Check if selectedChat exists
      if (selectedChat?.id) {
        const chatRef = doc(chatsRef, selectedChat.id);
        console.log(chatRef)
        await updateExistingChat(chatRef, messages);
      } else {
        // If no selectedChat, check for existing chat with same messages
        const existingChat = await getExistingChat(chatsRef, messages);
  
        if (existingChat) {
          // Update existing chat timestamp
          await updateExistingChat(existingChat.ref, messages);
          return { success: true, chatId: existingChat.id };
        } else {
          // Create new chat if no existing chat found
          await createNewChat(chatsRef, messages);
          console.log('new chat created')
        }
      }
  
      return { success: true };
    } catch (error) {
      console.error('Error saving chat:', error.code, error.message);
      return { success: false, error: error.message };
    }
  }
  
  // Helper function to check for existing chat
  const getExistingChat = async (chatsRef, messages) => {
    const q = query(chatsRef, where('message', '==', messages));
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.docs.length > 0) {
      return { id: querySnapshot.docs[0].id, 
              ref: querySnapshot.docs[0].ref };
    } else {
      return null;
    }
};

export async function getChats(userId){
    try{
        const userRef = doc(db, 'users', userId);
        const chatsRef = collection(userRef, 'chats');
        //If user is in flashCard page then we execute this code
        //const flashCardRef = collection(chatsRef, 'flashcards');
        //Same with this code
        //const practiceTestRef = collection(chatsRef, 'practiceTests');
        const q = query(chatsRef, orderBy('timestamp', 'desc'));
        //Same here
       // const q_flashcards = query(flashCardRef, orderBy('timestamp', 'desc'));
       //And here
        //const q_practiceTests = query(practiceTestRef, orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
    }catch(error){
        console.error('Error getting chats:', error.message);
        return {error: error.message};
    }
}


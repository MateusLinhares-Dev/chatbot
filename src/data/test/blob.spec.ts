import { expect, test } from 'vitest'
import { BlobStateFactory } from '../blobstorage'
import { BlobsStorage } from 'botbuilder-azure-blobs'
import { env } from '../../services/env'
import { ConversationState, UserState } from 'botbuilder'

const stringBlob = env.BlobConnectionString
const containerBlob = env.BlobContainerName

test('create an instance storage blob', () =>{
    const storage = new BlobStateFactory(stringBlob, containerBlob)
                        .withCreateStorage()
                        
    const storageState = storage.getStorageState() 

    expect(storageState).toBeInstanceOf(BlobsStorage)
})

test('create an instance UseState and ConversationState', () => {
    const storage = new BlobStateFactory(stringBlob, containerBlob)
                    .withCreateStorage()
                    .withCreateUserState()
                    .withCreateConversationState()
    
    const userState = storage.getUserState()
    const conversationState = storage.getConversationState()

    expect(userState).toBeInstanceOf(UserState)
    expect(conversationState).toBeInstanceOf(ConversationState)
})
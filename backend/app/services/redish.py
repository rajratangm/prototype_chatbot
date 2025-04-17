from langchain_community.chat_message_histories import RedisChatMessageHistory
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain

# Redis config
redis_url = "redis://localhost:6379"  # Adjust if you're using a hosted Redis

def get_retrieval_qa():
    ...

    # Redis message history with a unique session ID (can be user ID)
    session_id = "user-123"  # Dynamically assign based on logged in user/session
    chat_history = RedisChatMessageHistory(url=redis_url, session_id=session_id)

    # Memory for storing chats
    memory = ConversationBufferMemory(
        memory_key="chat_history",
        chat_memory=chat_history,
        return_messages=True
    )

    # Conversational Retrieval Chain with memory
    qa_chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=vectordb.as_retriever(search_kwargs={"k": 3}),
        memory=memory,
        return_source_documents=True,
        verbose=True
    )

    return qa_chain

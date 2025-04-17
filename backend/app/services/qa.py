

from langchain.chains import RetrievalQA
# from langchain_community.llms import Groq
from langchain_groq import ChatGroq

from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.prompts import PromptTemplate
import os


# Set the persist directory path
persist_directory = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'db')

def get_retrieval_qa():
    """Initializes RetrievalQA using Chroma vector store and Groq LLM with a custom prompt."""
    model_kwargs = {
    "p": 0.8,  # For nucleus sampling
    "k": 40,   # For top-k sampling
        }
    # Initialize the Groq language model
    llm = ChatGroq(
        model="meta-llama/llama-4-scout-17b-16e-instruct",  
        api_key="",  
        temperature=0.3
        # model_kwargs= model_kwargs
    )

    embeddings = HuggingFaceEmbeddings()

   
        

    # Load Chroma vector store from disk
    vectordb = Chroma(
        persist_directory=persist_directory,
        embedding_function=embeddings,
        collection_name="docs",
        
    )

    # Define custom prompt
    prompt_template = PromptTemplate(
        input_variables=["context", "question"],
        template="""
You are an intelligent assistant. not need to make it bold or anything just very informative and interactive.
If the context does not contain the answer to the question, respond with:
"My Documents does not contain such information."

Context:
{context}

Question:
{question}

Answer: Hii learner this is what I found for you
-->
-->
-->
"""
    )

    # Build the RetrievalQA chain with custom prompt
    retrieval_qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vectordb.as_retriever(search_kwargs={"k": 3}),
        return_source_documents=True,
        chain_type_kwargs={"prompt": prompt_template}
    )

    return retrieval_qa

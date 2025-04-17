import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.llms import OpenAI
from langchain.chains import RetrievalQA
from langchain.document_loaders import TextLoader, PyMuPDFLoader
from langchain.document_loaders import DirectoryLoader
from langchain.embeddings import HuggingFaceEmbeddings

logging.info("All imports completed successfully.")

persist_directory = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'db')
logging.info(f"Persist directory set to: {persist_directory}")

def get_vector_store(chunks):
    """Get the vector store."""
    try:
        logging.info("Initializing HuggingFaceEmbeddings...")
        embeddings = HuggingFaceEmbeddings()
        logging.info("HuggingFaceEmbeddings initialized successfully.")

        logging.info("Creating Chroma vector store...")
        vectordb = Chroma.from_documents(
            documents=chunks,
            embedding=embeddings,
            persist_directory=persist_directory,
            collection_name='docs'
        )
        logging.info("Chroma vector store created successfully.")

        logging.info("Persisting vector store...")
        vectordb.persist()
        logging.info("Vector store persisted successfully.")
    except Exception as e:
        logging.error(f"Error in get_vector_store: {e}")

# def load_vector_store():
#     """Load the vector store."""
#     try:
#         logging.info("Initializing OpenAIEmbeddings...")
#         embeddings = OpenAIEmbeddings()
#         logging.info("OpenAIEmbeddings initialized successfully.")

#         logging.info("Loading Chroma vector store...")
#         vector_store = Chroma(
#             persist_directory=persist_directory,
#             embedding_function=embeddings,
#             collection_name="docs"
#         )
#         logging.info("Chroma vector store loaded successfully.")
#         return vector_store
#     except Exception as e:
#         logging.error(f"Error in load_vector_store: {e}")
#         return None

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.schema import Document
from typing import List, Dict, Any
# from loader import load_all_documents_from_folder as load_documents

def chunk_documents(documents: List[Dict[str, Any]]) -> List[Document]:
    """
    Splits documents into smaller chunks using RecursiveCharacterTextSplitter.

    Args:
        documents (List[Dict[str, Any]]): List of documents to be chunked.

    Returns:
        List[Document]: List of chunked documents.
    """
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function= lambda text: len(text.split()),  # Use word count for better chunking
        separators=["\n\n", "\n", " ", ""],  # Prioritize splitting by paragraphs, then lines, then spaces
    )
    return text_splitter.split_documents(documents)



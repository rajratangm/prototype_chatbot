import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from services.embedder import get_vector_store
from services.loader import load_all_documents_from_folder
from services.chunker import chunk_documents
from services.qa import get_retrieval_qa

current_dir = os.path.dirname(os.path.abspath(__file__))
data_folder = os.path.join(current_dir, "data")
def prepare_chroma():
    # Load and chunk documents
    print("Loading documents...")
    documents = load_all_documents_from_folder(data_folder)
    print(f"Loaded {len(documents)} documents.")

    print("Chunking documents...")
    chunks = chunk_documents(documents)
    print(f"Created {len(chunks)} chunks.")

    # Build and persist vector store
    print("Building vector store...")
    vectordb = get_vector_store(chunks)
    # vectordb.persist()
    print("Vector store persisted.")

    # # QA chain
    # print("Setting up RetrievalQA...")
    # qa_chain = get_retrieval_qa()


if __name__ == "__main__":
    prepare_chroma()

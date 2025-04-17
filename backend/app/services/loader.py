from langchain.document_loaders import DirectoryLoader, PyMuPDFLoader, TextLoader
from langchain.schema import Document

def load_all_documents_from_folder(folder_path: str) -> list[Document]:
    """
    Loads all supported documents from a folder using LangChain DirectoryLoader.
    Supports PDFs and TXT files for now.
    """
    loader = DirectoryLoader(
        folder_path,
        glob="**/*",  # Recursive
        show_progress=True,
        loader_cls=lambda path: get_loader_for_file(str(path))
    )

    return loader.load()

def get_loader_for_file(file_path: str):
    """
    Returns appropriate loader based on file extension.
    Extend this as needed.
    """
    if file_path.endswith(".pdf"):
        return PyMuPDFLoader(file_path)
    elif file_path.endswith(".txt"):
        return TextLoader(file_path)
    else:
        raise ValueError(f"Unsupported file format: {file_path}")


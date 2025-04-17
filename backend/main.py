

from fastapi import FastAPI, Request
from pydantic import BaseModel
from app.services.qa import get_retrieval_qa
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI(title="RAG QA API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)
qa_chain = get_retrieval_qa()

class QueryRequest(BaseModel):
    query: str

# Root route
@app.get("/")
async def read_root():
    return {"message": "Welcome to the RAG QA API!"}

# QA endpoint
@app.post("/ask")
async def ask_question(request: QueryRequest):
    try:
        response = qa_chain.invoke({"query": request.query})
        return {
            "query": request.query,
            "answer": response['result'],
            "sources": [doc.page_content for doc in response.get("source_documents", [])]
        }
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

# ------------------------------------------------------------------------------------------------------
# @app.post("/ask")
# async def ask_question(request: QueryRequest):
#     try:
#         response = qa_chain.invoke({"query": request.query})

#         # Build a string from the source documents
#         # sources = [doc.page_content for doc in response.get("source_documents", [])]
#         context_str = "\n\n".join(sources)

#         return {
#             "query": request.query,
#             "answer": response["result"],
#             "context": "this is the context",
#             "related_questions": []  # You can fill this dynamically later
#         }
#     except Exception as e:
#         return {"error": str(e)}


# Run with: uvicorn main_api:app --reload

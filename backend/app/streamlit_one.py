import streamlit as st
import requests

# FastAPI backend URL
API_URL = "http://localhost:8000/ask"

st.set_page_config(page_title="📄 RAG QA Assistant", layout="centered")

st.title("📄 Document QA Assistant")
st.markdown("Ask a question and get an answer based on the uploaded documents.")

# User input
query = st.text_input("Enter your question:", placeholder="e.g. Who was president of India in 1997?")

if st.button("Get Answer") and query.strip():
    with st.spinner("Fetching answer from documents..."):
        try:
            # Send request to FastAPI
            response = requests.post(API_URL, json={"query": query})
            result = response.json()

            # Show result
            if "answer" in result:
                st.subheader("🧠 Answer")
                st.success(result["answer"])

                if result.get("sources"):
                    st.subheader("📚 Source Documents")
                    for idx, src in enumerate(result["sources"], 1):
                        st.markdown(f"**Document {idx}:**")
                        st.code(src, language="markdown")
            else:
                st.error("Something went wrong: " + result.get("error", "Unknown error."))

        except Exception as e:
            st.error(f"Failed to connect to backend: {e}")
else:
    st.caption("Waiting for a question...")

st.markdown("---")
st.caption("Made with 💬 LangChain + FastAPI + Streamlit")

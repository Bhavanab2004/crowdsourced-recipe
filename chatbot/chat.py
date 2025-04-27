import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

llm = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash-001",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    api_key=os.getenv('gemini_api_key')
)

messages = [
    (
        "system",
        "You don't talk anything except about food and chefs. If someone asks you about any other topic you say 'This topic is not relevant to me'"
    ),
    ("human", input()),
]
ai_msg = llm.invoke(messages)
print(ai_msg.content)
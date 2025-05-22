import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from keys import OPENAI_API_KEY, MODEL_NAME, SUPABASE_URL, SUPABASE_ANON, NEWSAPI_KEY

# Export variables for use in other modules
openai_api_key = OPENAI_API_KEY
model_name = MODEL_NAME
supabase_url = SUPABASE_URL
supabase_anon = SUPABASE_ANON
newsapi_key = NEWSAPI_KEY
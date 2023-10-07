import os
import openai

openai.api_key = "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"

# Upload the training data to OpenAI
file_response = openai.File.create(
  file=open("backend/src/logic/AI_computing/output.jsonl", "rb"),
  purpose='fine-tune'
)

# Specify the uploaded file ID in the Fine Tuning Job
file_id = file_response.id

fine_tuning_job = openai.FineTuningJob.create(
  training_file=file_id,  # Use the correct file ID here
  model="gpt-3.5-turbo"  # Use the desired model name here
)

print(fine_tuning_job)
import openai

# Set your OpenAI API key
openai.api_key = "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"

# Specify the fine-tuning job ID you want to check
job_id = "ftjob-Y9tieAfuckTUf5HyYyeJbiFc"

# Fetch the details of the fine-tuning job
job_details = openai.FineTuningJob.retrieve(job_id)

# Check the job status
job_status = job_details['status']

if job_status == 'succeeded':
    print("Fine-tuning job is completed successfully.")
elif job_status == 'failed':
    print("Fine-tuning job has failed.")
else:
    print("Fine-tuning job is still in progress. Current status:", job_status)

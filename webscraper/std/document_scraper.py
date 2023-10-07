import requests
from io import BytesIO
from pdfquery import PDFQuery
import json

urls = [
    "https://standards.nasa.gov/sites/default/files/standards/NASA/Baseline-w/CHANGE-3/3/2020_12_29_nasa-hdbk-4007_w-change_3_revalidated.pdf",
    "https://standards.nasa.gov/sites/default/files/standards/NASA/Baseline-w/CHANGE-1/1/Historical/2013-12-02_NASA-HDBK-4008_Draft1_Clean_Published.pdf",
    "https://standards.nasa.gov/sites/default/files/standards/NASA/w/CHANGE-1/1/nasa-hdbk-4009a_w-chg_1.pdf",
    "https://standards.nasa.gov/sites/default/files/standards/NASA/Baseline-w/CHANGE-1/1/nasa-hdbk-_5010_revalidated.pdf",
    "https://standards.nasa.gov/sites/default/files/standards/NASA/Baseline-w/CHANGE-2/2/2022-12-16-NASA-HDBK-6024_w-Chg-2_Reval-Final.pdf",
    "https://standards.nasa.gov/sites/default/files/standards/NASA/Baseline-w/CHANGE-1/1/nasa-hdbk-6025_w_change_1.pdf",
    "https://standards.nasa.gov/sites/default/files/standards/NASA/Baseline-w/CHANGE-2/2/2021-07-16_nasa-spec-5022_w-change_2_revalidation_w-edit-admin_chgs_final.pdf",
    "https://standards.nasa.gov/sites/default/files/standards/NASA/w/CHANGE-1/1/NASA-STD-4003A_w-Change-1-Revalidated.pdf",
    "https://standards.nasa.gov/sites/default/files/standards/NASA/A/1/2021-11-17_NASA_STD_4005A_w-Change-1-Revalidation-Final.pdf",
    "https://standards.nasa.gov/sites/default/files/standards/NASA/w/Change-1/1/nasa-std-4009a_w-chg_1.pdf",
]

# Create a list to store the text from each PDF
all_pdf_text = []

for url in urls:
    try:
        # Download the PDF from the URL
        response = requests.get(url)
        response.raise_for_status()

        # Create a PDFQuery object from the downloaded PDF content
        pdf = PDFQuery(BytesIO(response.content))
        pdf.load()

        # Extract text elements from the PDF
        text_elements = pdf.pq('LTTextLineHorizontal')

        # Extract text from each element and append it to the list
        pdf_text = [t.text for t in text_elements]
        all_pdf_text.extend(pdf_text)

        # Save the text from each PDF in a separate JSON file
        pdf_text_combined = " ".join(pdf_text)
        pdf_text_data = {"pdf_text_combined": pdf_text_combined}
        pdf_filename = url.split("/")[-1].replace(".pdf", "_text.json")
        with open(pdf_filename, "w") as pdf_json_file:
            json.dump(pdf_text_data, pdf_json_file)
            print(f"PDF text data saved to {pdf_filename}")

    except Exception as e:
        print(f"Error processing {url}: {str(e)}")

# Combine all the text from all the PDFs into one string
all_pdf_text_combined = " ".join(all_pdf_text)

# Save the combined text as a single JSON file
combined_text_data = {"all_pdf_text_combined": all_pdf_text_combined}
with open("combined_pdf_text.json", "w") as combined_json_file:
    json.dump(combined_text_data, combined_json_file)

print("PDF text data saved to separate and combined JSON files.")
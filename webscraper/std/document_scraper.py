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
        all_pdf_text.append({"pdf_text": " ".join(pdf_text)})

    except Exception as e:
        print(f"Error processing {url}: {str(e)}")

# Save all PDF text data in one JSON file
with open("all_pdf_text.json", "w") as json_file:
    json.dump(all_pdf_text, json_file, indent=4)

print("PDF text data saved to all_pdf_text.json.")

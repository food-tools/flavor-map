import PyPDF2

pdfFileObj = open('flavor-bible.pdf', 'rb')
pdfReader = PyPDF2.PdfFileReader(pdfFileObj)

pageObj = pdfReader.getPage(42)

# this isn't working for some reason, text might be in an unexpected format
print(pageObj.extractText())

# file = open("flavor-charts.txt", 'w')
# file.write(pageText)
# file.close()
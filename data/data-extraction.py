from lxml import html

file = open("flavor-bible.html", "rb")
page = file.read()

root = html.fromstring(page)
print(root)
classes = root.get('classes')


print(classes)

# text = html.tostring(root, encoding="utf-8", method="text")

# file = open("flavor-charts.txt", 'w')
# file.write(str(text))
# file.close()

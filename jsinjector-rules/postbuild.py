raw_html = ""
with open('build/index.html','r') as fin:
	raw_html = fin.read()
raw_html = raw_html.replace("/static","static")
raw_html = raw_html.replace("/favicon","favicon")
with open('build/index.html','w') as fout:
	fout.write(raw_html)
print("Post-build script done")
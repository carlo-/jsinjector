##
# postbuild.py
#
# Created by carlo- on 21/01/2018.
# Copyright © 2018 Carlo Rapisarda. All rights reserved.
#
##

raw_html = ""

# Read original HTML file
with open('build/index.html','r') as fin:
	raw_html = fin.read()

# Fix HTML code
raw_html = raw_html.replace("/static","static").replace("/favicon","favicon")

# Write over original HTML file
with open('build/index.html','w') as fout:
	fout.write(raw_html)

print("Post-build script done")

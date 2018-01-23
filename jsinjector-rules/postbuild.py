##
# postbuild.py
#
# Created by carlo- on 21/01/2018.
# Copyright © 2018 Carlo Rapisarda. All rights reserved.
#
##

import os

raw_html = ""

# Read original HTML file
with open('build/index.html','r') as fin:
	raw_html = fin.read()

# Fix HTML code
raw_html = raw_html.replace("/static","static").replace("/favicon","favicon")

# Write over original HTML file
with open('build/index.html','w') as fout:
	fout.write(raw_html)

# Copy the build into the .safariextension container
os.system("cp -r ./build/* ../jsInjector.safariextension/settings/.")

print("Post-build script done")

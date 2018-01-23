##
# postbuild.py
#
# Created by carlo- on 21/01/2018.
# Copyright © 2018 Carlo Rapisarda. All rights reserved.
#
##

import os

# Check build folder
if os.system("ls ./build/index.html > /dev/null 2>&1") != 0:
	print("Build files not found!")
	exit(1)

# Check extension folder
if os.system("ls ../jsInjector.safariextension/settings > /dev/null 2>&1") != 0:
	print("Safari extension container corrupted or not found!")
	exit(2)

raw_html = ""

# Read original HTML file
with open('build/index.html','r') as fin:
	raw_html = fin.read()

# Fix HTML code
raw_html = raw_html.replace("/static","static").replace("/favicon","favicon")

# Write over original HTML file
with open('build/index.html','w') as fout:
	fout.write(raw_html)

# Remove old files and copy the build into the .safariextension container
os.system("rm -r ../jsInjector.safariextension/settings/* > /dev/null 2>&1")
os.system("cp -r ./build/* ../jsInjector.safariextension/settings/. > /dev/null 2>&1")

print("Post-build script done")

import os

# get current directory
current_directory = os.getcwd()

for this_directory, subdirectories, filenames in os.walk(current_directory):
	for directory in subdirectories:
		print(directory)

	print()

	for filename in filenames:
		print(filename)

	# only show contents directly in this directory
	break
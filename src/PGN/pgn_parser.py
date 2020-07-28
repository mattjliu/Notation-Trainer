import json
import os

lines = []
current_string = ''

for file in os.listdir('pgn_files'):
  with open(os.path.join('pgn_files', file), 'r') as f:
    for i, line in enumerate(f):
      if line.startswith('[Event ') and i > 0:
        lines.append({'data': current_string})
        current_string = line
      elif line.startswith('1. '):
        current_string += '\n'
        current_string += line
      else:
        current_string += line
    f.close()

with open('outfile.json', 'w') as f:
  json.dump(lines, f, indent=2)

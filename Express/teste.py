#-*- coding: utf-8 -*-
import csv
import json

csvfile = open('anime.csv', 'r')
jsonfile = open('anime.json', 'w')

fieldnames = ("nome","genero")
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write('\n')
import pandas as pd
import os
import json

counties = pd.read_csv("oh-counties.csv")

sum_cases = counties.groupby("county", as_index=False).sum()[['county', 'daily_cases']]

json_out = sum_cases.to_dict(orient='records')

with open('totalcases.json', 'w') as jsonfile:
    json.dump(json_out, jsonfile, indent=4)
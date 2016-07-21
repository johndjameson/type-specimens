#!/usr/bin/env ruby
# *************************************
#
#   Shared
#   -> Common scripting
#
# *************************************

# -------------------------------------
#   Dependencies
# -------------------------------------

require 'json'
require 'net/http'
require 'slugify'

# -------------------------------------
#   Config
# -------------------------------------

data = 'https://api.airtable.com/v0/apptKHbxmAAcPuZMW/specimens?api_key=key3GGb7zxleGAfHl&filterByFormula=AND(Screenshot)&sortField=Title'

# ----- JSON ----- #

response = Net::HTTP.get(URI(data))
$sites   = JSON.parse(response)['records']

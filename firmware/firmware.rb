require 'zlib'

FILENAME = "CB-ZPAMT-215-120530.zpf"
f = File.new(FILENAME, 'r')

# Read the full firmware
f = f.read()

# Fast forward to the Firmware
mpfs_start = 0x0001c98c
mpfs_end   = 0x0006d2c3

puts(f[mpfs_start..mpfs_end])

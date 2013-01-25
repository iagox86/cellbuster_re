require 'zlib'

FIRMWARE_HEADER_SIZE = 0x1858
MPFS_HEADER_SIZE = 0x86
MPFS_ENTRY_SIZE = 0x2c

FILENAME = "CB-ZPAMT-215-120530.zpf"
f = File.new(FILENAME, 'r')

# Read the full firmware
f = f.read()

# Fast forward to the MPFS filesystem
mpfs_start = 0 + FIRMWARE_HEADER_SIZE

# Fast forward to the entries
offset = mpfs_start + MPFS_HEADER_SIZE

0.upto(31) do |i|
  name_offset, data_offset, data_length, checksum, u1, u2, name_end, table_offset, table_length, checksum_again, u3, u4 = f[offset..-1].unpack("IIIIISIIIIIS")
  name = f[(mpfs_start + name_offset)..-1].unpack("Z*").pop
  data = f[(mpfs_start + data_offset)..(mpfs_start + data_offset + data_length)]
  if(name == '')
    name = "unnamed_index_#{i}"
  end

  puts("Name offset: 0x%08x: %s" % [name_offset, name])
  puts("Data:")
  puts(data)
  w = File.open(name, "w")
  w.write(data)
  w.close

  #puts("Name: 0x%08x: %s" % [name_offset, name])
  #puts("Data: 0x%08x" % data_offset)
  #puts("Len:  0x%08x" % length)
  #puts("Unknown: 0x%08x" % u1)
  #puts("Unknown: 0x%08x" % u2)
  #puts("Unknown: 0x%08x" % u3)
  #puts("Unknown: 0x%08x" % u4)
  #puts("Unknown: 0x%08x" % u5)
  #puts("Unknown: 0x%08x" % u6)
  #puts("Unknown: 0x%08x" % u7)
  #puts("Unknown: 0x%08x" % u8)
  puts()
  offset += MPFS_ENTRY_SIZE
end


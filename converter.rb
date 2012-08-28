require 'rubygems'
require 'Nokogiri'
require 'ruby-debug'

doc = Nokogiri.XML(File.open('./world_countries_kml.xml', 'rb'))

doc.css('Placemark').each do | placemark |
  country = placemark.css('name').text
  coordinates = placemark.css('coordinates').text.split.map do |coordinate|
    "[#{coordinate.split(',')[1]},#{coordinate.split(',')[0]}]"
  end.join(',')
  puts "'#{country}': [[#{coordinates}]],"
end

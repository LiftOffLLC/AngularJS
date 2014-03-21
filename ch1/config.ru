/*
 LiftOff AngularJS Tutorial
 (c) 2013-2014 LiftOff LLC. http://www.liftoffllc.com
 License: MIT
*/
require 'sinatra/base'

class SinatraStaticServer < Sinatra::Base

  get(/.+/) do
    send_sinatra_file(request.path) {404}
  end

  get '/' do
    send_sinatra_file('index.html')
  end

  def send_sinatra_file(path, &missing_file_block)
    file_path = File.join(File.dirname(__FILE__), path)
    file_path = File.join(file_path, 'index.html') unless file_path =~ /\.[a-z]+$/i
    File.exist?(file_path) ? send_file(file_path) : missing_file_block.call
  end

end
run SinatraStaticServer

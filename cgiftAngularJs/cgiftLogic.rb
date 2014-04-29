require 'sinatra'
require 'net/http'
require 'json'

get '/cgift' do 
	# @flg_out||=false
	# @flg_out=params[:flglogout]
	erb :firstPage
end

# route handling registration of users 
post '/register' do 

	# extracting form data
	usr_details = JSON.parse(request.body.read) # reading the parameters 

	@first_name = usr_details["first_name"]
	@last_name = usr_details["last_name"]
	@mail_id = usr_details["mail_id"]
	@password = usr_details["password"]

	# preparing request object
	url = 'http://bloom-api.herokuapp.com/v1/users'
	uri = URI.parse(url)
	request = Net::HTTP::Post.new(uri.request_uri)
	request.initialize_http_header({"Content-Type" => "application/json"})
	request.body = {"first_name"=> @first_name, "last_name"=> @last_name, "email"=> @mail_id, "password"=> @password}.to_json
	http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = (uri.port == 443 or uri.port == 4443)
	
    # getting response object
	response =  http.request(request)
    body = response.body

    halt(400, "Something is wrong") if body.nil?
    
    # getting response in terms of hash, for ruby
    res_hash = JSON.parse(body)

	# checking for newly registering user
    if res_hash.has_key?("id")
	    return {"msg"=>"The registration is successful, kindly login using credentials"}.to_json
	end

	# checking for already existing user
    if res_hash.has_key?("error")
	    return {"msg"=>"This email is already registered, kindly login"}.to_json
	end
end

# route handling login of a user
post '/login' do 
	email = params[:mail_id]
	@password = params[:password]

	url = "http://bloom-api.herokuapp.com/v1/users/email/#{email}/authenticate"
	uri = URI.parse(url)
	request = Net::HTTP::Post.new(uri.request_uri)
	request.initialize_http_header({"Content-Type" => "application/json"})
	request.body = {"password"=> @password}.to_json
	http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = (uri.port == 443 or uri.port == 4443)
    response =  http.request(request)
    body = response.body

    halt(400, "User credentials does not match, please enter valid email-id & password") if body.nil?

    @message = "You logged into your cgift account"
    @schedule="Schedule a parcel"
	erb :home_page
end

require 'sinatra'
require 'net/http'
require 'json'

enable :sessions

get '/cgift' do 
	# checking for session
	session["session_mail_id"]||=nil
	if session["session_mail_id"] != nil
		erb :homePage
	else
		erb :firstPage
	end
	# @flg_out||=false
	# @flg_out=params[:flglogout]
end

# route handling login of a user
post '/login' do 
	# extracting login user credentials
	usr_details = JSON.parse(request.body.read)  
	email = usr_details["mail_id"]
	@password = usr_details["password"]
	# preparing request
	url = "http://bloom-api.herokuapp.com/v1/users/email/#{email}/authenticate"
	uri = URI.parse(url)
	request = Net::HTTP::Post.new(uri.request_uri)
	request.initialize_http_header({"Content-Type" => "application/json"})
	request.body = {"password"=> @password}.to_json
	http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = (uri.port == 443 or uri.port == 4443)
    response =  http.request(request)
    body = response.body
	# validation scenario
	loginStatusMsg=nil
	if body.nil?
		loginStatusMsg="credentials do not match, please enter valid email-id & password" 
	else
		# setting session 
		session["session_mail_id"]=email
	end
    return {"msg"=>loginStatusMsg}.to_json
end

get '/home' do 
	# checking for session
	session["session_mail_id"]||=nil
	if session["session_mail_id"] != nil
		erb :homePage
	else
		redirect("/cgift")
	end
end

get '/logout' do 
	session["session_mail_id"]=nil
	redirect("/cgift")
end

# route handling registration of users 
post '/register' do 
	# extracting registering user credentails
	usr_details = JSON.parse(request.body.read)  
	@first_name = usr_details["first_name"]
	@last_name = usr_details["last_name"]
	@mail_id = usr_details["mail_id"]
	@password = usr_details["password"]
	# preparing request 
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
	    # setting session value  
		session["session_mail_id"]=@mail_id	    
		return {"msg"=>"The registration is successful, kindly login using credentials"}.to_json
	end
	# validation scenario
    if res_hash.has_key?("error")

		session["session_mail_id"]=nil
	    return {"msg"=>"This email is already registered, kindly login"}.to_json
	end
end

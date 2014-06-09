Cgift::App.controllers :login do

	# route for login page
	get  :loginPageView, :map=>'/login/loginPageView' do 
		render :loginPage, :layout => false
	end

	# route handling the login scenario
	post :loginCall do 
		
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
	    if !(response.kind_of? Net::HTTPSuccess)
			loginStatusMsg="credentials do not match, please enter valid email-id & password" 
		else
			# starting session 
			session[:session_mail_id]=email
		end
	    return {"msg"=>loginStatusMsg}.to_json
	end
end
Cgift::App.controllers :register do

	# route for registration page for the new users
	get :registrationPageView, :map=>'/register/registrationPageView' do 
		render :registrationPage
	end

	# route handling registration of users 
	post :registerCall, :map=>'/register/registerCall' do 

		# extracting registering user credentails
		usr_details = JSON.parse(request.body.read)  
		@first_name = usr_details["first_name"]
		@last_name = usr_details["last_name"]
		@mail_id = usr_details["mail_id"]
		@p_word = usr_details["password"]

		# preparing request 
		url = 'http://bloom-api.herokuapp.com/v1/users'
		uri = URI.parse(url)
		request = Net::HTTP::Post.new(uri.request_uri)
		request.initialize_http_header({"Content-Type" => "application/json"})
		request.body = {"first_name"=> @first_name, "last_name"=> @last_name, "email"=> @mail_id, "password"=> @p_word}.to_json
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
			# starting session   
			session[:session_mail_id]=@mail_id	    
			return {"msg"=>"The registration is successful, kindly login using credentials"}.to_json
		end

		# validation scenario
	    if res_hash.has_key?("error")
			session[:session_mail_id]=nil
		    return {"msg"=>"This email is already registered, kindly login"}.to_json
		end
	end
end

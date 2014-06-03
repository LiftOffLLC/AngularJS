Cgift::App.controllers :cgift do 

	# main route where the application starts 
	get :index, :map=>'/cgift'do 
        if session["session_mail_id"] != nil
	        redirect("/homePageView")
	    else
			render :appStartPage
		end
	end
end

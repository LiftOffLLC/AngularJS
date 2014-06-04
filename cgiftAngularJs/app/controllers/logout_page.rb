Cgift::App.controllers :logout do
	get :index do 
		# logout_usr_mailid = session["session_mail_id"]
		session["session_mail_id"]=nil
		redirect("/cgift")
	end
end

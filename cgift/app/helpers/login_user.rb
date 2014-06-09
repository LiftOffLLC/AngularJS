Cgift::App.helpers do
	def get_current_user
		session["session_mail_id"]
	end
end 

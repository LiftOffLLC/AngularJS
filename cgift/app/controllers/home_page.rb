Cgift::App.controllers :homePageView do

    before do
    # checking for session
    session[:session_mail_id] ||= nil
        if session[:session_mail_id] == nil
            redirect("/cgift")
        end
    end

	# route for home page after authentication
	get :index, :map=> '/homePageView' do 
        
        content_for :about_cgift do 
        "c-gift makes the life easy, you can post the parcel from the place you are"
        end

		render :homePage
	end
end

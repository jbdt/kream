class VisitorsController < ApplicationController
  def index

  end

  def send_ginebrita
    SendGinebritaMailer.new_send_ginebrita_email(params[:message]).deliver_now!
    redirect_to :back
  end
end
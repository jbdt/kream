class VisitorsController < ApplicationController
  def index
    @general = General.first
  end

  def send_ginebrita
    SendGinebritaMailer.new_send_ginebrita_email(params[:message], params[:ip]).deliver_now!
    redirect_to :back
  end
end